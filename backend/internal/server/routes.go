// internal/server/routes.go
package server

import (
	"backend/internal/handlers"
	"backend/pkg/middleware"
	"backend/internal/service"
	
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

// registerRoutes registers all API routes
func (s *Server) registerRoutes(
	authService *service.AuthService,
	userService *service.UserService,
	courseService *service.CourseService,
	sessionService *service.SessionService,
	attendanceService *service.AttendanceService,
	syllabusService *service.SyllabusService,
	assessmentService *service.AssessmentService,
	examService *service.ExamService,
	forumService *service.ForumService,
	gradeService *service.GradeService,
	scheduleService *service.ScheduleService,
	jwtSecret string,
	adminHandler *handler.AdminHandler, // Add this parameter
) {
	// Health check endpoint at root level
	s.echo.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]string{"status": "ok"})
	})
	
	// API version group
	api := s.echo.Group("/api/v1")
	
	// Health check inside API group
	api.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]string{"status": "ok"})
	})
	
	// Auth routes - keep these unprotected
	auth := api.Group("/auth")
	auth.POST("/login", authService.Login)
	auth.POST("/register", authService.Register)
	auth.POST("/refresh", authService.RefreshToken)
	
	// Create JWT middleware
	jwtMiddleware := middleware.JWT(jwtSecret)
	
	// Protected routes - require authentication
	protected := api.Group("")
	protected.Use(jwtMiddleware)
	
	// Logout endpoint (requires authentication)
	protected.POST("/auth/logout", authService.Logout)
	
	// User routes
	users := protected.Group("/users")
	users.GET("/me", userService.GetCurrentUser)
	users.PUT("/me", userService.UpdateCurrentUser)
	users.PUT("/me/password", userService.UpdatePassword)
	
	if s.config.Upload.Directory != "" {
		users.POST("/me/profile-photo", userService.UploadProfilePhoto, echomiddleware.BodyLimit(s.config.Upload.String()))
	}
	
	// Admin routes - using AdminHandler
	if adminHandler != nil {
		admin := protected.Group("/admin")
		admin.Use(middleware.RequireAdmin())
		
		// Admin user management
		admin.GET("/users", adminHandler.GetAllUsers)
		admin.POST("/users", adminHandler.CreateUser)
		admin.PUT("/users/:id", adminHandler.UpdateUser)
		admin.DELETE("/users/:id", adminHandler.DeleteUser)
		
		// Admin course management
		admin.GET("/courses", adminHandler.GetAllCourses)
		admin.POST("/courses", adminHandler.CreateCourse)
		admin.PUT("/courses/:id", adminHandler.UpdateCourse)
		admin.DELETE("/courses/:id", adminHandler.DeleteCourse)
		
		// Admin dashboard and settings
		admin.GET("/dashboard/stats", adminHandler.GetDashboardStats)
		admin.GET("/settings", adminHandler.GetSystemSettings)
		admin.PUT("/settings", adminHandler.UpdateSystemSettings)
	}
	
	// Comment out or conditionally add the routes that depend on unimplemented services
	/* 
	// Student routes
	student := protected.Group("/student")
	student.Use(middleware.RequireStudent())
	
	if courseService != nil {
		student.GET("/courses", courseService.GetStudentCourses)
	}
	if assessmentService != nil {
		student.GET("/assessments", assessmentService.GetStudentAssessments)
	}
	if gradeService != nil {
		student.GET("/grades", gradeService.GetStudentGrades)
	}
	if scheduleService != nil {
		student.GET("/schedule", scheduleService.GetStudentSchedule)
	}
	if attendanceService != nil {
		student.GET("/attendance", attendanceService.GetStudentAttendance)
	}
	
	// Instructor routes
	instructor := protected.Group("/instructor")
	instructor.Use(middleware.RequireInstructor())
	
	if courseService != nil {
		instructor.GET("/courses", courseService.GetInstructorCourses)
		instructor.GET("/courses/:id/students", courseService.GetCourseStudents)
	}
	if assessmentService != nil {
		instructor.POST("/courses/:id/assessments", assessmentService.CreateAssessment)
	}
	if syllabusService != nil {
		instructor.PUT("/courses/:id/syllabus", syllabusService.UpdateSyllabus)
	}
	if attendanceService != nil {
		instructor.POST("/courses/:id/attendance", attendanceService.RecordAttendance)
	}
	if gradeService != nil {
		instructor.POST("/grades", gradeService.AddGrade)
	}
	
	// Shared routes - accessible by all authenticated users
	shared := protected.Group("")
	
	// Course routes for all users
	if courseService != nil {
		courses := shared.Group("/courses")
		courses.GET("", courseService.GetCourses)
		courses.GET("/:id", courseService.GetCourse)
	}
	
	// Forums - accessible to all authenticated users
	if forumService != nil {
		forums := shared.Group("/forums")
		forums.GET("", forumService.GetForums)
		forums.GET("/:id", forumService.GetForumDetails)
		forums.POST("/:id/posts", forumService.CreatePost)
		forums.POST("/posts/:id/comments", forumService.CreateComment)
	}
	*/
}