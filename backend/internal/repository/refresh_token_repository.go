package repository

import (
	"backend/internal/domain"
	"errors"
	"time"

	"gorm.io/gorm"
)

// RefreshTokenRepository handles database operations for refresh tokens
type RefreshTokenRepository struct {
	db *gorm.DB
}

// NewRefreshTokenRepository creates a new refresh token repository
func NewRefreshTokenRepository(db *gorm.DB) *RefreshTokenRepository {
	return &RefreshTokenRepository{db}
}

// GetByToken retrieves a refresh token by token string
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

// Create creates a new refresh token
func (r *RefreshTokenRepository) Create(token *domain.RefreshToken) error {
	return r.db.Create(token).Error
}

// DeleteByToken deletes a refresh token by token string
func (r *RefreshTokenRepository) DeleteByToken(token string) error {
	return r.db.Where("token = ?", token).Delete(&domain.RefreshToken{}).Error
}

// DeleteByUserID deletes all refresh tokens for a user
func (r *RefreshTokenRepository) DeleteByUserID(userID uint) error {
	return r.db.Where("user_id = ?", userID).Delete(&domain.RefreshToken{}).Error
}

// DeleteExpired deletes all expired refresh tokens
func (r *RefreshTokenRepository) DeleteExpired() error {
	return r.db.Where("expires_at < ?", time.Now()).Delete(&domain.RefreshToken{}).Error
}