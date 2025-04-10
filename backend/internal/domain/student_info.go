package domain

import (
	"time"

	"gorm.io/gorm"
)

type StudentInfo struct {
	ID              uint           `gorm:"primaryKey"`
	UserID          uint           `gorm:"unique;not null"`    // Relasi ke users.id
	StudentID       string         `gorm:"size:50;unique;not null"`
	Degree          string         `gorm:"size:50"`
	Major           string         `gorm:"size:100"`
	Stream          string         `gorm:"size:100"`
	CurrentSemester string         `gorm:"size:20"`
	GPA             float32        `gorm:"type:decimal(3,2)"`
	Skills          string         `gorm:"type:text"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
	DeletedAt       gorm.DeletedAt `gorm:"index"`
}
