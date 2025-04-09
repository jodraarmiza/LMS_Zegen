package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

// JWTMiddleware creates a JWT middleware for authentication
func JWTMiddleware(secret string) echo.MiddlewareFunc {
	config := echomiddleware.JWTConfig{
		Claims:     &jwt.RegisteredClaims{},
		SigningKey: []byte(secret),
		ErrorHandler: func(err error) error {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid or expired token")
		},
		TokenLookup: "header:Authorization",
		AuthScheme:  "Bearer",
		ContextKey:  "user",
	}
	return echomiddleware.JWTWithConfig(config)
}

// AdminOnly is a middleware that ensures only admin users can access the route
func AdminOnly(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Get user role from token
		role, err := GetUserRoleFromToken(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}

		// Check if user is admin
		if role != "admin" {
			return echo.NewHTTPError(http.StatusForbidden, "Admin access required")
		}

		// Call the next handler
		return next(c)
	}
}

// InstructorOnly is a middleware that ensures only instructors can access the route
func InstructorOnly(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Get user role from token
		role, err := GetUserRoleFromToken(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}

		// Check if user is an instructor or admin
		if role != "instructor" && role != "admin" {
			return echo.NewHTTPError(http.StatusForbidden, "Instructor access required")
		}

		// Call the next handler
		return next(c)
	}
}

// GetUserIDFromToken extracts the user ID from the JWT token
func GetUserIDFromToken(c echo.Context) (uint, error) {
	user := c.Get("user")
	if user == nil {
		return 0, echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	token := user.(*jwt.Token)
	claims := token.Claims.(*jwt.RegisteredClaims)

	// Extract subject (user ID) from claims
	userID := claims.Subject
	if userID == "" {
		return 0, echo.NewHTTPError(http.StatusUnauthorized, "Invalid token claims")
	}

	// Convert userID string to uint
	var id uint
	_, err := fmt.Sscanf(userID, "%d", &id)
	if err != nil {
		return 0, echo.NewHTTPError(http.StatusUnauthorized, "Invalid user ID in token")
	}

	return id, nil
}

// GetUserRoleFromToken extracts the user role from the JWT token
func GetUserRoleFromToken(c echo.Context) (string, error) {
	user := c.Get("user")
	if user == nil {
		return "", echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	token := user.(*jwt.Token)
	claims := token.Claims.(*jwt.RegisteredClaims)

	// Get audience from claims (role should be in audience)
	audiences := claims.Audience
	if len(audiences) == 0 {
		return "", echo.NewHTTPError(http.StatusUnauthorized, "Invalid token claims")
	}

	// The first audience value should be the role
	role := audiences[0]
	return role, nil
}

// ExtractBearerToken extracts the bearer token from the Authorization header
func ExtractBearerToken(authHeader string) string {
	if authHeader == "" {
		return ""
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		return ""
	}

	return parts[1]
}