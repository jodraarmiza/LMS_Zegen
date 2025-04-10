package server

import (
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
	jwtMiddleware echo.MiddlewareFunc,
) {
	// Health check
	s.echo.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]string{"status": "ok"})
	})
	
	// API version group
	api := s.echo.Group("/api/v1")
	
	// Auth routes - no auth required
	auth := api.Group("/auth")
	auth.POST("/login", authService.Login)
	auth.POST("/refresh", authService.RefreshToken)
	
	// Protected routes - require authentication
	protected := api.Group("")
	protected.Use(jwtMiddleware)
	
	// Auth routes - auth required
	auth.POST("/logout", authService.Logout, jwtMiddleware)
	
	// User routes
	users := protected.Group("/users")
	users.GET("", userService.GetUsers)
	users.GET("/me", userService.GetCurrentUser)
	users.GET("/:id", userService.GetUser)
	users.PUT("/:id", userService.UpdateUser)
	users.PUT("/me", userService.UpdateCurrentUser)
	users.PUT("/me/password", userService.UpdatePassword)
	users.POST("/me/profile-photo", userService.UploadProfilePhoto, echomiddleware.BodyLimit(s.config.Upload.String()))
	
	// For now, comment out the routes that aren't implemented yet
	// Students routes
	students := protected.Group("/students")
	students.GET("", userService.GetStudents)
	students.GET("/:id", userService.GetStudent)
	students.PUT("/:id", userService.UpdateStudent)
	
	// Instructors routes
	instructors := protected.Group("/instructors")
	instructors.GET("", userService.GetInstructors)
	instructors.GET("/:id", userService.GetInstructor)
	instructors.PUT("/:id", userService.UpdateInstructor)
	
	// The following services are not implemented yet, so we'll comment them out
	/*
	// Courses routes
	courses := protected.Group("/courses")
	courses.GET("", courseService.GetCourses)
	courses.GET("/:id", courseService.GetCourse)
	courses.POST("", courseService.CreateCourse)
	courses.PUT("/:id", courseService.UpdateCourse)
	courses.DELETE("/:id", courseService.DeleteCourse)
	courses.GET("/:id/instructors", courseService.GetCourseInstructors)
	courses.POST("/:id/instructors", courseService.AddCourseInstructor)
	courses.DELETE("/:id/instructors/:instructorId", courseService.RemoveCourseInstructor)
	courses.GET("/:id/students", courseService.GetCourseStudents)
	courses.POST("/:id/students", courseService.EnrollStudent)
	courses.DELETE("/:id/students/:studentId", courseService.UnenrollStudent)
	
	// Sessions routes
	sessions := protected.Group("/courses/:courseId/sessions")
	sessions.GET("", sessionService.GetSessions)
	sessions.GET("/:id", sessionService.GetSession)
	sessions.POST("", sessionService.CreateSession)
	sessions.PUT("/:id", sessionService.UpdateSession)
	sessions.DELETE("/:id", sessionService.DeleteSession)
	
	// etc...
	*/
}