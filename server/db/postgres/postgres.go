package postgres

import (
	"fmt"
	"log"
	pg "loginform/config/getconfs/dbconfpostgres"
	"loginform/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func ConnectDB() {
	dbconf := pg.GetDBConf()

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=UTC",
		dbconf.Host, dbconf.User, dbconf.Password, dbconf.DBName, dbconf.Port)

	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to the database: %s", err)
	}

	err = db.AutoMigrate(&models.Employee{}, &models.Client{}, &models.Order{},
		&models.PriceList{}, &models.Salary{}, &models.Service{})

	if err != nil {
		log.Fatalf("Error migrating the database: %s", err)
	}

	log.Println("Connected to the database successfully.")
}

func GetDB() *gorm.DB {
	return db
}

func CloseDB() {
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Error getting raw database object: %s", err)
	}
	sqlDB.Close()
}
