package repository

import (
	"backend/internal/domain"
	"errors"

	"gorm.io/gorm"
)

// UserRepository handles database operations for users
type UserRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new user repository
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db}
}

// GetByID retrieves a user by ID
func (r *UserRepository) GetByID(id uint) (*domain.User, error) {
	var user domain.User
	if err := r.db.First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) GetByUsername(username string) (*domain.User, error) {
	var user domain.User
	if err := r.db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}


// GetByEmail retrieves a user by email
func (r *UserRepository) GetByEmail(email string) (*domain.User, error) {
	var user domain.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return &user, nil
}

// Create creates a new user
func (r *UserRepository) Create(user *domain.User) error {
	return r.db.Create(user).Error
}

// Update updates a user
func (r *UserRepository) Update(user *domain.User) error {
	return r.db.Save(user).Error
}

// GetUsers retrieves all users with pagination
func (r *UserRepository) GetUsers(limit, offset int) ([]domain.User, error) {
	var users []domain.User
	if err := r.db.Limit(limit).Offset(offset).Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// CountUsers counts the total number of users
func (r *UserRepository) CountUsers() (int64, error) {
	var count int64
	if err := r.db.Model(&domain.User{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}

// GetStudents retrieves all students with pagination
func (r *UserRepository) GetStudents(limit, offset int) ([]domain.User, error) {
	// In a real app, you'd filter by role or student status
	// For now, just return all users as "students"
	return r.GetUsers(limit, offset)
}

// GetInstructors retrieves all instructors with pagination
func (r *UserRepository) GetInstructors(limit, offset int) ([]domain.User, error) {
	// In a real app, you'd filter by role or instructor status
	// For now, just return all users as "instructors" 
	return r.GetUsers(limit, offset)
}

// Add this to internal/repository/user_repository.go

// Delete deletes a user by ID
func (r *UserRepository) Delete(id uint) error {
    return r.db.Delete(&domain.User{}, id).Error
}

// CountStudents counts the total number of students
func (r *UserRepository) CountStudents() (int64, error) {
	// In a real app, you'd filter by role or student status
	return r.CountUsers()
}

// CountInstructors counts the total number of instructors  
func (r *UserRepository) CountInstructors() (int64, error) {
	// In a real app, you'd filter by role or instructor status
	return r.CountUsers()
}