package main

import (
	"time"

	"github.com/dagimgetaw/person-management-api.git/controller"
	"github.com/dagimgetaw/person-management-api.git/initializers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectDB()
}

func main() {
	r := gin.Default()

	// Enable CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Define routes
	r.POST("/person", controller.PostsCreate) // Change this to match the URL used in your frontend
	r.GET("/person", controller.PostsIndex)
	r.GET("/person/:id", controller.PostsShow)
	r.PUT("/person/:id", controller.PostsUpdate)
	r.DELETE("/person/:id", controller.PostsDelete)

	r.Run(":8080")
}
