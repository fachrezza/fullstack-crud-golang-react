package controllers

import (
	"backend-test/database"
	"backend-test/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("secret_key")

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

// Register godoc
// @Summary Register User
// @Description Register user baru
// @Tags Auth
// @Accept json
// @Produce json
// @Param user body models.User true "User Data"
// @Success 200 {object} map[string]interface{}
// @Router /register [post]
func Register(c *gin.Context) {

	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		14,
	)

	user.Password = string(hashedPassword)

	user.Role = "user"

	database.DB.Create(&user)

	c.JSON(http.StatusOK, gin.H{
		"message": "Register berhasil",
	})
}

// Login godoc
// @Summary Login User
// @Description Login user dan mendapatkan JWT token
// @Tags Auth
// @Accept json
// @Produce json
// @Param user body models.User true "Login User"
// @Success 200 {object} map[string]interface{}
// @Router /login [post]
func Login(c *gin.Context) {

	var request models.User

	var user models.User

	if err := c.ShouldBindJSON(&request); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	result := database.DB.Where(
		"email = ?",
		request.Email,
	).First(&user)

	if result.Error != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Email salah",
		})

		return
	}

	err := bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(request.Password),
	)

	if err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Password salah",
		})

		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &Claims{
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		claims,
	)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Could not create token",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}
