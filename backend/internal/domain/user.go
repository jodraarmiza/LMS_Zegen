package domain

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Role represents user roles in the system
type Role string

const (
	RoleAdmin      Role = "admin"
	RoleInstructor Role = "instructor"
	RoleStudent    Role = "student"
)

// User represents a user in the system
type User struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	Username        string         `json:"username" gorm:"unique;not null"`
	Password        string         `json:"-" gorm:"not null"` // Password is never returned in JSON responses
	Name            string         `json:"name" gorm:"not null"`
	Email           string         `json:"email" gorm:"unique;not null"`
	Role            Role           `json:"role" gorm:"type:varchar(20);not null"`
	Gender          string         `json:"gender" gorm:"type:varchar(10)"`
	Religion        string         `json:"religion" gorm:"type:varchar(50)"`
	DateOfBirth     *time.Time     `json:"dateOfBirth"`
	PlaceOfBirth    string         `json:"placeOfBirth"`
	Department      string         `json:"department"`
	ProfilePhotoURL string         `json:"profilePhotoURL"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// StudentInfo contains additional information for students
type StudentInfo struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	UserID        uint           `json:"userId" gorm:"uniqueIndex;not null"`
	User          User           `json:"user" gorm:"foreignKey:UserID"`
	StudentID     string         `json:"studentId" gorm:"unique;not null"`
	Degree        string         `json:"degree"`
	Major         string         `json:"major"`
	Stream        string         `json:"stream"`
	CurrentSemester string       `json:"currentSemester"`
	GPA           float64        `json:"gpa"`
	Skills        string         `json:"skills"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`
}

// InstructorInfo contains additional information for instructors
type InstructorInfo struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	UserID        uint           `json:"userId" gorm:"uniqueIndex;not null"`
	User          User           `json:"user" gorm:"foreignKey:UserID"`
	Position      string         `json:"position"`
	Department    string         `json:"department"`
	Specialization string        `json:"specialization"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`
}

// RefreshToken represents a refresh token for JWT authentication
type RefreshToken struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"userId" gorm:"not null"`
	Token     string    `json:"token" gorm:"unique;not null"`
	ExpiresAt time.Time `json:"expiresAt" gorm:"not null"`
	CreatedAt time.Time `json:"createdAt"`
}

// LoginRequest represents a login request
type LoginRequest struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

// RegisterRequest represents a user registration request
type RegisterRequest struct {
	Username    string `json:"username" validate:"required,min=4,max=20"`
	Password    string `json:"password" validate:"required,min=6"`
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" validate:"required,email"`
	Role        Role   `json:"role" validate:"required,oneof=admin instructor student"`
	Department  string `json:"department"`
	StudentID   string `json:"studentId"`
}

// UpdateUserRequest represents a user update request
type UpdateUserRequest struct {
	Name           string     `json:"name"`
	Email          string     `json:"email" validate:"omitempty,email"`
	Gender         string     `json:"gender"`
	Religion       string     `json:"religion"`
	DateOfBirth    *time.Time `json:"dateOfBirth"`
	PlaceOfBirth   string     `json:"placeOfBirth"`
	Department     string     `json:"department"`
	Degree         string     `json:"degree"`
	Major          string     `json:"major"`
	Stream         string     `json:"stream"`
	CurrentSemester string    `json:"currentSemester"`
	Skills         string     `json:"skills"`
}

// UpdatePasswordRequest represents a password update request
type UpdatePasswordRequest struct {
	CurrentPassword string `json:"currentPassword" validate:"required"`
	NewPassword     string `json:"newPassword" validate:"required,min=6"`
}

// LoginResponse represents a login response
type LoginResponse struct {
	User         UserResponse `json:"user"`
	AccessToken  string       `json:"accessToken"`
	RefreshToken string       `json:"refreshToken"`
}

// UserResponse represents a user response without sensitive information
type UserResponse struct {
	ID              uint      `json:"id"`
	Username        string    `json:"username"`
	Name            string    `json:"name"`
	Email           string    `json:"email"`
	Role            Role      `json:"role"`
	Gender          string    `json:"gender,omitempty"`
	Religion        string    `json:"religion,omitempty"`
	DateOfBirth     *time.Time `json:"dateOfBirth,omitempty"`
	PlaceOfBirth    string    `json:"placeOfBirth,omitempty"`
	Department      string    `json:"department,omitempty"`
	ProfilePhotoURL string    `json:"profilePhotoURL,omitempty"`
	StudentInfo     *StudentInfoResponse    `json:"studentInfo,omitempty"`
	InstructorInfo  *InstructorInfoResponse `json:"instructorInfo,omitempty"`
}

// StudentInfoResponse represents a student info response
type StudentInfoResponse struct {
	StudentID       string  `json:"studentId"`
	Degree          string  `json:"degree,omitempty"`
	Major           string  `json:"major,omitempty"`
	Stream          string  `json:"stream,omitempty"`
	CurrentSemester string  `json:"currentSemester,omitempty"`
	GPA             float64 `json:"gpa,omitempty"`
	Skills          string  `json:"skills,omitempty"`
}

// InstructorInfoResponse represents an instructor info response
type InstructorInfoResponse struct {
	Position       string `json:"position,omitempty"`
	Department     string `json:"department,omitempty"`
	Specialization string `json:"specialization,omitempty"`
}

// SetPassword hashes and sets the user's password
func (u *User) SetPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

// CheckPassword checks if the provided password is correct
func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

// ToUserResponse converts a User to UserResponse
func (u *User) ToUserResponse() UserResponse {
	return UserResponse{
		ID:              u.ID,
		Username:        u.Username,
		Name:            u.Name,
		Email:           u.Email,
		Role:            u.Role,
		Gender:          u.Gender,
		Religion:        u.Religion,
		DateOfBirth:     u.DateOfBirth,
		PlaceOfBirth:    u.PlaceOfBirth,
		Department:      u.Department,
		ProfilePhotoURL: u.ProfilePhotoURL,
	}
}