// internal/repository/course_repository.go
package repository

import (
	"backend/internal/domain"
	"errors"

	"gorm.io/gorm"
)

// CourseRepository handles database operations for courses
type CourseRepository struct {
	db *gorm.DB
}

// NewCourseRepository creates a new course repository
func NewCourseRepository(db *gorm.DB) *CourseRepository {
	return &CourseRepository{db}
}

// GetByID retrieves a course by ID
func (r *CourseRepository) GetByID(id uint) (*domain.Course, error) {
	var course domain.Course
	if err := r.db.First(&course, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("course not found")
		}
		return nil, err
	}
	return &course, nil
}

// Create creates a new course
func (r *CourseRepository) Create(course *domain.Course) error {
	return r.db.Create(course).Error
}

// Update updates a course
func (r *CourseRepository) Update(course *domain.Course) error {
	return r.db.Save(course).Error
}

// Delete deletes a course by ID
func (r *CourseRepository) Delete(id uint) error {
	return r.db.Delete(&domain.Course{}, id).Error
}

// GetCourses retrieves all courses with pagination
func (r *CourseRepository) GetCourses(limit, offset int) ([]domain.Course, error) {
	var courses []domain.Course
	if err := r.db.Limit(limit).Offset(offset).Find(&courses).Error; err != nil {
		return nil, err
	}
	return courses, nil
}

// CountCourses counts the total number of courses
func (r *CourseRepository) CountCourses() (int64, error) {
	var count int64
	if err := r.db.Model(&domain.Course{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}