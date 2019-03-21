package main

import (
	"fondomerende-web/controllers"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type response struct {
	Status  int    `json:"status"`
	Success bool   `json:"Success"`
	Message string `json:"Message"`
}
type httpResponse struct {
	Response interface{} `json:"response"`
	Data     interface{} `json:"data"`
}

func main() {

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Static("*", "dist/")

	e.GET("/getLastActions", controllers.GetLastAction)

	e.POST("/login", controllers.Login)

	// Start server
	e.Logger.Fatal(e.Start(":8888"))
}
