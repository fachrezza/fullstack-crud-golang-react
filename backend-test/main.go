package main

import (
	"backend-test/controllers"
	"backend-test/database"
	_ "backend-test/docs"
	"backend-test/middleware"
	"backend-test/models"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title CRUD Mahasiswa API
// @version 1.0
// @description REST API Technical Test Golang
// @host localhost:8080
// @BasePath /

func main() {

	r := gin.Default()

	// =========================
	// CORS CONFIG
	// =========================
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
			"Authorization",
		},
		ExposeHeaders: []string{
			"Content-Length",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	// =========================
	// DATABASE CONNECTION
	// =========================
	database.ConnectDatabase()

	// =========================
	// AUTO MIGRATION
	// =========================
	database.DB.AutoMigrate(
		&models.Jurusan{},
		&models.Mahasiswa{},
		&models.User{},
	)

	// =========================
	// SWAGGER ROUTE
	// =========================
	r.GET(
		"/swagger/*any",
		ginSwagger.WrapHandler(swaggerFiles.Handler),
	)

	// =========================
	// JURUSAN ROUTES
	// =========================
	r.GET("/jurusan", controllers.GetJurusan)
	r.POST("/jurusan", controllers.CreateJurusan)
	r.PUT("/jurusan/:id", controllers.UpdateJurusan)
	r.DELETE("/jurusan/:id", controllers.DeleteJurusan)

	// =========================
	// MAHASISWA ROUTES
	// =========================
	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())

	{
		auth.GET("/mahasiswa", controllers.GetMahasiswa)
		auth.POST("/mahasiswa", controllers.CreateMahasiswa)
		auth.PUT("/mahasiswa/:id", controllers.UpdateMahasiswa)
		auth.DELETE("/mahasiswa/:id", controllers.DeleteMahasiswa)
	}

	// LOGIN ROUTES

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// =========================
	// RUN SERVER
	// =========================
	r.Run(":8080")
}
