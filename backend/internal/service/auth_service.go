package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
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
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	}
	
	if err := c.Bind(&loginReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	if err := c.Validate(&loginReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Get user by email
	user, err := s.userRepo.GetByEmail(loginReq.Email)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}
	
	// Check password
	if !user.CheckPassword(loginReq.Password) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}
	
	// Generate tokens
	accessToken, err := s.generateAccessToken(user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate access token")
	}
	
	refreshToken, err := s.generateRefreshToken(user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate refresh token")
	}
	
	// Return tokens
	return c.JSON(http.StatusOK, map[string]interface{}{
		"access_token": accessToken,
		"refresh_token": refreshToken,
		"user": user.ToUserResponse(),
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
	accessToken, err := s.generateAccessToken(user.ID)
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

// generateAccessToken generates a new JWT access token
func (s *AuthService) generateAccessToken(userID uint) (string, error) {
	// Create token with claims
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(s.jwtExpiration).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	
	// Generate encoded token
	tokenString, err := token.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return "", err
	}
	
	return tokenString, nil
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