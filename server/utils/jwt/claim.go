package jwt

import "github.com/golang-jwt/jwt"

type Claims struct {
	EmployeeID uint   `json:"employee_id"`
	Role       string `json:"password"`
	jwt.StandardClaims
}
