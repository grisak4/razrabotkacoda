package models

type PriceList struct {
	ID          uint    `gorm:"primaryKey;autoIncrement"`
	ClientID    uint    `gorm:"not null"`
	ServiceID   uint    `gorm:"not null"`
	CreatedDate string  `gorm:"type:date;not null"`
	TotalPrice  float64 `gorm:"type:decimal(10,2);not null"`

	// Связи
	Client  Client  `gorm:"foreignKey:ClientID"`
	Service Service `gorm:"foreignKey:ServiceID"`
}
