package db

import (
	"backend/internal/domain"
	"fmt"
	
	"gorm.io/gorm"
)

// Migrate runs database migrations and creates initial data
func Migrate(db *gorm.DB) error {
	fmt.Println("Running migrations...")
	
	// Migrate schemas
	err := db.AutoMigrate(
		&domain.User{},
		&domain.RefreshToken{},
	)
	
	if err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}
	
	// Seed a test user if no users exist
	var count int64
	db.Model(&domain.User{}).Count(&count)
	
	if count == 0 {
		fmt.Println("Creating test user...")
		
		// Create a test user
		testUser := &domain.User{
			Name:  "Test User",
			Email: "test@example.com",
		}
		
		if err := testUser.SetPassword("password"); err != nil {
			return fmt.Errorf("failed to set password for test user: %w", err)
		}
		
		if err := db.Create(testUser).Error; err != nil {
			return fmt.Errorf("failed to create test user: %w", err)
		}
		
		fmt.Println("Test user created successfully")
	}
	
	fmt.Println("Migrations completed successfully")
	return nil
}