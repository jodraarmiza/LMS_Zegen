package domain

import (
	"time"

	"gorm.io/gorm"
)

// ScheduleEvent represents a schedule event (class session, exam, etc.)
type ScheduleEvent struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	CourseID        uint           `json:"courseId" gorm:"not null"`
	Course          Course         `json:"-" gorm:"foreignKey:CourseID"`
	SessionID       *uint          `json:"sessionId"`
	ExamID          *uint          `json:"examId"`
	Title           string         `json:"title" gorm:"not null"`
	Type            string         `json:"type" gorm:"type:varchar(20);not null"` // lecture, lab, exam
	Date            time.Time      `json:"date" gorm:"not null"`
	StartTime       string         `json:"startTime" gorm:"type:varchar(10);not null"`
	EndTime         string         `json:"endTime" gorm:"type:varchar(10);not null"`
	Location        string         `json:"location"`
	InstructorID    uint           `json:"instructorId" gorm:"not null"`
	Instructor      User           `json:"instructor" gorm:"foreignKey:InstructorID"`
	IsOnsite        bool           `json:"isOnsite" gorm:"default:true"`
	Description     string         `json:"description"`
	RecurrenceRule  string         `json:"recurrenceRule"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// Activity represents a student's personal activity
type Activity struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	UserID          uint           `json:"userId" gorm:"not null"`
	User            User           `json:"-" gorm:"foreignKey:UserID"`
	Title           string         `json:"title" gorm:"not null"`
	Category        string         `json:"category"`
	Date            time.Time      `json:"date" gorm:"not null"`
	Time            string         `json:"time" gorm:"type:varchar(10);not null"`
	Duration        string         `json:"duration"`
	Description     string         `json:"description"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// CreateScheduleEventRequest represents a request to create a schedule event
type CreateScheduleEventRequest struct {
	CourseID        uint      `json:"courseId" validate:"required"`
	SessionID       *uint     `json:"sessionId"`
	ExamID          *uint     `json:"examId"`
	Title           string    `json:"title" validate:"required"`
	Type            string    `json:"type" validate:"required,oneof=lecture lab exam"`
	Date            time.Time `json:"date" validate:"required"`
	StartTime       string    `json:"startTime" validate:"required"`
	EndTime         string    `json:"endTime" validate:"required"`
	Location        string    `json:"location"`
	InstructorID    uint      `json:"instructorId" validate:"required"`
	IsOnsite        bool      `json:"isOnsite"`
	Description     string    `json:"description"`
	RecurrenceRule  string    `json:"recurrenceRule"`
}

// CreateActivityRequest represents a request to create a personal activity
type CreateActivityRequest struct {
	Title           string    `json:"title" validate:"required"`
	Category        string    `json:"category"`
	Date            time.Time `json:"date" validate:"required"`
	Time            string    `json:"time" validate:"required"`
	Duration        string    `json:"duration"`
	Description     string    `json:"description"`
}

// ScheduleEventResponse represents a schedule event response
type ScheduleEventResponse struct {
	ID              uint       `json:"id"`
	CourseID        uint       `json:"courseId"`
	CourseTitle     string     `json:"courseTitle"`
	CourseCode      string     `json:"courseCode"`
	SessionID       *uint      `json:"sessionId,omitempty"`
	ExamID          *uint      `json:"examId,omitempty"`
	Title           string     `json:"title"`
	Type            string     `json:"type"`
	Date            time.Time  `json:"date"`
	StartTime       string     `json:"startTime"`
	EndTime         string     `json:"endTime"`
	Location        string     `json:"location"`
	Instructor      UserResponse `json:"instructor"`
	IsOnsite        bool       `json:"isOnsite"`
	Description     string     `json:"description,omitempty"`
	Status          string     `json:"status"` // active, upcoming, past
}

// ActivityResponse represents a personal activity response
type ActivityResponse struct {
	ID              uint      `json:"id"`
	Title           string    `json:"title"`
	Category        string    `json:"category"`
	Date            time.Time `json:"date"`
	Time            string    `json:"time"`
	Duration        string    `json:"duration,omitempty"`
	Description     string    `json:"description,omitempty"`
}

// ToScheduleEventResponse converts a ScheduleEvent to ScheduleEventResponse
func (se *ScheduleEvent) ToScheduleEventResponse() ScheduleEventResponse {
	// Determine status based on current time
	now := time.Now()
	eventDate := se.Date
	
	// Combine event date with start/end times
	startDateTime, _ := time.Parse("2006-01-02 15:04", eventDate.Format("2006-01-02")+" "+se.StartTime)
	endDateTime, _ := time.Parse("2006-01-02 15:04", eventDate.Format("2006-01-02")+" "+se.EndTime)
	
	var status string
	if now.Before(startDateTime) {
		status = "upcoming"
	} else if now.After(endDateTime) {
		status = "past"
	} else {
		status = "active"
	}

	return ScheduleEventResponse{
		ID:              se.ID,
		CourseID:        se.CourseID,
		CourseTitle:     se.Course.Title,
		CourseCode:      se.Course.Code,
		SessionID:       se.SessionID,
		ExamID:          se.ExamID,
		Title:           se.Title,
		Type:            se.Type,
		Date:            se.Date,
		StartTime:       se.StartTime,
		EndTime:         se.EndTime,
		Location:        se.Location,
		Instructor:      se.Instructor.ToUserResponse(),
		IsOnsite:        se.IsOnsite,
		Description:     se.Description,
		Status:          status,
	}
}

// ToActivityResponse converts an Activity to ActivityResponse
func (a *Activity) ToActivityResponse() ActivityResponse {
	return ActivityResponse{
		ID:              a.ID,
		Title:           a.Title,
		Category:        a.Category,
		Date:            a.Date,
		Time:            a.Time,
		Duration:        a.Duration,
		Description:     a.Description,
	}
}