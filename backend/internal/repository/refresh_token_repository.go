package repository

import (
	"errors"
	"time"

	"backend/internal/domain"
	"gorm.io/gorm"
)

// RefreshTokenRepository handles database operations for refresh tokens
type RefreshTokenRepository struct {
	db *gorm.DB
}

// NewRefreshTokenRepository creates a new refresh token repository
func NewRefreshTokenRepository(db *gorm.DB) *RefreshTokenRepository {
	return &RefreshTokenRepository{db: db}
}

// CreateToken creates a new refresh token
func (r *RefreshTokenRepository) CreateToken(userID uint, token string, expiresAt time.Time) error {
	refreshToken := domain.RefreshToken{
		UserID:    userID,
		Token:     token,
		ExpiresAt: expiresAt,
	}
	return r.db.Create(&refreshToken).Error
}

// GetByToken gets a refresh token by token string
func (r *RefreshTokenRepository) GetByToken(token string) (*domain.RefreshToken, error) {
	var refreshToken domain.RefreshToken
	if err := r.db.Where("token = ?", token).First(&refreshToken).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("refresh token not found")
		}
		return nil, err
	}
	return &refreshToken, nil
}

// DeleteToken deletes a refresh token
func (r *RefreshTokenRepository) DeleteToken(token string) error {
	return r.db.Where("token = ?", token).Delete(&domain.RefreshToken{}).Error
}

// DeleteUserTokens deletes all refresh tokens for a user
func (r *RefreshTokenRepository) DeleteUserTokens(userID uint) error {
	return r.db.Where("user_id = ?", userID).Delete(&domain.RefreshToken{}).Error
}

// DeleteExpiredTokens deletes all expired refresh tokens
func (r *RefreshTokenRepository) DeleteExpiredTokens() error {
	return r.db.Where("expires_at < ?", time.Now()).Delete(&domain.RefreshToken{}).Error
}

// IsTokenValid checks if a refresh token is valid
func (r *RefreshTokenRepository) IsTokenValid(token string) (bool, error) {
	refreshToken, err := r.GetByToken(token)
	if err != nil {
		return false, err
	}

	// Check if token is expired
	if refreshToken.ExpiresAt.Before(time.Now()) {
		return false, nil
	}

	return true, nil
}