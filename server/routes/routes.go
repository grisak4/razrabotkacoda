package routes

import (
	//"loginform/middlewares/auth"
	"loginform/middlewares/auth"
	"loginform/middlewares/cors"

	////
	"loginform/services/employees"
	"loginform/services/hello"
	"loginform/services/login"

	////
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func InitRoutes(router *gin.Engine, db *gorm.DB) {
	cors.InitCors(router)

	// // test
	// router.GET("/hello", func(c *gin.Context) {
	// 	hello.GetHello(c)
	// })

	router.GET("/employeestable", func(c *gin.Context) {
		employees.GetEmployees(c, db)
	})

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
