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
	// SWAGGER
	// =========================

	r.GET(
		"/swagger/*any",
		ginSwagger.WrapHandler(swaggerFiles.Handler),
	)

	// =========================
	// AUTH ROUTES
	// =========================

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// =========================
	// USER ROUTES
	// =========================

	user := r.Group("/")
	user.Use(middleware.AuthMiddleware())

	{
		// USER HANYA MELIHAT DATA

		user.GET("/jurusan", controllers.GetJurusan)
		user.GET("/mahasiswa", controllers.GetMahasiswa)
	}

	// =========================
	// ADMIN ROUTES
	// =========================

	admin := r.Group("/admin")

	admin.Use(
		middleware.AuthMiddleware(),
		middleware.AdminMiddleware(),
	)

	{
		// CRUD JURUSAN

		admin.POST("/jurusan", controllers.CreateJurusan)
		admin.PUT("/jurusan/:id", controllers.UpdateJurusan)
		admin.DELETE("/jurusan/:id", controllers.DeleteJurusan)

		// CRUD MAHASISWA

		admin.POST("/mahasiswa", controllers.CreateMahasiswa)
		admin.PUT("/mahasiswa/:id", controllers.UpdateMahasiswa)
		admin.DELETE("/mahasiswa/:id", controllers.DeleteMahasiswa)
	}

	// =========================
	// RUN SERVER
	// =========================

	r.Run(":8080")
}
