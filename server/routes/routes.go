package routes

import (
	//"loginform/middlewares/auth"
	"loginform/middlewares/auth"
	"loginform/middlewares/cors"

	////
	adm "loginform/services/admin"
	"loginform/services/hello"
	"loginform/services/login"

	////
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitRoutes(router *gin.Engine, db *gorm.DB) {
	cors.InitCors(router)

	router.GET("/employees", func(c *gin.Context) { adm.GetEmployees(c, db) })
	router.POST("/employees", func(c *gin.Context) { adm.CreateEmployee(c, db) })
	router.PUT("/employees/:id", func(c *gin.Context) { adm.UpdateEmployee(c, db) })
	router.DELETE("/employees/:id", func(c *gin.Context) { adm.DeleteEmployee(c, db) })

	// authorization
	router.POST("/login", func(c *gin.Context) {
		login.PostLoginUser(c, db)
	})

	// auth middleware
	authRoutes := router.Group("/auth")
	authRoutes.Use(auth.AuthMiddleware())
	{
		authRoutes.GET("/hello", func(c *gin.Context) {
			hello.GetHello(c)
		})
	}
}
