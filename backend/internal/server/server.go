package server

import (
	"backend/internal/config"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/pkg/middleware"
	"context"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

// Server represents the HTTP server
type Server struct {
	echo   *echo.Echo
	db     *gorm.DB
	config *config.Config
}

// New creates a new server
func New(cfg *config.Config, db *gorm.DB) (*Server, error) {
	// Create Echo instance
	e := echo.New()
	e.Validator = &CustomValidator{validator: validator.New()}

	// Middleware
	e.Use(echomiddleware.Logger())
	e.Use(echomiddleware.Recover())
	
	// CORS middleware - updated to be more permissive for development
	e.Use(echomiddleware.CORSWithConfig(echomiddleware.CORSConfig{
		AllowOrigins: []string{"*"}, // Allow all origins for development
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodDelete,
			http.MethodOptions,
		},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAuthorization,
			"*", // Allow all headers for development
		},
		AllowCredentials: true,
		MaxAge: 86400, // Increase cache time for preflight requests
	}))

	// Create server
	server := &Server{
		echo:   e,
		db:     db,
		config: cfg,
	}

	// Setup routes
	server.setupRoutes()

	return server, nil
}

// Start starts the server
func (s *Server) Start(address string) error {
	// Use 0.0.0.0 to listen on all interfaces
	if address == "localhost:50404" || address == ":50404" {
		address = "0.0.0.0:50404"
	}
	return s.echo.Start(address)
}

// Shutdown gracefully shuts down the server
func (s *Server) Shutdown(ctx context.Context) error {
	return s.echo.Shutdown(ctx)
}

// setupRoutes sets up the API routes
func (s *Server) setupRoutes() {
	// Initialize repositories
	userRepo := repository.NewUserRepository(s.db)
	refreshTokenRepo := repository.NewRefreshTokenRepository(s.db)
	
	// Parse JWT expiration
	jwtExpiration, _ := time.ParseDuration(s.config.JWT.Expiration)
	refreshExpiration, _ := time.ParseDuration(s.config.JWT.RefreshExpiration)

	// Initialize services
	authService := service.NewAuthService(
		userRepo,
		refreshTokenRepo,
		s.config.JWT.Secret,
		jwtExpiration,
		refreshExpiration,
	)
	userService := service.NewUserService(userRepo, s.config.Upload.Directory)

	// Initialize JWT middleware
	jwtMiddleware := middleware.JWTMiddleware(s.config.JWT.Secret)
	
	// Register routes
	s.registerRoutes(
		authService,
		userService,
		nil, // courseService
		nil, // sessionService
		nil, // attendanceService
		nil, // syllabusService
		nil, // assessmentService
		nil, // examService
		nil, // forumService
		nil, // gradeService
		nil, // scheduleService
		jwtMiddleware,
	)
}

// CustomValidator is a custom validator for echo
type CustomValidator struct {
	validator *validator.Validate
}

// Validate validates a struct
func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}