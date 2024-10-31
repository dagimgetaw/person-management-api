package main

import (
	"github.com/dagimgetaw/person-management-api.git/initializers"
	"github.com/dagimgetaw/person-management-api.git/models"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Post{})
}