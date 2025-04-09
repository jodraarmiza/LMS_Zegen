package service

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"backend/internal/domain"
	"backend/internal/repository"
	"backend/pkg/middleware"
)

// UserService handles user operations
type UserService struct {
	userRepo *repository.UserRepository
	uploadDir string
}

// NewUserService creates a new user service
func NewUserService(userRepo *repository.UserRepository, uploadDir string) *UserService {
	return &UserService{
		userRepo: userRepo,
		uploadDir: uploadDir,
	}
}

// GetUsers gets all users with pagination
func (s *UserService) GetUsers(c echo.Context) error {
	// Get query parameters
	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	page, _ := strconv.Atoi(c.QueryParam("page"))
	
	// Set defaults if not provided
	if limit <= 0 {
		limit = 10
	}
	if page <= 0 {
		page = 1
	}
	
	// Calculate offset
	offset := (page - 1) * limit
	
	// Get users from repository
	users, err := s.userRepo.List(limit, offset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get users")
	}
	
	// Count total users
	total, err := s.userRepo.CountUsers()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to count users")
	}
	
	// Create response
	var usersResponse []domain.UserResponse
	for _, user := range users {
		usersResponse = append(usersResponse, user.ToUserResponse())
	}
	
	// Return response with pagination
	return c.JSON(http.StatusOK, map[string]interface{}{
		"users": usersResponse,
		"pagination": map[string]interface{}{
			"total": total,
			"limit": limit,
			"page":  page,
			"pages": (total + int64(limit) - 1) / int64(limit),
		},
	})
}

// GetUser gets a user by ID
func (s *UserService) GetUser(c echo.Context) error {
	// Get user ID from path parameter
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}
	
	// Get user from repository
	user, studentInfo, instructorInfo, err := s.userRepo.GetUserWithDetails(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
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
	
	// Return response
	return c.JSON(http.StatusOK, userResponse)
}

// GetCurrentUser gets the current authenticated user
func (s *UserService) GetCurrentUser(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}
	
	// Get user from repository
	user, studentInfo, instructorInfo, err := s.userRepo.GetUserWithDetails(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
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
	
	// Return response
	return c.JSON(http.StatusOK, userResponse)
}

// UpdateUser updates a user
func (s *UserService) UpdateUser(c echo.Context) error {
	// Get user ID from path parameter
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}
	
	// Get user role from token
	role, err := middleware.GetUserRoleFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}
	
	// Only admin can update other users
	if role != string(domain.RoleAdmin) {
		userID, err := middleware.GetUserIDFromToken(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}
		
		if userID != uint(id) {
			return echo.NewHTTPError(http.StatusForbidden, "You cannot update other users")
		}
	}
	
	// Get user from repository
	user, err := s.userRepo.GetByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}
	
	// Parse request
	var req domain.UpdateUserRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request")
	}
	
	// Validate request
	if err := c.Validate(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Update user fields
	if req.Name != "" {
		user.Name = req.Name
	}
	if req.Email != "" {
		// Check if email already exists
		existingUser, err := s.userRepo.GetByEmail(req.Email)
		if err == nil && existingUser.ID != user.ID {
			return echo.NewHTTPError(http.StatusConflict, "Email already exists")
		}
		
		user.Email = req.Email
	}
	if req.Gender != "" {
		user.Gender = req.Gender
	}
	if req.Religion != "" {
		user.Religion = req.Religion
	}
	if req.DateOfBirth != nil {
		user.DateOfBirth = req.DateOfBirth
	}
	if req.PlaceOfBirth != "" {
		user.PlaceOfBirth = req.PlaceOfBirth
	}
	if req.Department != "" {
		user.Department = req.Department
	}
	
	// Update user
	user.UpdatedAt = time.Now()
	if err := s.userRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update user")
	}
	
	// Update additional info based on role
	if user.Role == domain.RoleStudent {
		// Get student info
		studentInfo, err := s.userRepo.GetStudentInfo(user.ID)
		if err == nil {
			// Update student info fields
			if req.Degree != "" {
				studentInfo.Degree = req.Degree
			}
			if req.Major != "" {
				studentInfo.Major = req.Major
			}
			if req.Stream != "" {
				studentInfo.Stream = req.Stream
			}
			if req.CurrentSemester != "" {
				studentInfo.CurrentSemester = req.CurrentSemester
			}
			if req.Skills != "" {
				studentInfo.Skills = req.Skills
			}
			
			// Update student info
			studentInfo.UpdatedAt = time.Now()
			if err := s.userRepo.UpdateStudentInfo(studentInfo); err != nil {
				return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update student info")
			}
		}
	}
	
	return c.JSON(http.StatusOK, user.ToUserResponse())
}

// UpdateCurrentUser updates the current authenticated user
func (s *UserService) UpdateCurrentUser(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}
	
	// Set the ID parameter for the request
	c.SetParamNames("id")
	c.SetParamValues(strconv.FormatUint(uint64(userID), 10))
	
	// Call the update user method
	return s.UpdateUser(c)
}

// UpdatePassword updates a user's password
func (s *UserService) UpdatePassword(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}
	
	// Get user from repository
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}
	
	// Parse request
	var req domain.UpdatePasswordRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request")
	}
	
	// Validate request
	if err := c.Validate(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Check current password
	if !user.CheckPassword(req.CurrentPassword) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid current password")
	}
	
	// Set new password
	if err := user.SetPassword(req.NewPassword); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to set new password")
	}
	
	// Update user
	user.UpdatedAt = time.Now()
	if err := s.userRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update password")
	}
	
	return c.NoContent(http.StatusNoContent)
}

// UploadProfilePhoto uploads a profile photo for the current user
func (s *UserService) UploadProfilePhoto(c echo.Context) error {
	// Get user ID from token
	userID, err := middleware.GetUserIDFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}
	
	// Get user from repository
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}
	
	// Get file from request
	file, err := c.FormFile("photo")
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "No file uploaded")
	}
	
	// Check file size
	if file.Size > 5*1024*1024 { // 5MB
		return echo.NewHTTPError(http.StatusBadRequest, "File too large, max size is 5MB")
	}
	
	// Check file type
	ext := filepath.Ext(file.Filename)
	if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid file type, only jpg, jpeg and png are allowed")
	}
	
	// Create folder if it doesn't exist
	if err := os.MkdirAll(filepath.Join(s.uploadDir, "profiles"), 0755); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create upload directory")
	}
	
	// Generate unique filename
	filename := fmt.Sprintf("%d-%d%s", userID, time.Now().Unix(), ext)
	filepath := filepath.Join(s.uploadDir, "profiles", filename)
	
	// Save file
	src, err := file.Open()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to open file")
	}
	defer src.Close()
	
	dst, err := os.Create(filepath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create file")
	}
	defer dst.Close()
	
	if _, err = io.Copy(dst, src); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to save file")
	}
	
	// Delete old profile photo if exists
	if user.ProfilePhotoURL != "" {
		oldPath := filepath.Join(s.uploadDir, "profiles", filepath.Base(user.ProfilePhotoURL))
		os.Remove(oldPath) // Ignore error if file doesn't exist
	}
	
	// Update user profile photo URL
	user.ProfilePhotoURL = "/uploads/profiles/" + filename
	user.UpdatedAt = time.Now()
	if err := s.userRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update profile photo")
	}
	
	return c.JSON(http.StatusOK, map[string]string{
		"url": user.ProfilePhotoURL,
	})
}

// GetStudents gets all students with pagination
func (s *UserService) GetStudents(c echo.Context) error {
	// Get query parameters
	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	page, _ := strconv.Atoi(c.QueryParam("page"))
	
	// Set defaults if not provided
	if limit <= 0 {
		limit = 10
	}
	if page <= 0 {
		page = 1
	}
	
	// Calculate offset
	offset := (page - 1) * limit
	
	// Get students from repository
	students, err := s.userRepo.GetStudents(limit, offset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get students")
	}
	
	// Count total students
	total, err := s.userRepo.CountStudents()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to count students")
	}
	
	// Create response
	var studentsResponse []domain.UserResponse
	for _, student := range students {
		studentsResponse = append(studentsResponse, student.ToUserResponse())
	}
	
	// Return response with pagination
	return c.JSON(http.StatusOK, map[string]interface{}{
		"students": studentsResponse,
		"pagination": map[string]interface{}{
			"total": total,
			"limit": limit,
			"page":  page,
			"pages": (total + int64(limit) - 1) / int64(limit),
		},
	})
}

// GetStudent gets a student by ID
func (s *UserService) GetStudent(c echo.Context) error {
	// Get student ID from path parameter
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid student ID")
	}
	
	// Get user from repository
	user, studentInfo, _, err := s.userRepo.GetUserWithDetails(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Student not found")
	}
	
	// Check if user is a student
	if user.Role != domain.RoleStudent {
		return echo.NewHTTPError(http.StatusBadRequest, "User is not a student")
	}
	
	// Create user response
	userResponse := user.ToUserResponse()
	
	// Add student info
	if studentInfo != nil {
		userResponse.StudentInfo = &domain.StudentInfoResponse{
			StudentID:       studentInfo.StudentID,
			Degree:          studentInfo.Degree,
			Major:           studentInfo.Major,
			Stream:          studentInfo.Stream,
			CurrentSemester: studentInfo.CurrentSemester,
			GPA:             studentInfo.GPA,
			Skills:          studentInfo.Skills,
		}
	}
	
	// Return response
	return c.JSON(http.StatusOK, userResponse)
}

// UpdateStudent updates a student
func (s *UserService) UpdateStudent(c echo.Context) error {
	// Get student ID from path parameter
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid student ID")
	}
	
	// Get user role from token
	role, err := middleware.GetUserRoleFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}
	
	// Only admin can update other users
	if role != string(domain.RoleAdmin) {
		userID, err := middleware.GetUserIDFromToken(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}
		
		if userID != uint(id) {
			return echo.NewHTTPError(http.StatusForbidden, "You cannot update other students")
		}
	}
	
	// Get user from repository
	user, studentInfo, _, err := s.userRepo.GetUserWithDetails(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Student not found")
	}
	
	// Check if user is a student
	if user.Role != domain.RoleStudent {
		return echo.NewHTTPError(http.StatusBadRequest, "User is not a student")
	}
	
	// Parse request
	var req domain.UpdateUserRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request")
	}
	
	// Validate request
	if err := c.Validate(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Update user fields
	if req.Name != "" {
		user.Name = req.Name
	}
	if req.Email != "" {
		// Check if email already exists
		existingUser, err := s.userRepo.GetByEmail(req.Email)
		if err == nil && existingUser.ID != user.ID {
			return echo.NewHTTPError(http.StatusConflict, "Email already exists")
		}
		
		user.Email = req.Email
	}
	if req.Gender != "" {
		user.Gender = req.Gender
	}
	if req.Religion != "" {
		user.Religion = req.Religion
	}
	if req.DateOfBirth != nil {
		user.DateOfBirth = req.DateOfBirth
	}
	if req.PlaceOfBirth != "" {
		user.PlaceOfBirth = req.PlaceOfBirth
	}
	if req.Department != "" {
		user.Department = req.Department
	}
	
	// Update user
	user.UpdatedAt = time.Now()
	if err := s.userRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update student")
	}
	
	// Update student info
	if studentInfo != nil {
		if req.Degree != "" {
			studentInfo.Degree = req.Degree
		}
		if req.Major != "" {
			studentInfo.Major = req.Major
		}
		if req.Stream != "" {
			studentInfo.Stream = req.Stream
		}
		if req.CurrentSemester != "" {
			studentInfo.CurrentSemester = req.CurrentSemester
		}
		if req.Skills != "" {
			studentInfo.Skills = req.Skills
		}
		
		// Update student info
		studentInfo.UpdatedAt = time.Now()
		if err := s.userRepo.UpdateStudentInfo(studentInfo); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update student info")
		}
	}
	
	// Get updated student info
	_, updatedStudentInfo, _, err := s.userRepo.GetUserWithDetails(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get updated student")
	}
	
	// Create user response
	userResponse := user.ToUserResponse()
	
	// Add student info
	if updatedStudentInfo != nil {
		userResponse.StudentInfo = &domain.StudentInfoResponse{
			StudentID:       updatedStudentInfo.StudentID,
			Degree:          updatedStudentInfo.Degree,
			Major:           updatedStudentInfo.Major,
			Stream:          updatedStudentInfo.Stream,
			CurrentSemester: updatedStudentInfo.CurrentSemester,
			GPA:             updatedStudentInfo.GPA,
			Skills:          updatedStudentInfo.Skills,
		}
	}
	
	return c.JSON(http.StatusOK, userResponse)
}

// GetInstructors gets all instructors with pagination
func (s *UserService) GetInstructors(c echo.Context) error {
	// Get query parameters
	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	page, _ := strconv.Atoi(c.QueryParam("page"))
	
	// Set defaults if not provided
	if limit <= 0 {
		limit = 10
	}
	if page <= 0 {
		page = 1
	}
	
	// Calculate offset
	offset := (page - 1) * limit
	
	// Get instructors from repository
	instructors, err := s.userRepo.GetInstructors(limit, offset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get instructors")
	}
	
	// Count total instructors
	total, err := s.userRepo.CountInstructors()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to count instructors")
	}
	
	// Create response
	var instructorsResponse []domain.UserResponse
	for _, instructor := range instructors {
		instructorsResponse = append(instructorsResponse, instructor.ToUserResponse())
	}
	
	// Return response with pagination
	return c.JSON(http.StatusOK, map[string]interface{}{
		"instructors": instructorsResponse,
		"pagination": map[string]interface{}{
			"total": total,
			"limit": limit,
			"page":  page,
			"pages": (total + int64(limit) - 1) / int64(limit),
		},
	})
}

// GetInstructor gets an instructor by ID
func (s *UserService) GetInstructor(c echo.Context) error {
	// Get instructor ID from path parameter
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid instructor ID")
	}
	
	// Get user from repository
	user, _, instructorInfo, err := s.userRepo.GetUserWithDetails(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Instructor not found")
	}
	
	// Check if user is an instructor
	if user.Role != domain.RoleInstructor {
		return echo.NewHTTPError(http.StatusBadRequest, "User is not an instructor")
	}
	
	// Create user response
	userResponse := user.ToUserResponse()
	
	// Add instructor info
	if instructorInfo != nil {
		userResponse.InstructorInfo = &domain.InstructorInfoResponse{
			Position:       instructorInfo.Position,
			Department:     instructorInfo.Department,
			Specialization: instructorInfo.Specialization,
		}
	}
	
	// Return response
	return c.JSON(http.StatusOK, userResponse)
}

// UpdateInstructor updates an instructor
func (s *UserService) UpdateInstructor(c echo.Context) error {
	// Get instructor ID from path parameter
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid instructor ID")
	}
	
	// Get user role from token
	role, err := middleware.GetUserRoleFromToken(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}
	
	// Only admin can update other users
	if role != string(domain.RoleAdmin) {
		userID, err := middleware.GetUserIDFromToken(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}
		
		if userID != uint(id) {
			return echo.NewHTTPError(http.StatusForbidden, "You cannot update other instructors")
		}
	}
	
	// Get user from repository
	user, _, instructorInfo, err := s.userRepo.GetUserWithDetails(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Instructor not found")
	}
	
	// Check if user is an instructor
	if user.Role != domain.RoleInstructor {
		return echo.NewHTTPError(http.StatusBadRequest, "User is not an instructor")
	}
	
	// Return 501 Not Implemented for now
	return c.JSON(http.StatusNotImplemented, map[string]string{
		"message": "UpdateInstructor not implemented yet",
	})
}