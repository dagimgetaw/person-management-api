package initializers

import (
	"fmt"
	"log"

	"github.com/lib/pq" // Import the pq package for PostgreSQL array support
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// User model
type User struct {
	ID      uint           `gorm:"primaryKey"`
	Name    string         `gorm:"type:varchar(100);not null"`
	Age     int            `gorm:"not null"`
	Hobbies pq.StringArray `gorm:"type:text[]"`
}

// Database connection details
const (
	host     = "localhost"
	port     = 5432
	user     = "go"
	password = "go"
	dbname   = "go_db"
)

var DB *gorm.DB

// ConnectDB connects to the PostgreSQL database and migrates the User model
func ConnectDB() {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable", host, user, password, dbname, port)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to the database: %v", err)
	}

	err = DB.AutoMigrate(&User{})
	if err != nil {
		log.Fatalf("failed to migrate schema: %v", err)
	}

	fmt.Println("Connected to the database and migrated schema successfully!")
}
