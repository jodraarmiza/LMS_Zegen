package service

import (
	"net/http"

	"time"

	"backend/internal/config"
	"backend/internal/domain"
	"backend/internal/repository"
	"backend/pkg/auth"
	"backend/pkg/middleware"

	"github.com/labstack/echo/v4"
)

// AuthService handles authentication operations
type AuthService struct {
	userRepo         *repository.UserRepository
	refreshTokenRepo *repository.RefreshTokenRepository
	jwtSecret        string
	jwtExpiration    time.Duration
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
		userRepo:         userRepo,
		refreshTokenRepo: refreshTokenRepo,
		jwtSecret:        jwtSecret,
		jwtExpiration:    jwtExpiration,
		refreshExpiration: refreshExpiration,
	}
}

// setupJWTMiddleware sets up the JWT middleware
func setupJWTMiddleware(cfg *config.Config) echo.MiddlewareFunc {
	return middleware.JWTMiddleware(cfg.JWT.Secret)
}

// Login authenticates a user and returns a JWT token
func (s *AuthService) Login(c echo.Context) error {
	// Parse request
	var req domain.LoginRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request")
	}

	// Validate request
	if err := c.Validate(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	// Get user by username
	user, err := s.userRepo.GetByUsername(req.Username)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}

	// Check password
	if !user.CheckPassword(req.Password) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}

	// Generate tokens
	accessToken, refreshToken, err := auth.GenerateTokens(*user, s.jwtSecret, s.jwtExpiration, s.refreshExpiration)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate tokens")
	}

	// Store refresh token
	refreshExpiry := time.Now().Add(s.refreshExpiration)
	if err := s.refreshTokenRepo.CreateToken(user.ID, refreshToken, refreshExpiry); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to store refresh token")
	}

	// Get additional info based on role
	var studentInfo *domain.StudentInfo
	var instructorInfo *domain.InstructorInfo

	if user.Role == domain.RoleStudent {
		studentInfo, _ = s.userRepo.GetStudentInfo(user.ID)
	} else if user.Role == domain.RoleInstructor {
		instructorInfo, _ = s.userRepo.GetInstructorInfo(user.ID)
	}

	// Create user response
	userResponse := user.ToUserResponse()

	// Add additional info based on role
	if user.Role == domain.RoleStudent && studentInfo != nil {
		userResponse.StudentInfo = &domain.StudentInfoResponse{
			StudentID:       studentInfo.StudentID,
			Degree:          studentInfo.Degree,
			Major:           studentInfo.Major,
			Stream:          studentInfo.Stream,
			CurrentSemester: studentInfo.CurrentSemester,
			GPA:             studentInfo.GPA,
			Skills:          studentInfo.Skills,
		}
	} else if user.Role == domain.RoleInstructor && instructorInfo != nil {
		userResponse.InstructorInfo = &domain.InstructorInfoResponse{
			Position:       instructorInfo.Position,
			Department:     instructorInfo.Department,
			Specialization: instructorInfo.Specialization,
		}
	}

	// Return login response
	return c.JSON(http.StatusOK, domain.LoginResponse{
		User:         userResponse,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

// Register registers a new user
func (s *AuthService) Register(c echo.Context) error {
	// Parse request
	var req domain.RegisterRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request")
	}

	// Validate request
	if err := c.Validate(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	// Check if username already exists
	_, err := s.userRepo.GetByUsername(req.Username)
	if err == nil {
		return echo.NewHTTPError(http.StatusConflict, "Username already exists")
	}

	// Check if email already exists
	_, err = s.userRepo.GetByEmail(req.Email)
	if err == nil {
		return echo.NewHTTPError(http.StatusConflict, "Email already exists")
	}

	// Create user
	user := &domain.User{
		Username:  req.Username,
		Name:      req.Name,
		Email:     req.Email,
		Role:      req.Role,
		Department: req.Department,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// Set password
	if err := user.SetPassword(req.Password); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to set password")
	}

	// Create user
	if err := s.userRepo.Create(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create user")
	}

	// Create student info if role is student
	if user.Role == domain.RoleStudent && req.StudentID != "" {
		studentInfo := &domain.StudentInfo{
			UserID:    user.ID,
			StudentID: req.StudentID,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		if err := s.userRepo.CreateStudentInfo(studentInfo); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create student info")
		}
	}

	// Generate tokens
	accessToken, refreshToken, err := auth.GenerateTokens(*user, s.jwtSecret, s.jwtExpiration, s.refreshExpiration)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate tokens")
	}

	// Store refresh token
	refreshExpiry := time.Now().Add(s.refreshExpiration)
	if err := s.refreshTokenRepo.CreateToken(user.ID, refreshToken, refreshExpiry); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to store refresh token")
	}

	// Return login response
	return c.JSON(http.StatusCreated, domain.LoginResponse{
		User:         user.ToUserResponse(),
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

// RefreshToken refreshes a JWT token
func (s *AuthService) RefreshToken(c echo.Context) error {
	// Parse request
	var tokenString string
	if err := c.Bind(&struct {
		RefreshToken string `json:"refreshToken"`
	}{
		RefreshToken: tokenString,
	}); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request")
	}

	// Validate refresh token
	refreshToken, err := s.refreshTokenRepo.GetByToken(tokenString)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid refresh token")
	}

	// Check if token is expired
	if refreshToken.ExpiresAt.Before(time.Now()) {
		// Delete expired token
		s.refreshTokenRepo.DeleteToken(tokenString)
		return echo.NewHTTPError(http.StatusUnauthorized, "Refresh token expired")
	}

	// Get user
	user, err := s.userRepo.GetByID(refreshToken.UserID)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "User not found")
	}

	// Generate new tokens
	accessToken, newRefreshToken, err := auth.GenerateTokens(*user, s.jwtSecret, s.jwtExpiration, s.refreshExpiration)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate tokens")
	}

	// Delete old refresh token
	if err := s.refreshTokenRepo.DeleteToken(tokenString); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to delete old refresh token")
	}

	// Store new refresh token
	refreshExpiry := time.Now().Add(s.refreshExpiration)
	if err := s.refreshTokenRepo.CreateToken(user.ID, newRefreshToken, refreshExpiry); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to store refresh token")
	}

	// Return new tokens
	return c.JSON(http.StatusOK, map[string]string{
		"accessToken":  accessToken,
		"refreshToken": newRefreshToken,
	})
}

// ValidateToken validates a JWT token
func (s *AuthService) ValidateToken(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	// Get user from repository
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "User not found")
	}

	// Return user response
	return c.JSON(http.StatusOK, user.ToUserResponse())
}

// Logout logs out a user
func (s *AuthService) Logout(c echo.Context) error {
	// Parse request
	var tokenString string
	if err := c.Bind(&struct {
		RefreshToken string `json:"refreshToken"`
	}{
		RefreshToken: tokenString,
	}); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request")
	}

	// Delete refresh token
	if err := s.refreshTokenRepo.DeleteToken(tokenString); err != nil {
		// Ignore error, token might not exist
	}

	return c.NoContent(http.StatusNoContent)
}