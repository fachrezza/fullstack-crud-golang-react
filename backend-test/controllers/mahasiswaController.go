package controllers

import (
	"backend-test/database"
	"backend-test/models"

	"github.com/gin-gonic/gin"
)

// GetMahasiswa godoc
// @Summary Get all mahasiswa
// @Description Get list mahasiswa beserta jurusan
// @Tags Mahasiswa
// @Accept json
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Router /mahasiswa [get]
func GetMahasiswa(c *gin.Context) {

	var mahasiswa []models.Mahasiswa

	database.DB.Preload("Jurusan").Find(&mahasiswa)

	c.JSON(200, gin.H{
		"data": mahasiswa,
	})
}

// CreateMahasiswa godoc
// @Summary Create mahasiswa
// @Description Tambah data mahasiswa
// @Tags Mahasiswa
// @Accept json
// @Produce json
// @Param mahasiswa body models.Mahasiswa true "Mahasiswa"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]interface{}
// @Router /mahasiswa [post]
func CreateMahasiswa(c *gin.Context) {

	var mahasiswa models.Mahasiswa

	// VALIDASI JSON
	if err := c.ShouldBindJSON(&mahasiswa); err != nil {

		c.JSON(400, gin.H{
			"error": err.Error(),
		})

		return
	}

	// INSERT DATABASE
	result := database.DB.Create(&mahasiswa)

	// ERROR DATABASE
	if result.Error != nil {

		c.JSON(400, gin.H{
			"error": result.Error.Error(),
		})

		return
	}

	c.JSON(200, gin.H{
		"message": "Mahasiswa berhasil ditambah",
	})
}

// UpdateMahasiswa godoc
// @Summary Update mahasiswa
// @Description Update data mahasiswa berdasarkan ID
// @Tags Mahasiswa
// @Accept json
// @Produce json
// @Param id path int true "Mahasiswa ID"
// @Param mahasiswa body models.Mahasiswa true "Mahasiswa"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]interface{}
// @Failure 404 {object} map[string]interface{}
// @Router /mahasiswa/{id} [put]
func UpdateMahasiswa(c *gin.Context) {

	id := c.Param("id")

	var mahasiswa models.Mahasiswa

	if err := database.DB.First(&mahasiswa, id).Error; err != nil {

		c.JSON(404, gin.H{
			"error": "Data tidak ditemukan",
		})

		return
	}

	if err := c.ShouldBindJSON(&mahasiswa); err != nil {

		c.JSON(400, gin.H{
			"error": err.Error(),
		})

		return
	}

	database.DB.Save(&mahasiswa)

	c.JSON(200, gin.H{
		"message": "Mahasiswa berhasil diupdate",
	})
}

// DeleteMahasiswa godoc
// @Summary Delete mahasiswa
// @Description Hapus data mahasiswa berdasarkan ID
// @Tags Mahasiswa
// @Accept json
// @Produce json
// @Param id path int true "Mahasiswa ID"
// @Success 200 {object} map[string]interface{}
// @Router /mahasiswa/{id} [delete]
func DeleteMahasiswa(c *gin.Context) {

	id := c.Param("id")

	var mahasiswa models.Mahasiswa

	database.DB.Delete(&mahasiswa, id)

	c.JSON(200, gin.H{
		"message": "Mahasiswa berhasil dihapus",
	})
}
