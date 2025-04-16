// internal/middleware/jwt.go
package middleware

import (
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// JWT middleware for authenticating requests
func JWT(secret string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			auth := c.Request().Header.Get("Authorization")
			if auth == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Authorization header is required")
			}

			parts := strings.Split(auth, " ")
			if len(parts) != 2 || parts[0] != "Bearer" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid authorization format")
			}

			tokenString := parts[1]
			token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
				return []byte(secret), nil
			})

			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token: "+err.Error())
			}

			if !token.Valid {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token claims")
			}

			// Store user ID in context
			userID, ok := claims["user_id"].(float64)
			if !ok {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid user ID in token")
			}

			// Store role in context if it exists
			var role string
			if roleValue, exists := claims["role"]; exists {
				if roleString, ok := roleValue.(string); ok {
					role = roleString
				} else {
					role = "student" // Default to student if role is invalid
				}
			} else {
				role = "student" // Default to student if role is not in token
			}

			c.Set("user_id", uint(userID))
			c.Set("role", role)

			return next(c)
		}
	}
}

// GetUserIDFromToken extracts the user ID from context
func GetUserIDFromToken(c echo.Context) (uint, error) {
	userID, ok := c.Get("user_id").(uint)
	if !ok {
		return 0, echo.NewHTTPError(http.StatusUnauthorized, "User ID not found in token")
	}
	return userID, nil
}

// RequireAdmin middleware checks if the user has admin role
func RequireAdmin() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			role, ok := c.Get("role").(string)
			if !ok || role != "admin" {
				return echo.NewHTTPError(http.StatusForbidden, "Admin access required")
			}
			return next(c)
		}
	}
}

// RequireInstructor middleware checks if the user has instructor role
func RequireInstructor() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			role, ok := c.Get("role").(string)
			if !ok || (role != "instructor" && role != "admin") {
				return echo.NewHTTPError(http.StatusForbidden, "Instructor access required")
			}
			return next(c)
		}
	}
}

// RequireStudent middleware checks if the user has student role
func RequireStudent() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			role, ok := c.Get("role").(string)
			if !ok || (role != "student" && role != "instructor" && role != "admin") {
				return echo.NewHTTPError(http.StatusForbidden, "Student access required")
			}
			return next(c)
		}
	}
}