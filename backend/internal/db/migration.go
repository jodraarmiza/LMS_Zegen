package db

import (
	"backend/internal/domain"
	"fmt"

	"gorm.io/gorm"
)

// Migrate runs database migrations and seeds initial users
func Migrate(db *gorm.DB) error {
	fmt.Println("Running migrations...")

	// ✅ AutoMigrate semua tabel
	if err := db.AutoMigrate(
		&domain.User{},
		&domain.StudentInfo{},
		&domain.InstructorInfo{},
		&domain.RefreshToken{},
	); err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}

	fmt.Println("Migration done, checking for initial users...")

	// ✅ Cek apakah user sudah ada
	var count int64
	if err := db.Model(&domain.User{}).Count(&count).Error; err != nil {
		return fmt.Errorf("failed to count users: %w", err)
	}

	if count == 0 {
		fmt.Println("No users found, creating initial admin, instructor, and student...")

		// 🚀 Create Admin User
		admin := &domain.User{
			Username: "admin",
			Name:     "System Admin",
			Email:    "admin@lms.com",
			Role:     "admin",
		}
		admin.SetPassword("admin123")

		// 🚀 Create Instructor User
		instructor := &domain.User{
			Username: "instructor",
			Name:     "Dr. John Doe",
			Email:    "instructor@lms.com",
			Role:     "instructor",
			Department: "Computer Science",
		}
		instructor.SetPassword("instructor123")

		// 🚀 Create Student User
		student := &domain.User{
			Username: "student",
			Name:     "Micheline Unviana",
			Email:    "student@lms.com",
			Role:     "student",
		}
		student.SetPassword("student123")

		// Simpan semua user
		if err := db.Create(admin).Error; err != nil {
			return fmt.Errorf("failed to create admin user: %w", err)
		}
		if err := db.Create(instructor).Error; err != nil {
			return fmt.Errorf("failed to create instructor user: %w", err)
		}
		if err := db.Create(student).Error; err != nil {
			return fmt.Errorf("failed to create student user: %w", err)
		}

		// 🚀 Insert instructor_info
		instructorInfo := &domain.InstructorInfo{
			UserID:         instructor.ID,
			Position:       "Associate Professor",
			Department:     "Computer Science",
			Specialization: "Machine Learning",
		}
		if err := db.Create(instructorInfo).Error; err != nil {
			return fmt.Errorf("failed to create instructor info: %w", err)
		}

		// 🚀 Insert student_info
		studentInfo := &domain.StudentInfo{
			UserID:          student.ID,
			StudentID:       "CS22-0001",
			Degree:          "Bachelor",
			Major:           "Computer Science",
			Stream:          "Software Engineering",
			CurrentSemester: "6",
			GPA:             3.75,
			Skills:          "Golang, React",
		}
		if err := db.Create(studentInfo).Error; err != nil {
			return fmt.Errorf("failed to create student info: %w", err)
		}

		fmt.Println("Initial users created successfully.")
	}

	fmt.Println("Migrations completed successfully.")
	return nil
}
