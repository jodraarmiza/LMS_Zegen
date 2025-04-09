package domain

import (
	"time"

	"gorm.io/gorm"
)

// Assessment represents a course assessment
type Assessment struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	CourseID        uint           `json:"courseId" gorm:"not null"`
	Course          Course         `json:"-" gorm:"foreignKey:CourseID"`
	Type            string         `json:"type" gorm:"type:varchar(20);not null"` // assignment, mid exam, final exam, quiz
	Title           string         `json:"title" gorm:"not null"`
	Description     string         `json:"description"`
	Weight          float64        `json:"weight" gorm:"not null"`
	DueDate         time.Time      `json:"dueDate"`
	AvailableFrom   time.Time      `json:"availableFrom"`
	AvailableTo     time.Time      `json:"availableTo"`
	Status          string         `json:"status" gorm:"type:varchar(20);default:'not_started'"` // not_started, in_progress, completed
	MaxAttempts     int            `json:"maxAttempts" gorm:"default:1"`
	PassingScore    float64        `json:"passingScore"`
	QuestionsCount  int            `json:"questionsCount"`
	RandomizeQuestions bool        `json:"randomizeQuestions" gorm:"default:false"`
	AllowedFileTypes string        `json:"allowedFileTypes"`
	MaxFileSize     int64          `json:"maxFileSize"`
	Submissions     []Submission   `json:"submissions,omitempty" gorm:"foreignKey:AssessmentID"`
	RubricItems     []RubricItem   `json:"rubricItems,omitempty" gorm:"foreignKey:AssessmentID"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// Submission represents a student's submission for an assessment
type Submission struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	AssessmentID    uint           `json:"assessmentId" gorm:"not null"`
	Assessment      Assessment     `json:"-" gorm:"foreignKey:AssessmentID"`
	UserID          uint           `json:"userId" gorm:"not null"`
	User            User           `json:"user" gorm:"foreignKey:UserID"`
	FilePath        string         `json:"filePath"`
	FileName        string         `json:"fileName"`
	FileSize        int64          `json:"fileSize"`
	SubmissionDate  time.Time      `json:"submissionDate"`
	Status          string         `json:"status" gorm:"type:varchar(20);default:'submitted'"` // submitted, graded, late, failed
	Score           float64        `json:"score"`
	Feedback        string         `json:"feedback"`
	GradedBy        uint           `json:"gradedBy"`
	GradedAt        *time.Time     `json:"gradedAt"`
	AttemptNumber   int            `json:"attemptNumber" gorm:"default:1"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// RubricItem represents a rubric item for an assessment
type RubricItem struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	AssessmentID    uint           `json:"assessmentId" gorm:"not null"`
	Assessment      Assessment     `json:"-" gorm:"foreignKey:AssessmentID"`
	LearningOutcomeID uint         `json:"learningOutcomeId" gorm:"not null"`
	LearningOutcome LearningOutcome `json:"learningOutcome" gorm:"foreignKey:LearningOutcomeID"`
	KeyIndicator    string         `json:"keyIndicator" gorm:"not null"`
	ExcellentCriteria string       `json:"excellentCriteria"`
	GoodCriteria    string         `json:"goodCriteria"`
	AverageCriteria string         `json:"averageCriteria"`
	PoorCriteria    string         `json:"poorCriteria"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// Exam represents an exam in the system
type Exam struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	CourseID        uint           `json:"courseId" gorm:"not null"`
	Course          Course         `json:"-" gorm:"foreignKey:CourseID"`
	Title           string         `json:"title" gorm:"not null"`
	Type            string         `json:"type" gorm:"type:varchar(20);not null"` // quiz, midterm, final, practice
	Description     string         `json:"description"`
	Duration        string         `json:"duration" gorm:"type:varchar(10);not null"`
	QuestionsCount  int            `json:"questionsCount"`
	AvailableFrom   time.Time      `json:"availableFrom"`
	AvailableTo     time.Time      `json:"availableTo"`
	PassingScore    float64        `json:"passingScore"`
	MaxAttempts     int            `json:"maxAttempts" gorm:"default:1"`
	RandomizeQuestions bool        `json:"randomizeQuestions" gorm:"default:false"`
	Status          string         `json:"status" gorm:"type:varchar(20);default:'not_started'"` // not_started, in_progress, completed, expired, upcoming
	Weight          float64        `json:"weight" gorm:"not null"`
	Prerequisites   string         `json:"prerequisites"`
	Questions       []ExamQuestion `json:"questions,omitempty" gorm:"foreignKey:ExamID"`
	ExamAttempts    []ExamAttempt  `json:"examAttempts,omitempty" gorm:"foreignKey:ExamID"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// ExamQuestion represents a question in an exam
type ExamQuestion struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	ExamID          uint           `json:"examId" gorm:"not null"`
	Exam            Exam           `json:"-" gorm:"foreignKey:ExamID"`
	Type            string         `json:"type" gorm:"type:varchar(20);not null"` // multiple_choice, true_false, essay
	Question        string         `json:"question" gorm:"not null"`
	Options         string         `json:"options"`
	CorrectAnswer   string         `json:"correctAnswer"`
	Points          float64        `json:"points" gorm:"not null"`
	Order           int            `json:"order"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// ExamAttempt represents a student's attempt at an exam
type ExamAttempt struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	ExamID          uint           `json:"examId" gorm:"not null"`
	Exam            Exam           `json:"-" gorm:"foreignKey:ExamID"`
	UserID          uint           `json:"userId" gorm:"not null"`
	User            User           `json:"user" gorm:"foreignKey:UserID"`
	StartTime       time.Time      `json:"startTime"`
	EndTime         *time.Time     `json:"endTime"`
	Score           float64        `json:"score"`
	Status          string         `json:"status" gorm:"type:varchar(20);default:'in_progress'"` // in_progress, completed, timed_out
	AttemptNumber   int            `json:"attemptNumber" gorm:"default:1"`
	Answers         []ExamAnswer   `json:"answers,omitempty" gorm:"foreignKey:ExamAttemptID"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// ExamAnswer represents a student's answer to an exam question
type ExamAnswer struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	ExamAttemptID   uint           `json:"examAttemptId" gorm:"not null"`
	ExamAttempt     ExamAttempt    `json:"-" gorm:"foreignKey:ExamAttemptID"`
	QuestionID      uint           `json:"questionId" gorm:"not null"`
	Question        ExamQuestion   `json:"question" gorm:"foreignKey:QuestionID"`
	Answer          string         `json:"answer"`
	IsCorrect       bool           `json:"isCorrect"`
	Points          float64        `json:"points"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// Grade represents a student's grade for a course
type Grade struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	CourseID        uint           `json:"courseId" gorm:"not null"`
	Course          Course         `json:"-" gorm:"foreignKey:CourseID"`
	UserID          uint           `json:"userId" gorm:"not null"`
	User            User           `json:"user" gorm:"foreignKey:UserID"`
	AssessmentID    uint           `json:"assessmentId"`
	Assessment      Assessment     `json:"assessment" gorm:"foreignKey:AssessmentID"`
	Title           string         `json:"title" gorm:"not null"`
	Weight          float64        `json:"weight" gorm:"not null"`
	Score           float64        `json:"score"`
	LetterGrade     string         `json:"letterGrade" gorm:"type:varchar(5)"`
	LastUpdated     time.Time      `json:"lastUpdated"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// CourseGrade represents a student's overall grade for a course
type CourseGrade struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	CourseID        uint           `json:"courseId" gorm:"not null"`
	Course          Course         `json:"-" gorm:"foreignKey:CourseID"`
	UserID          uint           `json:"userId" gorm:"not null"`
	User            User           `json:"user" gorm:"foreignKey:UserID"`
	OverallScore    float64        `json:"overallScore"`
	LetterGrade     string         `json:"letterGrade" gorm:"type:varchar(5)"`
	LastUpdated     time.Time      `json:"lastUpdated"`
	CreatedAt       time.Time      `json:"createdAt"`
	UpdatedAt       time.Time      `json:"updatedAt"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

// CreateAssessmentRequest represents a request to create an assessment
type CreateAssessmentRequest struct {
	CourseID        uint      `json:"courseId" validate:"required"`
	Type            string    `json:"type" validate:"required,oneof=assignment mid_exam final_exam quiz"`
	Title           string    `json:"title" validate:"required"`
	Description     string    `json:"description"`
	Weight          float64   `json:"weight" validate:"required,min=0,max=100"`
	DueDate         time.Time `json:"dueDate" validate:"required"`
	AvailableFrom   time.Time `json:"availableFrom" validate:"required"`
	AvailableTo     time.Time `json:"availableTo" validate:"required"`
	MaxAttempts     int       `json:"maxAttempts" validate:"min=1"`
	PassingScore    float64   `json:"passingScore" validate:"min=0,max=100"`
	QuestionsCount  int       `json:"questionsCount" validate:"min=0"`
	RandomizeQuestions bool   `json:"randomizeQuestions"`
	AllowedFileTypes string   `json:"allowedFileTypes"`
	MaxFileSize     int64     `json:"maxFileSize" validate:"min=0"`
}

// SubmitAssessmentRequest represents a request to submit an assessment
type SubmitAssessmentRequest struct {
	AssessmentID    uint      `json:"assessmentId" validate:"required"`
	UserID          uint      `json:"userId" validate:"required"`
	AttemptNumber   int       `json:"attemptNumber" validate:"min=1"`
}

// GradeSubmissionRequest represents a request to grade a submission
type GradeSubmissionRequest struct {
	SubmissionID    uint      `json:"submissionId" validate:"required"`
	Score           float64   `json:"score" validate:"required,min=0,max=100"`
	Feedback        string    `json:"feedback"`
}