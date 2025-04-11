package main

import (
	"backend/internal/config"
	"backend/internal/db"
	"backend/internal/server"
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv" // ⬅️ Tambahkan ini
)

func main() {
	// ⬇️ Tambahan untuk load .env
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Failed to load .env file: %v", err)
	}

	// Ini tetap seperti punyamu
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to database
	fmt.Printf("Connecting to database: %s:%s/%s\n", cfg.Database.Host, cfg.Database.Port, cfg.Database.Name)
	database, err := config.ConnectDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Run migrations
	if err := db.Migrate(database); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Create and start server
	srv, err := server.New(cfg, database)
	if err != nil {
		log.Fatalf("Failed to create server: %v", err)
	}

	// Start server in a goroutine
	go func() {
		// ⬇️ CEK DULU sebelum jalan server
		if cfg.Server.Port == "" {
			log.Println("Warning: SERVER_PORT not set, using default 50404")
			cfg.Server.Port = "50404"
		}
	
		addr := fmt.Sprintf("%s:%s", cfg.Server.Host, cfg.Server.Port)
		log.Printf("Starting server on %s", addr)
		if err := srv.Start(addr); err != nil {
			log.Printf("Server stopped: %v", err)
		}
	}()
	

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// Create a deadline for the shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Shutdown the server
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server gracefully shutdown")
}
