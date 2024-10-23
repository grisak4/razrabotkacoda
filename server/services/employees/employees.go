package employees

import (
	"log"
	"loginform/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetEmployees(c *gin.Context, db *gorm.DB) {
	var employees []models.Employee

	if err := db.Find(&employees).Error; err != nil {
		log.Printf("Ошибка при получении сотрудников: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось получить сотрудников"})
		return
	}

	c.JSON(http.StatusOK, employees)
}
