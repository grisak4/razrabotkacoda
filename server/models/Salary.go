package models

type Salary struct {
	ID           uint    `gorm:"primaryKey;autoIncrement"`
	EmployeeID   uint    `gorm:"not null"`
	SalaryMonth  string  `gorm:"size:7;not null"` // Формат: YYYY-MM
	SalaryAmount float64 `gorm:"type:decimal(10,2);not null"`

	// Связь
	Employee Employee `gorm:"foreignKey:EmployeeID"`
}
