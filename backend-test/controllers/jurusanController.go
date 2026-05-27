package controllers

import (
	"backend-test/database"
	"backend-test/models"

	"github.com/gin-gonic/gin"
)

func GetJurusan(c *gin.Context) {

	var jurusan []models.Jurusan

	database.DB.Find(&jurusan)

	c.JSON(200, gin.H{
		"data": jurusan,
	})
}

func CreateJurusan(c *gin.Context) {

	var jurusan models.Jurusan

	c.BindJSON(&jurusan)

	database.DB.Create(&jurusan)

	c.JSON(200, gin.H{
		"message": "Jurusan berhasil ditambah",
	})
}

func UpdateJurusan(c *gin.Context) {

	id := c.Param("id")

	var jurusan models.Jurusan

	database.DB.First(&jurusan, id)

	c.BindJSON(&jurusan)

	database.DB.Save(&jurusan)

	c.JSON(200, gin.H{
		"message": "Jurusan berhasil diupdate",
	})
}

func DeleteJurusan(c *gin.Context) {

	id := c.Param("id")

	var jurusan models.Jurusan

	database.DB.Delete(&jurusan, id)

	c.JSON(200, gin.H{
		"message": "Jurusan berhasil dihapus",
	})
}
