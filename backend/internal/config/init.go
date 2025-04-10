package config

import (
	"strings"

	"github.com/spf13/viper"
)

func init() {
	// Use a replacer to convert environment variable format to config key format
	// For example, CORS_ALLOWED_ORIGINS to cors.allowedOrigins
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	
	// Enable auto-environment variable
	viper.AutomaticEnv()
	
	// Set default values
	viper.SetDefault("server.host", "0.0.0.0")
	viper.SetDefault("server.port", "8080")
	viper.SetDefault("database.sslmode", "disable")
	viper.SetDefault("jwt.expiration", "24h")
	viper.SetDefault("jwt.refresh_expiration", "168h")
	viper.SetDefault("cors.allowed_origins", []string{"*"})
	viper.SetDefault("upload.directory", "./uploads")
	viper.SetDefault("upload.max_size", 10485760) // 10MB
}