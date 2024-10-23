package models

type Client struct {
	ID      uint   `gorm:"primaryKey;autoIncrement"`
	Name    string `gorm:"size:100;not null"`
	Phone   string `gorm:"size:20"`
	Email   string `gorm:"size:100"`
	Address string `gorm:"size:200"`
}
