package models

import "time"

type Employee struct {
	ID       uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name     string    `gorm:"size:100;not null" json:"name"`
	Position string    `gorm:"size:50;not null" json:"position"`
	HireDate time.Time `gorm:"type:date;not null" json:"hire_date" time_format:"2006-01-02"`
	Salary   float64   `gorm:"type:decimal(10,2);not null" json:"salary"`
	Status   string    `gorm:"size:20;default:'active'" json:"status"`
	Login    string    `gorm:"size:50;not null;unique" json:"login"`
	Password string    `gorm:"size:255;not null" json:"password"`
	Role     string    `gorm:"size:20;not null" json:"role"`
}
