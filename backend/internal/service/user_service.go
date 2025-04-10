package service

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"backend/pkg/middleware"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

// UserService handles user-related operations
type UserService struct {
	userRepo        *repository.UserRepository
	uploadDirectory string
}

// NewUserService creates a new user service
func NewUserService(userRepo *repository.UserRepository, uploadDir string) *UserService {
	return &UserService{
		userRepo:        userRepo,
		uploadDirectory: uploadDir,
	}
}

// GetUsers returns all users with pagination
func (s *UserService) GetUsers(c echo.Context) error {
	// Parse pagination parameters
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil || limit <= 0 {
		limit = 10 // Default limit
	}

	offset, err := strconv.Atoi(c.QueryParam("offset"))
	if err != nil || offset < 0 {
		offset = 0 // Default offset
	}

	// Get users from repository
	users, err := s.userRepo.GetUsers(limit, offset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get users")
	}

	// Count total users
	count, err := s.userRepo.CountUsers()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to count users")
	}

	// Convert users to response format
	var usersResponse []domain.UserResponse
	for _, user := range users {
		usersResponse = append(usersResponse, user.ToUserResponse())
	}

	// Return response
	return c.JSON(http.StatusOK, map[string]interface{}{
		"users": usersResponse,
		"meta": map[string]interface{}{
			"total":  count,
			"limit":  limit,
			"offset": offset,
		},
	})
}

// GetStudent returns a student by ID
func (s *UserService) GetStudent(c echo.Context) error {
	// Parse student ID
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid student ID")
	}

	// Get user
	user, err := s.userRepo.GetByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Student not found")
	}

	// For now, return the user response (we'll add student specific info later)
	return c.JSON(http.StatusOK, user.ToUserResponse())
}

// UpdateStudent updates a student by ID
func (s *UserService) UpdateStudent(c echo.Context) error {
	// Parse student ID
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid student ID")
	}

	// Set the ID in the request path for UpdateUser
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(id))

	// Call the UpdateUser method
	return s.UpdateUser(c)
}

// GetInstructors returns all instructors with pagination
func (s *UserService) GetInstructors(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Not implemented yet",
	})
}

// GetInstructor returns an instructor by ID
func (s *UserService) GetInstructor(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Not implemented yet",
	})
}

// UpdateInstructor updates an instructor by ID
func (s *UserService) UpdateInstructor(c echo.Context) error {
	// Parse instructor ID
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid instructor ID")
	}

	// Set the ID in the request path for UpdateUser
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(id))

	// Call the UpdateUser method
	return s.UpdateUser(c)
}

// Helper function to validate image file types
func isValidImageType(filename string) bool {
	ext := filepath.Ext(filename)
	validExtensions := map[string]bool{
		".jpg":  true,
		".jpeg": true,
		".png":  true,
	}
	return validExtensions[ext]
}

// GetUser returns a user by ID
func (s *UserService) GetUser(c echo.Context) error {
	// Parse user ID
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}

	// Get user
	user, err := s.userRepo.GetByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	// Return user response
	return c.JSON(http.StatusOK, user.ToUserResponse())
}

// GetCurrentUser returns the current authenticated user
func (s *UserService) GetCurrentUser(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	// Get user
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	// Return user response
	return c.JSON(http.StatusOK, user.ToUserResponse())
}

// UpdateUser updates a user by ID
func (s *UserService) UpdateUser(c echo.Context) error {
	// Parse user ID
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}

	// Parse request
	var updateReq domain.UpdateUserRequest
	if err := c.Bind(&updateReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}

	if err := c.Validate(&updateReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	// Get user
	user, err := s.userRepo.GetByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	// Update user fields
	if updateReq.Name != "" {
		user.Name = updateReq.Name
	}
	if updateReq.Email != "" {
		// Check if email is already taken
		existingUser, err := s.userRepo.GetByEmail(updateReq.Email)
		if err == nil && existingUser.ID != user.ID {
			return echo.NewHTTPError(http.StatusConflict, "Email already in use")
		}
		user.Email = updateReq.Email
	}

	// Update user
	user.UpdatedAt = time.Now()
	if err := s.userRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update user")
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "User updated successfully",
	})
}

// UpdateCurrentUser updates the current authenticated user
func (s *UserService) UpdateCurrentUser(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	// Set the ID in the request path
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(int(userID)))

	// Call the UpdateUser method
	return s.UpdateUser(c)
}

// UpdatePassword updates the current user's password
func (s *UserService) UpdatePassword(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	// Parse request
	var passwordReq domain.UpdatePasswordRequest
	if err := c.Bind(&passwordReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}

	if err := c.Validate(&passwordReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	// Get user
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	// Verify current password
	if !user.CheckPassword(passwordReq.CurrentPassword) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Current password is incorrect")
	}

	// Update password
	if err := user.SetPassword(passwordReq.NewPassword); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to set new password")
	}

	// Save user
	user.UpdatedAt = time.Now()
	if err := s.userRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update password")
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Password updated successfully",
	})
}

// UploadProfilePhoto uploads and updates the current user's profile photo
func (s *UserService) UploadProfilePhoto(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	// Get user
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	// Get file from request
	file, err := c.FormFile("photo")
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "No file uploaded")
	}

	// Validate file type
	if !isValidImageType(file.Filename) {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid file type. Allowed types: jpg, jpeg, png")
	}

	// Create profile photos directory if it doesn't exist
	uploadDir := filepath.Join(s.uploadDirectory, "profile_photos")
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create upload directory")
	}

	// Generate unique filename
	filename := fmt.Sprintf("%d_%s", userID, filepath.Base(file.Filename))
	filepath := filepath.Join(uploadDir, filename)

	// Save file
	src, err := file.Open()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to open uploaded file")
	}
	defer src.Close()

	dst, err := os.Create(filepath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create destination file")
	}
	defer dst.Close()

	if _, err = io.Copy(dst, src); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to save file")
	}

	// Update user profile photo URL
	relativePath := fmt.Sprintf("profile_photos/%s", filename)
	user.ProfilePhotoURL = relativePath
	user.UpdatedAt = time.Now()

	if err := s.userRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update profile photo")
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Profile photo updated successfully",
		"url":     "/uploads/" + relativePath,
	})
}

// GetStudents returns all students with pagination
func (s *UserService) GetStudents(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Not implemented yet",
	})
}