package auth

import (
	"fmt"
	"strconv"
	"time"

	"backend/internal/domain"

	"github.com/golang-jwt/jwt/v5"
)

// GenerateTokens generates both access and refresh tokens
func GenerateTokens(user domain.User, jwtSecret string, accessExpirationHours time.Duration, refreshExpirationHours time.Duration) (string, string, error) {
	// Create access token
	accessToken, err := generateAccessToken(user, jwtSecret, accessExpirationHours)
	if err != nil {
		return "", "", err
	}

	// Create refresh token
	refreshToken, err := generateRefreshToken(user, jwtSecret, refreshExpirationHours)
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

// generateAccessToken generates a JWT access token for the given user
func generateAccessToken(user domain.User, jwtSecret string, expirationHours time.Duration) (string, error) {
	// Create expiration time
	expirationTime := time.Now().Add(expirationHours)

	// Create claims
	claims := jwt.RegisteredClaims{
		Subject:   strconv.FormatUint(uint64(user.ID), 10),
		ExpiresAt: jwt.NewNumericDate(expirationTime),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		NotBefore: jwt.NewNumericDate(time.Now()),
		Audience:  []string{string(user.Role)},
		ID:        fmt.Sprintf("%d-%d", user.ID, time.Now().Unix()),
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// generateRefreshToken generates a JWT refresh token for the given user
func generateRefreshToken(user domain.User, jwtSecret string, expirationHours time.Duration) (string, error) {
	// Create expiration time
	expirationTime := time.Now().Add(expirationHours)

	// Create claims with longer expiration
	claims := jwt.RegisteredClaims{
		Subject:   strconv.FormatUint(uint64(user.ID), 10),
		ExpiresAt: jwt.NewNumericDate(expirationTime),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		NotBefore: jwt.NewNumericDate(time.Now()),
		ID:        fmt.Sprintf("refresh-%d-%d", user.ID, time.Now().Unix()),
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidateToken validates a JWT token
func ValidateToken(tokenString string, jwtSecret string) (*jwt.Token, error) {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// Return the signing key
		return []byte(jwtSecret), nil
	})

	if err != nil {
		return nil, err
	}

	// Check if token is valid
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token, nil
}

// ExtractUserIDFromToken extracts the user ID from a JWT token
func ExtractUserIDFromToken(token *jwt.Token) (uint, error) {
	// Extract claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, fmt.Errorf("failed to extract claims")
	}

	// Extract subject (user ID)
	subject, ok := claims["sub"].(string)
	if !ok {
		return 0, fmt.Errorf("failed to extract subject")
	}

	// Convert subject to uint
	userID, err := strconv.ParseUint(subject, 10, 64)
	if err != nil {
		return 0, err
	}

	return uint(userID), nil
}