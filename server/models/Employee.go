package models

type Employee struct {
	ID       uint    `gorm:"primaryKey;autoIncrement"`
	Name     string  `gorm:"size:100;not null"`
	Position string  `gorm:"size:50;not null"`
	HireDate string  `gorm:"type:date;not null"`
	Salary   float64 `gorm:"type:decimal(10,2);not null"`
	Status   string  `gorm:"size:20;default:'active'"`
	Login    string  `gorm:"size:50;not null;unique"`
	Password string  `gorm:"size:255;not null"`
	Role     string  `gorm:"size:20;not null"`
}
