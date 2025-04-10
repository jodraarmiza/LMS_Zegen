package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// JWTMiddleware creates a custom JWT middleware for Echo
func JWTMiddleware(secret string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Extract token from the request
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Missing authorization header")
			}

			// Check if it's a Bearer token
			parts := strings.Split(authHeader, " ")
			if len(parts) != 2 || parts[0] != "Bearer" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token format")
			}
			tokenString := parts[1]

			// Parse and validate the token
			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				// Validate signing method
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(secret), nil
			})

			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token: "+err.Error())
			}

			if !token.Valid {
				return echo.NewHTTPError(http.StatusUnauthorized, "Token is invalid")
			}

			// Store token in context
			c.Set("user", token)

			return next(c)
		}
	}
}

// AdminOnly ensures only admin users can access
func AdminOnly(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		role, err := GetUserRoleFromToken(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}
		if role != "admin" {
			return echo.NewHTTPError(http.StatusForbidden, "Admin access required")
		}
		return next(c)
	}
}

// InstructorOnly ensures only instructor or admin users can access
func InstructorOnly(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		role, err := GetUserRoleFromToken(c)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
		}
		if role != "instructor" && role != "admin" {
			return echo.NewHTTPError(http.StatusForbidden, "Instructor access required")
		}
		return next(c)
	}
}

// GetUserIDFromToken extracts user ID from JWT token
func GetUserIDFromToken(c echo.Context) (uint, error) {
	user := c.Get("user")
	if user == nil {
		return 0, echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	token := user.(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)

	userIDRaw, ok := claims["sub"].(string)
	if !ok || userIDRaw == "" {
		return 0, echo.NewHTTPError(http.StatusUnauthorized, "Invalid token claims")
	}

	var id uint
	_, err := fmt.Sscanf(userIDRaw, "%d", &id)
	if err != nil {
		return 0, echo.NewHTTPError(http.StatusUnauthorized, "Invalid user ID in token")
	}

	return id, nil
}

// GetUserRoleFromToken extracts user role from JWT token
func GetUserRoleFromToken(c echo.Context) (string, error) {
	user := c.Get("user")
	if user == nil {
		return "", echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
	}

	token := user.(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)

	// Check if role is directly in claims
	if role, ok := claims["role"].(string); ok && role != "" {
		return role, nil
	}
	
	// Or check if it's in the audience field
	if aud, ok := claims["aud"]; ok {
		switch v := aud.(type) {
		case []interface{}:
			if len(v) > 0 {
				if role, ok := v[0].(string); ok {
					return role, nil
				}
			}
		case string:
			return v, nil
		}
	}

	return "", echo.NewHTTPError(http.StatusUnauthorized, "Role not found in token")
}

// ExtractBearerToken extracts the bearer token from Authorization header
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