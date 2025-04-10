package domain

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	Username        string         `json:"username" gorm:"size:50;uniqueIndex;not null"`
	Name            string         `json:"name" gorm:"not null"`
	Email           string         `json:"email" gorm:"uniqueIndex;not null"`
	Password        string         `json:"-" gorm:"not null"` // hide password in JSON
	Role            string         `json:"role" gorm:"type:user_role;not null"`
	Gender          string         `json:"gender" gorm:"size:10"`
	Religion        string         `json:"religion" gorm:"size:50"`
	DateOfBirth     *time.Time     `json:"date_of_birth"`
	PlaceOfBirth    string         `json:"place_of_birth" gorm:"size:100"`
	Department      string         `json:"department" gorm:"size:100"`
	ProfilePhotoURL string         `json:"profile_photo_url" gorm:"size:255"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index"`

	StudentInfo     StudentInfo
	InstructorInfo  InstructorInfo
}

// SetPassword hashes the user password
func (u *User) SetPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return err
	}
	u.Password = string(bytes)
	return nil
}

// CheckPassword compares the given password with the user's password
func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

// UserResponse is the user response format
type UserResponse struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
