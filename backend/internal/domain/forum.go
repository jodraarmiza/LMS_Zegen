package domain

import (
	"time"

	"gorm.io/gorm"
)

// ForumThread represents a forum thread
type ForumThread struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	CourseID        uint           `json:"courseId" gorm:"not null"`
	Course          Course         `json:"-" gorm:"foreignKey:CourseID"`
	SessionNumber   int            `json:"sessionNumber"`
	Title           string         `json:"title" gorm:"not null"`
	UserID          uint           `json:"userId" gorm:"not null"`
	User            User           `json:"user" gorm:"foreignKey:UserID"`
	Status          string         `json:"status" gorm:"type:varchar(20);default:'open'"` // open, closed, passed, not_passed
	Views           int            `json:"views" gorm:"default:0"`
	Type            string         `json:"type" gorm:"type:varchar(20);default:'class'"` // class, group
	Messages        []ForumMessage `json:"messages,omitempty" gorm:"foreignKey:ThreadID"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// ForumMessage represents a message in a forum thread
type ForumMessage struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	ThreadID        uint           `json:"threadId" gorm:"not null"`
	Thread          ForumThread    `json:"-" gorm:"foreignKey:ThreadID"`
	UserID          uint           `json:"userId" gorm:"not null"`
	User            User           `json:"user" gorm:"foreignKey:UserID"`
	Content         string         `json:"content" gorm:"not null"`
	IsPresent       bool           `json:"isPresent" gorm:"default:false"`
	IsPassed        bool           `json:"isPassed" gorm:"default:false"`
	ParentID        *uint          `json:"parentId"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// CreateThreadRequest represents a request to create a forum thread
type CreateThreadRequest struct {
	CourseID        uint   `json:"courseId" validate:"required"`
	SessionNumber   int    `json:"sessionNumber"`
	Title           string `json:"title" validate:"required"`
	Type            string `json:"type" validate:"oneof=class group"`
	Content         string `json:"content" validate:"required"`
}

// CreateMessageRequest represents a request to create a forum message
type CreateMessageRequest struct {
	ThreadID        uint   `json:"threadId" validate:"required"`
	Content         string `json:"content" validate:"required"`
	ParentID        *uint  `json:"parentId"`
	IsPresent       bool   `json:"isPresent"`
}

// ForumThreadResponse represents a forum thread response
type ForumThreadResponse struct {
	ID              uint      `json:"id"`
	CourseID        uint      `json:"courseId"`
	SessionNumber   int       `json:"sessionNumber"`
	Title           string    `json:"title"`
	Status          string    `json:"status"`
	Views           int       `json:"views"`
	Type            string    `json:"type"`
	Author          UserResponse `json:"author"`
	MessagesCount   int       `json:"messagesCount"`
	LastMessageDate time.Time `json:"lastMessageDate"`
	CreatedAt       time.Time `json:"createdAt"`
}

// ForumMessageResponse represents a forum message response
type ForumMessageResponse struct {
	ID              uint      `json:"id"`
	ThreadID        uint      `json:"threadId"`
	Content         string    `json:"content"`
	IsPresent       bool      `json:"isPresent"`
	IsPassed        bool      `json:"isPassed"`
	ParentID        *uint     `json:"parentId"`
	Author          UserResponse `json:"author"`
	CreatedAt       time.Time `json:"createdAt"`
}

// ToForumThreadResponse converts a ForumThread to ForumThreadResponse
func (ft *ForumThread) ToForumThreadResponse() ForumThreadResponse {
	var lastMessageDate time.Time
	if len(ft.Messages) > 0 {
		lastMessageDate = ft.Messages[len(ft.Messages)-1].CreatedAt
	} else {
		lastMessageDate = ft.CreatedAt
	}

	return ForumThreadResponse{
		ID:              ft.ID,
		CourseID:        ft.CourseID,
		SessionNumber:   ft.SessionNumber,
		Title:           ft.Title,
		Status:          ft.Status,
		Views:           ft.Views,
		Type:            ft.Type,
		Author:          ft.User.ToUserResponse(),
		MessagesCount:   len(ft.Messages),
		LastMessageDate: lastMessageDate,
		CreatedAt:       ft.CreatedAt,
	}
}

// ToForumMessageResponse converts a ForumMessage to ForumMessageResponse
func (fm *ForumMessage) ToForumMessageResponse() ForumMessageResponse {
	return ForumMessageResponse{
		ID:              fm.ID,
		ThreadID:        fm.ThreadID,
		Content:         fm.Content,
		IsPresent:       fm.IsPresent,
		IsPassed:        fm.IsPassed,
		ParentID:        fm.ParentID,
		Author:          fm.User.ToUserResponse(),
		CreatedAt:       fm.CreatedAt,
	}
}