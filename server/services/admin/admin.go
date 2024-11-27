package admin

import (
	"log"
	"loginform/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Получение списка сотрудников
func GetEmployees(c *gin.Context, db *gorm.DB) {
	var employees []models.Employee

	if err := db.Find(&employees).Error; err != nil {
		log.Printf("Ошибка при получении сотрудников: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось получить сотрудников"})
		return
	}

	c.JSON(http.StatusOK, employees)
}

func CreateEmployee(c *gin.Context, db *gorm.DB) {
	var employee models.Employee

	// Привязка данных из тела запроса
	if err := c.ShouldBindJSON(&employee); err != nil {
		log.Printf("Ошибка привязки данных: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректные данные"})
		return
	}

	// Сохранение нового сотрудника в базе данных
	if err := db.Create(&employee).Error; err != nil {
		log.Printf("Ошибка при создании сотрудника: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось создать сотрудника"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Сотрудник успешно создан", "employee": employee})
}

// Обновление сотрудника
func UpdateEmployee(c *gin.Context, db *gorm.DB) {
	var employee models.Employee

	id := c.Param("id")

	// Поиск сотрудника по ID
	if err := db.First(&employee, id).Error; err != nil {
		log.Printf("Сотрудник с ID %s не найден: %v", id, err)
		c.JSON(http.StatusNotFound, gin.H{"error": "Сотрудник не найден"})
		return
	}

	// Привязка данных из тела запроса
	if err := c.ShouldBindJSON(&employee); err != nil {
		log.Printf("Ошибка при привязке данных: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректные данные"})
		return
	}

	// Сохранение изменений
	if err := db.Save(&employee).Error; err != nil {
		log.Printf("Ошибка при обновлении сотрудника: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось обновить сотрудника"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Сотрудник успешно обновлен", "employee": employee})
}

// Удаление сотрудника
func DeleteEmployee(c *gin.Context, db *gorm.DB) {
	var employee models.Employee

	id := c.Param("id")

	// Поиск сотрудника по ID
	if err := db.First(&employee, id).Error; err != nil {
		log.Printf("Сотрудник с ID %s не найден: %v", id, err)
		c.JSON(http.StatusNotFound, gin.H{"error": "Сотрудник не найден"})
		return
	}

	// Удаление сотрудника
	if err := db.Delete(&employee).Error; err != nil {
		log.Printf("Ошибка при удалении сотрудника: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось удалить сотрудника"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Сотрудник успешно удален"})
}
