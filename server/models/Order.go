package models

type Order struct {
	ID         uint    `gorm:"primaryKey;autoIncrement"`
	ClientID   uint    `gorm:"not null"`
	EmployeeID uint    `gorm:"not null"`
	ServiceID  uint    `gorm:"not null"`
	OrderDate  string  `gorm:"type:date;not null"`
	Price      float64 `gorm:"type:decimal(10,2);not null"`

	// Связи
	Client   Client   `gorm:"foreignKey:ClientID"`
	Employee Employee `gorm:"foreignKey:EmployeeID"`
	Service  Service  `gorm:"foreignKey:ServiceID"`
}
