package repository

import (
	"errors"

	"backend/internal/domain"
	"gorm.io/gorm"
)

// UserRepository handles database operations for users
type UserRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new user repository
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

// GetByID gets a user by ID
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

// GetByUsername gets a user by username
func (r *UserRepository) GetByUsername(username string) (*domain.User, error) {
	var user domain.User
	if err := r.db.Where("username = ?", username).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return &user, nil
}

// GetByEmail gets a user by email
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

// Delete deletes a user
func (r *UserRepository) Delete(id uint) error {
	return r.db.Delete(&domain.User{}, id).Error
}

// List gets all users
func (r *UserRepository) List(limit, offset int) ([]domain.User, error) {
	var users []domain.User
	if err := r.db.Limit(limit).Offset(offset).Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// GetStudentInfo gets student info by user ID
func (r *UserRepository) GetStudentInfo(userID uint) (*domain.StudentInfo, error) {
	var studentInfo domain.StudentInfo
	if err := r.db.Where("user_id = ?", userID).First(&studentInfo).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("student info not found")
		}
		return nil, err
	}
	return &studentInfo, nil
}

// CreateStudentInfo creates student info
func (r *UserRepository) CreateStudentInfo(studentInfo *domain.StudentInfo) error {
	return r.db.Create(studentInfo).Error
}

// UpdateStudentInfo updates student info
func (r *UserRepository) UpdateStudentInfo(studentInfo *domain.StudentInfo) error {
	return r.db.Save(studentInfo).Error
}

// GetInstructorInfo gets instructor info by user ID
func (r *UserRepository) GetInstructorInfo(userID uint) (*domain.InstructorInfo, error) {
	var instructorInfo domain.InstructorInfo
	if err := r.db.Where("user_id = ?", userID).First(&instructorInfo).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("instructor info not found")
		}
		return nil, err
	}
	return &instructorInfo, nil
}

// CreateInstructorInfo creates instructor info
func (r *UserRepository) CreateInstructorInfo(instructorInfo *domain.InstructorInfo) error {
	return r.db.Create(instructorInfo).Error
}

// UpdateInstructorInfo updates instructor info
func (r *UserRepository) UpdateInstructorInfo(instructorInfo *domain.InstructorInfo) error {
	return r.db.Save(instructorInfo).Error
}

// GetStudents gets all students
func (r *UserRepository) GetStudents(limit, offset int) ([]domain.User, error) {
	var users []domain.User
	if err := r.db.Where("role = ?", domain.RoleStudent).Limit(limit).Offset(offset).Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// GetInstructors gets all instructors
func (r *UserRepository) GetInstructors(limit, offset int) ([]domain.User, error) {
	var users []domain.User
	if err := r.db.Where("role = ?", domain.RoleInstructor).Limit(limit).Offset(offset).Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// GetUserWithDetails gets a user with student or instructor details
func (r *UserRepository) GetUserWithDetails(id uint) (*domain.User, *domain.StudentInfo, *domain.InstructorInfo, error) {
	// Get user
	user, err := r.GetByID(id)
	if err != nil {
		return nil, nil, nil, err
	}

	// Get appropriate details based on role
	if user.Role == domain.RoleStudent {
		studentInfo, err := r.GetStudentInfo(id)
		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return user, nil, nil, err
		}
		return user, studentInfo, nil, nil
	} else if user.Role == domain.RoleInstructor {
		instructorInfo, err := r.GetInstructorInfo(id)
		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return user, nil, nil, err
		}
		return user, nil, instructorInfo, nil
	}

	return user, nil, nil, nil
}

// CountUsers counts all users
func (r *UserRepository) CountUsers() (int64, error) {
	var count int64
	if err := r.db.Model(&domain.User{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}

// CountStudents counts all students
func (r *UserRepository) CountStudents() (int64, error) {
	var count int64
	if err := r.db.Model(&domain.User{}).Where("role = ?", domain.RoleStudent).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}

// CountInstructors counts all instructors
func (r *UserRepository) CountInstructors() (int64, error) {
	var count int64
	if err := r.db.Model(&domain.User{}).Where("role = ?", domain.RoleInstructor).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}