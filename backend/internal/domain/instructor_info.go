package domain

import (
	"time"

	"gorm.io/gorm"
)

type InstructorInfo struct {
	ID             uint           `gorm:"primaryKey"`
	UserID         uint           `gorm:"unique;not null"`   // Relasi ke users.id
	Position       string         `gorm:"size:100"`
	Department     string         `gorm:"size:100"`
	Specialization string         `gorm:"size:100"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      gorm.DeletedAt `gorm:"index"`
}
