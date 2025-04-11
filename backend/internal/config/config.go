package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Config struct berisi semua konfigurasi aplikasi
type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
	JWT      JWTConfig
	CORS     CORSConfig
	Upload   UploadConfig
	Env      string `mapstructure:"ENV"`
}

type ServerConfig struct {
	Host string `mapstructure:"SERVER_HOST"`
	Port string `mapstructure:"SERVER_PORT"`
}

type DatabaseConfig struct {
	Host     string `mapstructure:"DB_HOST"`
	Port     string `mapstructure:"DB_PORT"`
	User     string `mapstructure:"DB_USER"`
	Password string `mapstructure:"DB_PASSWORD"`
	Name     string `mapstructure:"DB_NAME"`
	SSLMode  string `mapstructure:"DB_SSLMODE"`
}

type JWTConfig struct {
	Secret            string `mapstructure:"JWT_SECRET"`
	Expiration        string `mapstructure:"JWT_EXPIRATION"`
	RefreshExpiration string `mapstructure:"REFRESH_TOKEN_EXPIRATION"`
}

type CORSConfig struct {
	AllowedOrigins []string `mapstructure:"CORS_ALLOWED_ORIGINS"`
}

type UploadConfig struct {
	Directory string `mapstructure:"UPLOAD_DIRECTORY"`
	MaxSize   int64  `mapstructure:"MAX_UPLOAD_SIZE"`
}

func (c UploadConfig) String() string {
	return fmt.Sprintf("%dM", c.MaxSize/1024/1024)
}

// LoadEnvFile untuk fallback manual kalau Viper gagal
func LoadEnvFile(filePath string) map[string]string {
	data, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Printf("Error reading env file: %v\n", err)
		return nil
	}

	envMap := make(map[string]string)
	lines := strings.Split(string(data), "\n")

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}
		envMap[parts[0]] = parts[1]
	}

	return envMap
}

// Load config dari file .env atau environment
func Load() (*Config, error) {
	fmt.Println("Loading environment variables...")

	viper.SetConfigType("env")
	viper.SetConfigName(".env")
	viper.AddConfigPath(".")
	viper.AddConfigPath("./backend/cmd/api") // ini!
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	// Bind manual kalau mau pastiin
	_ = viper.BindEnv("server.host", "SERVER_HOST")
	_ = viper.BindEnv("server.port", "SERVER_PORT")

	// Bind manual kalau mau pastiin
	_ = viper.BindEnv("database.host", "DB_HOST")
	_ = viper.BindEnv("database.port", "DB_PORT")
	_ = viper.BindEnv("database.user", "DB_USER")
	_ = viper.BindEnv("database.password", "DB_PASSWORD")
	_ = viper.BindEnv("database.name", "DB_NAME")
	_ = viper.BindEnv("database.sslmode", "DB_SSLMODE")


	var cfg Config
	if err := viper.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("failed to unmarshal config: %w", err)
	}

	// Tambahin ini abis Unmarshal
	rawOrigins := viper.GetString("CORS_ALLOWED_ORIGINS")
	if rawOrigins != "" {
    cfg.CORS.AllowedOrigins = strings.Split(rawOrigins, ",")
}

	// ✅ Tambahkan Fallback disini, JANGAN di luar fungsi
	if cfg.Database.Host == "" || cfg.Database.Port == "" || cfg.Database.User == "" || cfg.Database.Name == "" {
		fmt.Println("Database config incomplete, trying direct .env file parsing")

		envMap := LoadEnvFile(".env")
		if envMap != nil {
			if host, ok := envMap["DB_HOST"]; ok && cfg.Database.Host == "" {
				cfg.Database.Host = host
			}
			if port, ok := envMap["DB_PORT"]; ok && cfg.Database.Port == "" {
				cfg.Database.Port = port
			}
			if user, ok := envMap["DB_USER"]; ok && cfg.Database.User == "" {
				cfg.Database.User = user
			}
			if password, ok := envMap["DB_PASSWORD"]; ok && cfg.Database.Password == "" {
				cfg.Database.Password = password
			}
			if name, ok := envMap["DB_NAME"]; ok && cfg.Database.Name == "" {
				cfg.Database.Name = name
			}
			if sslMode, ok := envMap["DB_SSLMODE"]; ok && cfg.Database.SSLMode == "" {
				cfg.Database.SSLMode = sslMode
			}
		}
	}

	fmt.Println("Final Loaded Config:", cfg)
	return &cfg, nil
}

// ConnectDB untuk koneksi ke database
func ConnectDB(cfg *Config) (*gorm.DB, error) {
	// Kalau masih kosong, fallback hardcoded
	if cfg.Database.Host == "" || cfg.Database.Port == "" || cfg.Database.User == "" || cfg.Database.Name == "" {
		fmt.Println("WARNING: Using hardcoded database config for development")
		cfg.Database.Host = "localhost"
		cfg.Database.Port = "5432"
		cfg.Database.User = "postgres"
		cfg.Database.Password = "postgres"
		cfg.Database.Name = "lms_db"
		cfg.Database.SSLMode = "disable"
	}

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Database.Host,
		cfg.Database.Port,
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Name,
		cfg.Database.SSLMode,
	)

	fmt.Printf("Connecting with DSN: %s\n", dsn)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	return db, nil
}
