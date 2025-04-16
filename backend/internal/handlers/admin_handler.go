package handler

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

// AdminHandler handles admin-specific operations
type AdminHandler struct {
	userRepo       *repository.UserRepository
	courseRepo     *repository.CourseRepository
	assessmentRepo *repository.AssessmentRepository
}

// NewAdminHandler creates a new admin handler
func NewAdminHandler(
	userRepo *repository.UserRepository,
	courseRepo *repository.CourseRepository,
	assessmentRepo *repository.AssessmentRepository,
) *AdminHandler {
	return &AdminHandler{
		userRepo:       userRepo,
		courseRepo:     courseRepo,
		assessmentRepo: assessmentRepo,
	}
}

// GetDashboardStats returns statistics for the admin dashboard
func (h *AdminHandler) GetDashboardStats(c echo.Context) error {
	// Get count of users by role
	studentCount, _ := h.userRepo.CountStudents()
	instructorCount, _ := h.userRepo.CountInstructors()
	totalUsers, _ := h.userRepo.CountUsers()
	
	// Get count of courses
	totalCourses, _ := h.courseRepo.CountCourses()
	
	// Return statistics
	return c.JSON(http.StatusOK, map[string]interface{}{
		"total_users":      totalUsers,
		"student_count":    studentCount,
		"instructor_count": instructorCount,
		"admin_count":      totalUsers - studentCount - instructorCount,
		"total_courses":    totalCourses,
	})
}

// GetAllUsers returns all users with pagination
func (h *AdminHandler) GetAllUsers(c echo.Context) error {
	// Parse pagination parameters
	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	page, _ := strconv.Atoi(c.QueryParam("page"))
	
	if limit <= 0 {
		limit = 10
	}
	if page <= 0 {
		page = 1
	}
	
	offset := (page - 1) * limit
	
	// Get users from repository
	users, err := h.userRepo.GetUsers(limit, offset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get users")
	}
	
	// Count total users
	count, err := h.userRepo.CountUsers()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to count users")
	}
	
	// Convert to response format
	var userResponses []domain.UserResponse
	for _, user := range users {
		userResponses = append(userResponses, user.ToUserResponse())
	}
	
	// Return response
	return c.JSON(http.StatusOK, map[string]interface{}{
		"users":       userResponses,
		"total":       count,
		"page":        page,
		"limit":       limit,
		"total_pages": (count + int64(limit) - 1) / int64(limit),
	})
}

// CreateUser creates a new user
func (h *AdminHandler) CreateUser(c echo.Context) error {
	// Parse request
	var createReq struct {
		Username     string     `json:"username" validate:"required"`
		Name         string     `json:"name" validate:"required"`
		Email        string     `json:"email" validate:"required,email"`
		Password     string     `json:"password" validate:"required,min=6"`
		Role         string     `json:"role" validate:"required,oneof=student instructor admin"`
		Gender       string     `json:"gender"`
		Religion     string     `json:"religion"`
		DateOfBirth  *time.Time `json:"date_of_birth"`
		PlaceOfBirth string     `json:"place_of_birth"`
		Department   string     `json:"department"`
	}
	
	if err := c.Bind(&createReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	if err := c.Validate(&createReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Check if username already exists
	_, err := h.userRepo.GetByUsername(createReq.Username)
	if err == nil {
		return echo.NewHTTPError(http.StatusConflict, "Username already exists")
	}
	
	// Check if email already exists
	_, err = h.userRepo.GetByEmail(createReq.Email)
	if err == nil {
		return echo.NewHTTPError(http.StatusConflict, "Email already exists")
	}
	
	// Create new user
	user := &domain.User{
		Username:     createReq.Username,
		Name:         createReq.Name,
		Email:        createReq.Email,
		Role:         createReq.Role,
		Gender:       createReq.Gender,
		Religion:     createReq.Religion,
		DateOfBirth:  createReq.DateOfBirth,
		PlaceOfBirth: createReq.PlaceOfBirth,
		Department:   createReq.Department,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}
	
	// Set password
	if err := user.SetPassword(createReq.Password); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to hash password")
	}
	
	// Save user to database
	if err := h.userRepo.Create(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create user")
	}
	
	// Return user response
	return c.JSON(http.StatusCreated, user.ToUserResponse())
}

// UpdateUser updates an existing user
func (h *AdminHandler) UpdateUser(c echo.Context) error {
	// Parse user ID
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}
	
	// Get existing user
	user, err := h.userRepo.GetByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}
	
	// Parse request
	var updateReq struct {
		Username     string     `json:"username"`
		Name         string     `json:"name"`
		Email        string     `json:"email"`
		Role         string     `json:"role" validate:"omitempty,oneof=student instructor admin"`
		Password     string     `json:"password"`
		Gender       string     `json:"gender"`
		Religion     string     `json:"religion"`
		DateOfBirth  *time.Time `json:"date_of_birth"`
		PlaceOfBirth string     `json:"place_of_birth"`
		Department   string     `json:"department"`
	}
	
	if err := c.Bind(&updateReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	if err := c.Validate(&updateReq); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Update fields if provided
	if updateReq.Username != "" && updateReq.Username != user.Username {
		// Check if username already exists
		existingUser, err := h.userRepo.GetByUsername(updateReq.Username)
		if err == nil && existingUser.ID != user.ID {
			return echo.NewHTTPError(http.StatusConflict, "Username already exists")
		}
		user.Username = updateReq.Username
	}
	
	if updateReq.Name != "" {
		user.Name = updateReq.Name
	}
	
	if updateReq.Email != "" && updateReq.Email != user.Email {
		// Check if email already exists
		existingUser, err := h.userRepo.GetByEmail(updateReq.Email)
		if err == nil && existingUser.ID != user.ID {
			return echo.NewHTTPError(http.StatusConflict, "Email already exists")
		}
		user.Email = updateReq.Email
	}
	
	if updateReq.Role != "" {
		user.Role = updateReq.Role
	}
	
	if updateReq.Password != "" {
		if err := user.SetPassword(updateReq.Password); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to hash password")
		}
	}
	
	if updateReq.Gender != "" {
		user.Gender = updateReq.Gender
	}
	
	if updateReq.Religion != "" {
		user.Religion = updateReq.Religion
	}
	
	if updateReq.DateOfBirth != nil {
		user.DateOfBirth = updateReq.DateOfBirth
	}
	
	if updateReq.PlaceOfBirth != "" {
		user.PlaceOfBirth = updateReq.PlaceOfBirth
	}
	
	if updateReq.Department != "" {
		user.Department = updateReq.Department
	}
	
	// Update timestamp
	user.UpdatedAt = time.Now()
	
	// Save updated user
	if err := h.userRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update user")
	}
	
	// Return user response
	return c.JSON(http.StatusOK, user.ToUserResponse())
}

// DeleteUser deletes a user
func (h *AdminHandler) DeleteUser(c echo.Context) error {
	// Parse user ID
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}
	
	// Check if user exists
	_, err = h.userRepo.GetByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}
	
	// Delete user
	if err := h.userRepo.Delete(uint(id)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to delete user")
	}
	
	// Return success response
	return c.JSON(http.StatusOK, map[string]string{
		"message": "User deleted successfully",
	})
}

// GetAllCourses returns all courses
func (h *AdminHandler) GetAllCourses(c echo.Context) error {
	// Parse pagination parameters
	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	page, _ := strconv.Atoi(c.QueryParam("page"))
	
	if limit <= 0 {
		limit = 10
	}
	if page <= 0 {
		page = 1
	}
	
	offset := (page - 1) * limit
	
	// Get courses from repository
	courses, err := h.courseRepo.GetCourses(limit, offset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get courses")
	}
	
	// Count total courses
	count, err := h.courseRepo.CountCourses()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to count courses")
	}
	
	// Return response
	return c.JSON(http.StatusOK, map[string]interface{}{
		"courses":     courses,
		"total":       count,
		"page":        page,
		"limit":       limit,
		"total_pages": (count + int64(limit) - 1) / int64(limit),
	})
}

// CreateCourse creates a new course
func (h *AdminHandler) CreateCourse(c echo.Context) error {
	// Parse request
	var course domain.Course
	
	if err := c.Bind(&course); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	if err := c.Validate(&course); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	
	// Set timestamps
	course.CreatedAt = time.Now()
	course.UpdatedAt = time.Now()
	
	// Create course
	if err := h.courseRepo.Create(&course); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create course")
	}
	
	// Return created course
	return c.JSON(http.StatusCreated, course)
}

// UpdateCourse updates an existing course
func (h *AdminHandler) UpdateCourse(c echo.Context) error {
	// Parse course ID
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid course ID")
	}
	
	// Get existing course
	course, err := h.courseRepo.GetByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Course not found")
	}
	
	// Parse request
	var updateCourse domain.Course
	if err := c.Bind(&updateCourse); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	// Update fields - only update the fields that are provided
	if updateCourse.Code != "" {
		course.Code = updateCourse.Code
	}
	
	if updateCourse.Title != "" {
		course.Title = updateCourse.Title
	}
	
	if updateCourse.Description != "" {
		course.Description = updateCourse.Description
	}
	
	if updateCourse.Category != "" {
		course.Category = updateCourse.Category
	}
	
	if updateCourse.Semester != "" {
		course.Semester = updateCourse.Semester
	}
	
	if updateCourse.Year > 0 {
		course.Year = updateCourse.Year
	}
	
	// Update timestamp
	course.UpdatedAt = time.Now()
	
	// Update course
	if err := h.courseRepo.Update(course); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update course")
	}
	
	// Return updated course
	return c.JSON(http.StatusOK, course)
}

// DeleteCourse deletes a course
func (h *AdminHandler) DeleteCourse(c echo.Context) error {
	// Parse course ID
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid course ID")
	}
	
	// Check if course exists
	_, err = h.courseRepo.GetByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Course not found")
	}
	
	// Delete course
	if err := h.courseRepo.Delete(uint(id)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to delete course")
	}
	
	// Return success response
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Course deleted successfully",
	})
}

// GetSystemSettings returns system settings
func (h *AdminHandler) GetSystemSettings(c echo.Context) error {
	// In a real application, these would come from a database
	settings := map[string]interface{}{
		"system_name":        "Learning Management System",
		"institution_name":   "Your University",
		"admin_email":        "admin@example.com",
		"maintenance_mode":   false,
		"academic_year":      "2024-2025",
		"semester":           "Spring",
		"max_file_size":      5242880, // 5MB
		"allowed_file_types": []string{".pdf", ".doc", ".docx", ".jpg", ".png"},
	}
	
	return c.JSON(http.StatusOK, settings)
}

// UpdateSystemSettings updates system settings
func (h *AdminHandler) UpdateSystemSettings(c echo.Context) error {
	// Parse request
	var settings map[string]interface{}
	
	if err := c.Bind(&settings); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	// In a real application, you would save these settings to a database
	
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Settings updated successfully",
	})
}