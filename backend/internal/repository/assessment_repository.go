package repository

import (
	"backend/internal/domain"
	"gorm.io/gorm"
)

// AssessmentRepository handles database operations for assessments
type AssessmentRepository struct {
	db *gorm.DB
}

// NewAssessmentRepository creates a new assessment repository
func NewAssessmentRepository(db *gorm.DB) *AssessmentRepository {
	return &AssessmentRepository{db}
}

// GetByID retrieves an assessment by ID
func (r *AssessmentRepository) GetByID(id uint) (*domain.Assessment, error) {
	var assessment domain.Assessment
	if err := r.db.First(&assessment, id).Error; err != nil {
		return nil, err
	}
	return &assessment, nil
}

// Create creates a new assessment
func (r *AssessmentRepository) Create(assessment *domain.Assessment) error {
	return r.db.Create(assessment).Error
}

// Update updates an assessment
func (r *AssessmentRepository) Update(assessment *domain.Assessment) error {
	return r.db.Save(assessment).Error
}

// Delete deletes an assessment
func (r *AssessmentRepository) Delete(id uint) error {
	return r.db.Delete(&domain.Assessment{}, id).Error
}

// GetAssessments retrieves assessments with pagination
func (r *AssessmentRepository) GetAssessments(limit, offset int) ([]domain.Assessment, error) {
	var assessments []domain.Assessment
	if err := r.db.Limit(limit).Offset(offset).Find(&assessments).Error; err != nil {
		return nil, err
	}
	return assessments, nil
}

// CountAssessments counts total number of assessments
func (r *AssessmentRepository) CountAssessments() (int64, error) {
	var count int64
	if err := r.db.Model(&domain.Assessment{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}