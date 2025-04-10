// internal/config/database.go
package config

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// NOTE: This function is already defined in config.go
// Keep this file for organization purposes but delegate to the main implementation

// ConnectDB establishes a connection to the database
// This is just a wrapper around the implementation in config.go


// Internal implementation (only used if you want to keep both files)
func connectDBInternal(cfg *Config) (*gorm.DB, error) {
	// Validate configuration
	if cfg.Database.Host == "" || cfg.Database.Port == "" || 
	   cfg.Database.User == "" || cfg.Database.Name == "" {
		return nil, fmt.Errorf("incomplete database configuration")
	}

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Database.Host,
		cfg.Database.Port,
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Name,
		cfg.Database.SSLMode,
	)

	fmt.Printf("Connecting to database with DSN: %s\n", dsn)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	return db, nil
}