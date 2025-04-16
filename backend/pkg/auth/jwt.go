package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// GenerateToken generates a JWT token with role information
func GenerateToken(userID uint, role string, secret string, expiration time.Duration) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     time.Now().Add(expiration).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// ValidateToken validates a JWT token
func ValidateToken(tokenString string, secret string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
}

// ExtractUserID extracts the user ID from a validated token
func ExtractUserID(token *jwt.Token) (uint, bool) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, false
	}
	
	userID, ok := claims["user_id"].(float64)
	if !ok {
		return 0, false
	}
	
	return uint(userID), true
}

// ExtractRole extracts the role from a validated token
func ExtractRole(token *jwt.Token) (string, bool) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", false
	}
	
	role, ok := claims["role"].(string)
	if !ok {
		// For backward compatibility - default to "student" if role not present
		return "student", true
	}
	
	return role, true
}