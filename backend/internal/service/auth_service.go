package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"backend/pkg/auth"
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
)

// AuthService handles authentication
type AuthService struct {
	userRepo          *repository.UserRepository
	refreshTokenRepo  *repository.RefreshTokenRepository
	jwtSecret         string
	jwtExpiration     time.Duration
	refreshExpiration time.Duration
}

// NewAuthService creates a new auth service
func NewAuthService(
	userRepo *repository.UserRepository,
	refreshTokenRepo *repository.RefreshTokenRepository,
	jwtSecret string,
	jwtExpiration time.Duration,
	refreshExpiration time.Duration,
) *AuthService {
	return &AuthService{
		userRepo:          userRepo,
		refreshTokenRepo:  refreshTokenRepo,
		jwtSecret:         jwtSecret,
		jwtExpiration:     jwtExpiration,
		refreshExpiration: refreshExpiration,
	}
}

// Login authenticates a user and returns JWT tokens
func (s *AuthService) Login(c echo.Context) error {
	// Parse request
	var loginReq struct {
		Username string `json:"username" validate:"required"`
		Password string `json:"password" validate:"required"`
	}
	
	if err := c.Bind(&loginReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	if err := c.Validate(&loginReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Get user by username
	user, err := s.userRepo.GetByUsername(loginReq.Username)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}
	
	// Check password
	if !user.CheckPassword(loginReq.Password) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}
	
	// Generate tokens
	accessToken, err := auth.GenerateToken(user.ID, user.Role, s.jwtSecret, s.jwtExpiration)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate access token")
	}
	
	refreshToken, err := s.generateRefreshToken(user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate refresh token")
	}
	
	// Prepare user response
	userResponse := domain.UserResponse{
		ID:        user.ID,
		Username:  user.Username,
		Name:      user.Name,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
	
	// Return tokens
	return c.JSON(http.StatusOK, map[string]interface{}{
		"access_token": accessToken,
		"refresh_token": refreshToken,
		"user": userResponse,
	})
}

// Register creates a new user account
func (s *AuthService) Register(c echo.Context) error {
	// Parse request
	var registerReq struct {
		Username string `json:"username" validate:"required"`
		Name     string `json:"name" validate:"required"`
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required,min=6"`
	}
	
	if err := c.Bind(&registerReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	if err := c.Validate(&registerReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Check if username already exists
	_, err := s.userRepo.GetByUsername(registerReq.Username)
	if err == nil {
		return echo.NewHTTPError(http.StatusConflict, "Username already exists")
	}
	
	// Check if email already exists
	_, err = s.userRepo.GetByEmail(registerReq.Email)
	if err == nil {
		return echo.NewHTTPError(http.StatusConflict, "Email already exists")
	}
	
	// Create new user
	user := &domain.User{
		Username:  registerReq.Username,
		Name:      registerReq.Name,
		Email:     registerReq.Email,
	}
	
	// Set password
	if err := user.SetPassword(registerReq.Password); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to hash password")
	}
	
	// Determine role based on username pattern
	if strings.HasPrefix(registerReq.Username, "admin_") {
		user.Role = "admin"
	} else if strings.HasPrefix(registerReq.Username, "instructor_") {
		user.Role = "instructor"
	} else {
		user.Role = "student"
	}
	
	// Save user to database
	if err := s.userRepo.Create(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create user")
	}
	
	// Generate tokens
	accessToken, err := auth.GenerateToken(user.ID, user.Role, s.jwtSecret, s.jwtExpiration)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate access token")
	}
	
	refreshToken, err := s.generateRefreshToken(user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate refresh token")
	}
	
	// Prepare user response
	userResponse := domain.UserResponse{
		ID:        user.ID,
		Username:  user.Username,
		Name:      user.Name,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}
	
	// Return tokens
	return c.JSON(http.StatusCreated, map[string]interface{}{
		"access_token": accessToken,
		"refresh_token": refreshToken,
		"user": userResponse,
	})
}

// RefreshToken refreshes an access token
func (s *AuthService) RefreshToken(c echo.Context) error {
	// Parse request
	var refreshReq struct {
		RefreshToken string `json:"refresh_token" validate:"required"`
	}
	
	if err := c.Bind(&refreshReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	if err := c.Validate(&refreshReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Get refresh token
	refreshToken, err := s.refreshTokenRepo.GetByToken(refreshReq.RefreshToken)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid refresh token")
	}
	
	// Check if token is expired
	if time.Now().After(refreshToken.ExpiresAt) {
		// Delete expired token
		s.refreshTokenRepo.DeleteByToken(refreshReq.RefreshToken)
		return echo.NewHTTPError(http.StatusUnauthorized, "Refresh token expired")
	}
	
	// Get user
	user, err := s.userRepo.GetByID(refreshToken.UserID)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}
	
	// Generate new access token
	accessToken, err := auth.GenerateToken(user.ID, user.Role, s.jwtSecret, s.jwtExpiration)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate access token")
	}
	
	// Return new access token
	return c.JSON(http.StatusOK, map[string]string{
		"access_token": accessToken,
	})
}

// Logout invalidates a refresh token
func (s *AuthService) Logout(c echo.Context) error {
	// Parse request
	var logoutReq struct {
		RefreshToken string `json:"refresh_token" validate:"required"`
	}
	
	if err := c.Bind(&logoutReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	// Delete the refresh token
	err := s.refreshTokenRepo.DeleteByToken(logoutReq.RefreshToken)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to logout")
	}
	
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Successfully logged out",
	})
}

// generateRefreshToken generates a new refresh token
func (s *AuthService) generateRefreshToken(userID uint) (string, error) {
	// Generate random token
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	tokenString := hex.EncodeToString(b)
	
	// Store in database
	expiresAt := time.Now().Add(s.refreshExpiration)
	refreshToken := &domain.RefreshToken{
		UserID:    userID,
		Token:     tokenString,
		ExpiresAt: expiresAt,
	}
	
	err := s.refreshTokenRepo.Create(refreshToken)
	if err != nil {
		return "", err
	}
	
	return tokenString, nil
}