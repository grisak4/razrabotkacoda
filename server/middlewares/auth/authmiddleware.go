package auth

import (
	"loginform/config/getconfs/jwtsec"
	jwtutils "loginform/utils/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Получение токена из заголовка Authorization
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Запрос без токена"})
			c.Abort()
			return
		}

		// Инициализация структуры claims, содержащей IDemployee и Role
		claims := &jwtutils.Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtsec.GetJwt(), nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверная подпись токена"})
				c.Abort()
				return
			}
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка токена"})
			c.Abort()
			return
		}

		// Проверка валидности токена
		if !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Недействительный токен"})
			c.Abort()
			return
		}

		// Установка данных из токена в контекст
		c.Set("employeeID", claims.EmployeeID) // Используем IDemployee
		c.Set("role", claims.Role)             // Используем Role
		c.Next()
	}
}
