package config

import (
	"log"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

// Config holds all configuration for the application
type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
	JWT      JWTConfig
	CORS     CORSConfig
	Upload   UploadConfig
}

// ServerConfig holds all the server related configuration
type ServerConfig struct {
	Port string
	Host string
	Env  string
}

// DatabaseConfig holds all the database related configuration
type DatabaseConfig struct {
	Host     string
	Port     string
	Username string
	Password string
	DBName   string
	SSLMode  string
}

// JWTConfig holds all the JWT related configuration
type JWTConfig struct {
	Secret            string
	ExpirationHours   time.Duration
	RefreshTokenHours time.Duration
}

// CORSConfig holds CORS configuration
type CORSConfig struct {
	AllowedOrigins []string
}

// UploadConfig holds file upload configuration
type UploadConfig struct {
	Directory string
	MaxSize   int64
}

// Load loads the configuration from environment variables
func Load() (*Config, error) {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading it, using environment variables")
	}

	// Server config
	serverConfig := ServerConfig{
		Port: getEnv("SERVER_PORT", "8080"),
		Host: getEnv("SERVER_HOST", "localhost"),
		Env:  getEnv("ENV", "development"),
	}

	// Database config
	dbConfig := DatabaseConfig{
		Host:     getEnv("DB_HOST", "localhost"),
		Port:     getEnv("DB_PORT", "5432"),
		Username: getEnv("DB_USER", "postgres"),
		Password: getEnv("DB_PASSWORD", "postgres"),
		DBName:   getEnv("DB_NAME", "lms_db"),
		SSLMode:  getEnv("DB_SSLMODE", "disable"),
	}

	// JWT config
	jwtExpirationStr := getEnv("JWT_EXPIRATION", "24h")
	jwtExpiration, err := time.ParseDuration(jwtExpirationStr)
	if err != nil {
		log.Printf("Invalid JWT expiration duration: %v, defaulting to 24h", err)
		jwtExpiration = 24 * time.Hour
	}

	refreshTokenExpirationStr := getEnv("REFRESH_TOKEN_EXPIRATION", "168h")
	refreshTokenExpiration, err := time.ParseDuration(refreshTokenExpirationStr)
	if err != nil {
		log.Printf("Invalid refresh token expiration duration: %v, defaulting to 168h", err)
		refreshTokenExpiration = 168 * time.Hour
	}

	jwtConfig := JWTConfig{
		Secret:            getEnv("JWT_SECRET", "your_jwt_secret_key_here"),
		ExpirationHours:   jwtExpiration,
		RefreshTokenHours: refreshTokenExpiration,
	}

	// CORS config
	corsConfig := CORSConfig{
		AllowedOrigins: getEnvArray("CORS_ALLOWED_ORIGINS", []string{"http://localhost:3000", "http://localhost:5173"}),
	}

	// Upload config
	maxUploadSizeStr := getEnv("MAX_UPLOAD_SIZE", "10485760") // Default: 10MB
	maxUploadSize, err := strconv.ParseInt(maxUploadSizeStr, 10, 64)
	if err != nil {
		log.Printf("Invalid max upload size: %v, defaulting to 10MB", err)
		maxUploadSize = 10 * 1024 * 1024 // 10MB
	}

	uploadConfig := UploadConfig{
		Directory: getEnv("UPLOAD_DIRECTORY", "./uploads"),
		MaxSize:   maxUploadSize,
	}

	// Create directory if it doesn't exist
	if _, err := os.Stat(uploadConfig.Directory); os.IsNotExist(err) {
		if err := os.MkdirAll(uploadConfig.Directory, 0755); err != nil {
			log.Printf("Error creating upload directory: %v", err)
		}
	}

	return &Config{
		Server:   serverConfig,
		Database: dbConfig,
		JWT:      jwtConfig,
		CORS:     corsConfig,
		Upload:   uploadConfig,
	}, nil
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// getEnvArray gets an environment variable as a string array or returns a default array
func getEnvArray(key string, defaultValue []string) []string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}

	var result []string
	for i, j := 0, 0; i < len(value); i = j {
		for j = i; j < len(value) && value[j] != ','; j++ {
		}
		result = append(result, value[i:j])
		for j < len(value) && value[j] == ',' {
			j++
		}
	}
	return result
}