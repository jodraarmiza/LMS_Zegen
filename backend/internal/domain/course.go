package domain

import (
	"time"

	"gorm.io/gorm"
)

// Course represents a course in the system
type Course struct {
	ID             uint           `json:"id" gorm:"primaryKey"`
	Code           string         `json:"code" gorm:"not null"`
	Title          string         `json:"title" gorm:"not null"`
	Category       string         `json:"category"`
	Description    string         `json:"description"`
	Semester       string         `json:"semester" gorm:"not null"`
	Year           int            `json:"year" gorm:"not null"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `json:"-" gorm:"index"`
	Sessions       []Session      `json:"sessions,omitempty" gorm:"foreignKey:CourseID"`
	CourseInstructors []CourseInstructor `json:"courseInstructors,omitempty" gorm:"foreignKey:CourseID"`
	CourseStudents  []CourseStudent  `json:"courseStudents,omitempty" gorm:"foreignKey:CourseID"`
	Assessments    []Assessment   `json:"assessments,omitempty" gorm:"foreignKey:CourseID"`
	ForumThreads   []ForumThread  `json:"forumThreads,omitempty" gorm:"foreignKey:CourseID"`
}

// CourseInstructor represents the many-to-many relationship between courses and instructors
type CourseInstructor struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	CourseID     uint           `json:"courseId" gorm:"not null"`
	Course       Course         `json:"-" gorm:"foreignKey:CourseID"`
	UserID       uint           `json:"userId" gorm:"not null"`
	User         User           `json:"user" gorm:"foreignKey:UserID"`
	IsMain       bool           `json:"isMain" gorm:"default:false"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `json:"-" gorm:"index"`
}

// CourseStudent represents the many-to-many relationship between courses and students
type CourseStudent struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	CourseID     uint           `json:"courseId" gorm:"not null"`
	Course       Course         `json:"-" gorm:"foreignKey:CourseID"`
	UserID       uint           `json:"userId" gorm:"not null"`
	User         User           `json:"user" gorm:"foreignKey:UserID"`
	EnrolledAt   time.Time      `json:"enrolledAt" gorm:"not null"`
	Status       string         `json:"status" gorm:"type:varchar(20);default:'active'"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `json:"-" gorm:"index"`
}

// Session represents a course session
type Session struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	CourseID      uint           `json:"courseId" gorm:"not null"`
	Course        Course         `json:"-" gorm:"foreignKey:CourseID"`
	Number        int            `json:"number" gorm:"not null"`
	Title         string         `json:"title" gorm:"not null"`
	Description   string         `json:"description"`
	Date          time.Time      `json:"date"`
	StartTime     string         `json:"startTime" gorm:"type:varchar(10)"`
	EndTime       string         `json:"endTime" gorm:"type:varchar(10)"`
	Duration      string         `json:"duration" gorm:"type:varchar(10)"`
	DeliveryMode  string         `json:"deliveryMode" gorm:"type:varchar(20)"`
	Location      string         `json:"location"`
	ZoomLink      string         `json:"zoomLink"`
	Materials     []Material     `json:"materials,omitempty" gorm:"foreignKey:SessionID"`
	Attendances   []Attendance   `json:"attendances,omitempty" gorm:"foreignKey:SessionID"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `json:"-" gorm:"index"`
}

// SessionContent represents content within a session
type SessionContent struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	SessionID   uint           `json:"sessionId" gorm:"not null"`
	Session     Session        `json:"-" gorm:"foreignKey:SessionID"`
	Title       string         `json:"title" gorm:"not null"`
	Description string         `json:"description"`
	Duration    string         `json:"duration" gorm:"type:varchar(10)"`
	Order       int            `json:"order" gorm:"not null"`
	Status      string         `json:"status" gorm:"type:varchar(20);default:'not_started'"`
	Progress    int            `json:"progress" gorm:"default:0"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}

// Material represents educational material for a session
type Material struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	SessionID   uint           `json:"sessionId" gorm:"not null"`
	Session     Session        `json:"-" gorm:"foreignKey:SessionID"`
	Title       string         `json:"title" gorm:"not null"`
	Description string         `json:"description"`
	Type        string         `json:"type" gorm:"type:varchar(20);not null"` // document, video, link, etc.
	URL         string         `json:"url"`
	FilePath    string         `json:"filePath"`
	FileSize    int64          `json:"fileSize"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}

// Attendance represents a student's attendance for a session
type Attendance struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	SessionID uint      `json:"sessionId" gorm:"not null"`
	Session   Session   `json:"-" gorm:"foreignKey:SessionID"`
	UserID    uint      `json:"userId" gorm:"not null"`
	User      User      `json:"user" gorm:"foreignKey:UserID"`
	Status    string    `json:"status" gorm:"type:varchar(20);not null"` // present, absent, late, excused
	CheckInTime *time.Time `json:"checkInTime"`
	Comment   string    `json:"comment"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// Syllabus represents a course syllabus
type Syllabus struct {
	ID             uint           `json:"id" gorm:"primaryKey"`
	CourseID       uint           `json:"courseId" gorm:"uniqueIndex;not null"`
	Course         Course         `json:"-" gorm:"foreignKey:CourseID"`
	Description    string         `json:"description"`
	LearningOutcomes []LearningOutcome `json:"learningOutcomes,omitempty" gorm:"foreignKey:SyllabusID"`
	TeachingStrategies []TeachingStrategy `json:"teachingStrategies,omitempty" gorm:"foreignKey:SyllabusID"`
	Textbooks      []Textbook     `json:"textbooks,omitempty" gorm:"foreignKey:SyllabusID"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `json:"-" gorm:"index"`
}

// LearningOutcome represents a learning outcome in a syllabus
type LearningOutcome struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	SyllabusID   uint           `json:"syllabusId" gorm:"not null"`
	Syllabus     Syllabus       `json:"-" gorm:"foreignKey:SyllabusID"`
	Code         string         `json:"code" gorm:"not null"`
	Knowledge    string         `json:"knowledge" gorm:"not null"`
	Application  string         `json:"application"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `json:"-" gorm:"index"`
}

// TeachingStrategy represents a teaching strategy in a syllabus
type TeachingStrategy struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	SyllabusID   uint           `json:"syllabusId" gorm:"not null"`
	Syllabus     Syllabus       `json:"-" gorm:"foreignKey:SyllabusID"`
	Name         string         `json:"name" gorm:"not null"`
	Description  string         `json:"description"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `json:"-" gorm:"index"`
}

// Textbook represents a textbook in a syllabus
type Textbook struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	SyllabusID   uint           `json:"syllabusId" gorm:"not null"`
	Syllabus     Syllabus       `json:"-" gorm:"foreignKey:SyllabusID"`
	Title        string         `json:"title" gorm:"not null"`
	Authors      string         `json:"authors"`
	Year         int            `json:"year"`
	Publisher    string         `json:"publisher"`
	Link         string         `json:"link"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `json:"-" gorm:"index"`
}