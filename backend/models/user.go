package models

import (
	"github.com/lib/pq" // Import the pq package for PostgreSQL array support
)

// User model
type User struct {
	ID      uint           `gorm:"primaryKey"`
	Name    string         `gorm:"type:varchar(100);not null"`
	Age     int            `gorm:"not null"`
	Hobbies pq.StringArray `gorm:"type:text[]"` // Use pq.StringArray for PostgreSQL arrays
}
