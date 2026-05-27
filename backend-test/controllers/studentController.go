package controllers

import (
	"backend-test/database"
	"backend-test/models"

	"github.com/gin-gonic/gin"
)

func GetStudents(c *gin.Context) {
	var students []models.Student

	database.DB.Find(&students)

	c.JSON(200, gin.H{
		"data": students,
	})
}

func CreateStudent(c *gin.Context) {

	var student models.Student

	c.BindJSON(&student)

	database.DB.Create(&student)

	c.JSON(200, gin.H{
		"message": "Student berhasil ditambah",
	})
}

func UpdateStudent(c *gin.Context) {

	id := c.Param("id")

	var student models.Student

	database.DB.First(&student, id)

	c.BindJSON(&student)

	database.DB.Save(&student)

	c.JSON(200, gin.H{
		"message": "Student berhasil diupdate",
	})
}

func DeleteStudent(c *gin.Context) {

	id := c.Param("id")

	var student models.Student

	database.DB.Delete(&student, id)

	c.JSON(200, gin.H{
		"message": "Student berhasil dihapus",
	})
}
