package server

import (
	"fmt"
	"net/http"

	"backend/internal/config"
	"backend/internal/domain"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Server represents the HTTP server
type Server struct {
	echo   *echo.Echo
	config *config.Config
	db     *gorm.DB
}

// CustomValidator is a custom validator for Echo
type CustomValidator struct {
	Validator *validator.Validate
}

// Validate validates structs using validator package
func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.Validator.Struct(i); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

// New creates a new server instance
func New(cfg *config.Config) (*Server, error) {
	// Initialize Echo
	e := echo.New()
	
	// Set up middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	
	// Configure CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: cfg.CORS.AllowedOrigins,
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))
	
	// Set up validator
	v := validator.New()
	e.Validator = &CustomValidator{Validator: v}
	
	// Connect to the database
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Database.Host,
		cfg.Database.Port,
		cfg.Database.Username,
		cfg.Database.Password,
		cfg.Database.DBName,
		cfg.Database.SSLMode,
	)
	
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	
	// Create server instance
	server := &Server{
		echo:   e,
		config: cfg,
		db:     db,
	}
	
	// Auto-migrate database models
	if err := server.autoMigrate(); err != nil {
		return nil, fmt.Errorf("failed to migrate database: %w", err)
	}
	
	// Setup routes
	server.setupRoutes()
	
	// Serve static files
	e.Static("/uploads", cfg.Upload.Directory)
	
	return server, nil
}

// autoMigrate automatically migrates the database schema
func (s *Server) autoMigrate() error {
	// Migrate domain models
	err := s.db.AutoMigrate(
		&domain.User{},
		&domain.StudentInfo{},
		&domain.InstructorInfo{},
		&domain.RefreshToken{},
		&domain.Course{},
		&domain.CourseInstructor{},
		&domain.CourseStudent{},
		&domain.Session{},
		&domain.SessionContent{},
		&domain.Material{},
		&domain.Attendance{},
		&domain.Syllabus{},
		&domain.LearningOutcome{},
		&domain.TeachingStrategy{},
		&domain.Textbook{},
		&domain.ForumThread{},
		&domain.ForumMessage{},
	)
	
	return err
}

// setupRoutes sets up the API routes
func (s *Server) setupRoutes() {
	// Health check
	s.echo.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"status": "ok",
		})
	})

	// Create API group
	api := s.echo.Group("/api/v1")

	// Define routes here
	// Example:
	// api.GET("/users", userController.GetUsers)
	// api.POST("/auth/login", authController.Login)
}

// Start starts the server
func (s *Server) Start(addr string) error {
	return s.echo.Start(addr)
}

// Shutdown gracefully shuts down the server
func (s *Server) Shutdown(ctx echo.Context) error {
	return s.echo.Shutdown(ctx.Request().Context())
}