package main

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	// Inisialisasi Echo
	e := echo.New()

	// Routing dasar (cek server jalan)
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "LMS Backend is running!")
	})

	// Start server di port 8080
	log.Println("Server started at :8080")
	e.Start(":8080")
}
