package config

import (
	"strings"
	"github.com/spf13/viper"
	"github.com/joho/godotenv"  // ⬅️ tambahin ini
)

func init() {
	// Load .env manually
	_ = godotenv.Load("./backend/cmd/api/.env")  // ⬅️ tambahkan ini!

	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
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
