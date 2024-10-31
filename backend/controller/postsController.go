package controller

import (
	"net/http"

	"github.com/dagimgetaw/person-management-api.git/initializers"
	"github.com/dagimgetaw/person-management-api.git/models"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func PostsCreate(c *gin.Context) {
	var body struct {
		Name    string         `json:"name"`
		Age     int            `json:"age"`
		Hobbies pq.StringArray `json:"hobbies"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	users := models.User{Name: body.Name, Age: body.Age, Hobbies: body.Hobbies}
	result := initializers.DB.Create(&users)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"person": users})
}

func PostsIndex(c *gin.Context) {
	var users []models.User
	initializers.DB.Find(&users)
	c.JSON(http.StatusOK, gin.H{"person": users})
}

func PostsShow(c *gin.Context) {
	id := c.Param("id")
	var users models.User

	if err := initializers.DB.First(&users, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Person not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"person": users})
}

func PostsUpdate(c *gin.Context) {
	id := c.Param("id")

	var body struct {
		Name    string         `json:"name"`
		Age     int            `json:"age"`
		Hobbies pq.StringArray `json:"hobbies"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var users models.User
	if err := initializers.DB.First(&users, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Person not found"})
		return
	}

	if err := initializers.DB.Model(&users).Updates(models.User{Name: body.Name, Age: body.Age, Hobbies: body.Hobbies}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"person": users})
}

func PostsDelete(c *gin.Context) {
	id := c.Param("id")
	initializers.DB.Delete(&models.User{}, id)
	c.Status(http.StatusOK)
}
