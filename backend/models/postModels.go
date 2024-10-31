package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model

	Name    string   `json:"name"`         // Field for the name
	Age     int      `json:"age"`          // Field for the age
	Hobbies pq.StringArray `gorm:"type:text[]" json:"hobbies"` // Array of strings for hobbies
}
