// internal/domain/user.go
package domain

import (
	"time"

	// "golang.org/x/crypto/bcrypt"
)

// User represents a user in the system
type User struct {
    ID              uint      `json:"id" gorm:"primaryKey"`
    Name            string    `json:"name" gorm:"not null"`
    Email           string    `json:"email" gorm:"uniqueIndex;not null"`
    Password        string    `json:"-" gorm:"not null"` // Password is not exposed in JSON
    ProfilePhotoURL string    `json:"profile_photo_url"` // Make sure this field exists
    CreatedAt       time.Time `json:"created_at"`
    UpdatedAt       time.Time `json:"updated_at"`
}

// UserResponse is the user response format
type UserResponse struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}



