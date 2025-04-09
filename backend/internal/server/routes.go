package server

import (
	"backend/internal/service"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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
	auth.POST("/register", authService.Register)
	auth.POST("/refresh", authService.RefreshToken)

	// Protected routes - require authentication
	protected := api.Group("")
	protected.Use(jwtMiddleware)

	// Auth routes - auth required
	auth.GET("/validate", authService.ValidateToken, jwtMiddleware)
	auth.POST("/logout", authService.Logout, jwtMiddleware)

	// User routes
	users := protected.Group("/users")
	users.GET("", userService.GetUsers)
	users.GET("/me", userService.GetCurrentUser)
	users.GET("/:id", userService.GetUser)
	users.PUT("/:id", userService.UpdateUser)
	users.PUT("/me", userService.UpdateCurrentUser)
	users.PUT("/me/password", userService.UpdatePassword)
	users.POST("/me/profile-photo", userService.UploadProfilePhoto, middleware.BodyLimit(strconv.FormatInt(s.config.Upload.MaxSize, 10)))

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
	sessions.GET("/:id/contents", sessionService.GetSessionContents)
	sessions.POST("/:id/contents", sessionService.AddSessionContent)
	sessions.PUT("/:id/contents/:contentId", sessionService.UpdateSessionContent)
	sessions.DELETE("/:id/contents/:contentId", sessionService.DeleteSessionContent)
	sessions.GET("/:id/materials", sessionService.GetMaterials)
	sessions.POST("/:id/materials", sessionService.AddMaterial, middleware.BodyLimit(strconv.FormatInt(s.config.Upload.MaxSize, 10)))
	sessions.PUT("/:id/materials/:materialId", sessionService.UpdateMaterial)
	sessions.DELETE("/:id/materials/:materialId", sessionService.DeleteMaterial)
	sessions.GET("/:id/materials/:materialId/download", sessionService.DownloadMaterial)

	// Attendance routes
	attendance := protected.Group("/courses/:courseId/sessions/:sessionId/attendance")
	attendance.GET("", attendanceService.GetSessionAttendance)
	attendance.GET("/me", attendanceService.GetMyAttendance)
	attendance.POST("", attendanceService.MarkAttendance)
	attendance.POST("/me", attendanceService.MarkMyAttendance)
	attendance.GET("/user/:userId", attendanceService.GetUserAttendance)

	// Attendance summary routes
	attendanceSummary := protected.Group("/courses/:courseId/attendance")
	attendanceSummary.GET("", attendanceService.GetCourseAttendance)
	attendanceSummary.GET("/me", attendanceService.GetMyCourseAttendance)
	attendanceSummary.GET("/user/:userId", attendanceService.GetUserCourseAttendance)

	// Syllabus routes
	syllabus := protected.Group("/courses/:courseId/syllabus")
	syllabus.GET("", syllabusService.GetSyllabus)
	syllabus.POST("", syllabusService.CreateSyllabus)
	syllabus.PUT("", syllabusService.UpdateSyllabus)
	syllabus.GET("/learning-outcomes", syllabusService.GetLearningOutcomes)
	syllabus.POST("/learning-outcomes", syllabusService.AddLearningOutcome)
	syllabus.PUT("/learning-outcomes/:id", syllabusService.UpdateLearningOutcome)
	syllabus.DELETE("/learning-outcomes/:id", syllabusService.DeleteLearningOutcome)
	syllabus.GET("/teaching-strategies", syllabusService.GetTeachingStrategies)
	syllabus.POST("/teaching-strategies", syllabusService.AddTeachingStrategy)
	syllabus.PUT("/teaching-strategies/:id", syllabusService.UpdateTeachingStrategy)
	syllabus.DELETE("/teaching-strategies/:id", syllabusService.DeleteTeachingStrategy)
	syllabus.GET("/textbooks", syllabusService.GetTextbooks)
	syllabus.POST("/textbooks", syllabusService.AddTextbook)
	syllabus.PUT("/textbooks/:id", syllabusService.UpdateTextbook)
	syllabus.DELETE("/textbooks/:id", syllabusService.DeleteTextbook)

	// Assessment routes
	assessments := protected.Group("/courses/:courseId/assessments")
	assessments.GET("", assessmentService.GetAssessments)
	assessments.GET("/:id", assessmentService.GetAssessment)
	assessments.POST("", assessmentService.CreateAssessment)
	assessments.PUT("/:id", assessmentService.UpdateAssessment)
	assessments.DELETE("/:id", assessmentService.DeleteAssessment)
	assessments.POST("/:id/submit", assessmentService.SubmitAssessment, middleware.BodyLimit(strconv.FormatInt(s.config.Upload.MaxSize, 10)))
	assessments.GET("/:id/submissions", assessmentService.GetSubmissions)
	assessments.GET("/:id/submissions/:submissionId", assessmentService.GetSubmission)
	assessments.PUT("/:id/submissions/:submissionId/grade", assessmentService.GradeSubmission)
	assessments.GET("/:id/submissions/me", assessmentService.GetMySubmissions)
	assessments.GET("/:id/rubric", assessmentService.GetRubric)
	assessments.POST("/:id/rubric", assessmentService.CreateRubricItem)
	assessments.PUT("/:id/rubric/:rubricId", assessmentService.UpdateRubricItem)
	assessments.DELETE("/:id/rubric/:rubricId", assessmentService.DeleteRubricItem)

	// Exam routes
	exams := protected.Group("/courses/:courseId/exams")
	exams.GET("", examService.GetExams)
	exams.GET("/:id", examService.GetExam)
	exams.POST("", examService.CreateExam)
	exams.PUT("/:id", examService.UpdateExam)
	exams.DELETE("/:id", examService.DeleteExam)
	exams.GET("/:id/questions", examService.GetQuestions)
	exams.POST("/:id/questions", examService.AddQuestion)
	exams.PUT("/:id/questions/:questionId", examService.UpdateQuestion)
	exams.DELETE("/:id/questions/:questionId", examService.DeleteQuestion)
	exams.POST("/:id/start", examService.StartExam)
	exams.POST("/:id/submit", examService.SubmitExam)
	exams.POST("/:id/answer", examService.AnswerQuestion)
	exams.GET("/:id/attempts", examService.GetAttempts)
	exams.GET("/:id/attempts/me", examService.GetMyAttempts)
	exams.GET("/:id/attempts/:attemptId", examService.GetAttempt)

	// Forum routes
	forums := protected.Group("/courses/:courseId/forums")
	forums.GET("", forumService.GetThreads)
	forums.GET("/:id", forumService.GetThread)
	forums.POST("", forumService.CreateThread)
	forums.PUT("/:id", forumService.UpdateThread)
	forums.DELETE("/:id", forumService.DeleteThread)
	forums.GET("/:id/messages", forumService.GetMessages)
	forums.POST("/:id/messages", forumService.CreateMessage)
	forums.PUT("/:id/messages/:messageId", forumService.UpdateMessage)
	forums.DELETE("/:id/messages/:messageId", forumService.DeleteMessage)
	forums.PUT("/:id/view", forumService.IncrementViews)

	// Grade routes
	grades := protected.Group("/courses/:courseId/gradebook")
	grades.GET("", gradeService.GetCourseGrades)
	grades.GET("/me", gradeService.GetMyGrades)
	grades.GET("/users/:userId", gradeService.GetUserGrades)
	grades.POST("", gradeService.CreateGrade)
	grades.PUT("/:id", gradeService.UpdateGrade)
	grades.DELETE("/:id", gradeService.DeleteGrade)
	grades.GET("/calculate", gradeService.CalculateCourseGrade)
	grades.POST("/calculate/:userId", gradeService.CalculateUserCourseGrade)

	// Schedule routes
	schedule := protected.Group("/schedule")
	schedule.GET("", scheduleService.GetSchedule)
	schedule.GET("/events/:id", scheduleService.GetEvent)
	schedule.POST("/events", scheduleService.CreateEvent)
	schedule.PUT("/events/:id", scheduleService.UpdateEvent)
	schedule.DELETE("/events/:id", scheduleService.DeleteEvent)
	schedule.GET("/activities", scheduleService.GetActivities)
	schedule.GET("/activities/:id", scheduleService.GetActivity)
	schedule.POST("/activities", scheduleService.CreateActivity)
	schedule.PUT("/activities/:id", scheduleService.UpdateActivity)
	schedule.DELETE("/activities/:id", scheduleService.DeleteActivity)
}