package main

import (
	"fmt"
	"fondomerende-web/config"
	"fondomerende-web/controllers"
	"sync"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/middleware"
	"github.com/subosito/gotenv"
)

func main() {

	var e *echo.Echo
	var wg sync.WaitGroup

	wg.Add(2)

	go func() {
		defer wg.Done()
		fmt.Println("Config - Inizializzo configurazione")
		gotenv.Load()
		config.Init()
	}()
	go func() {
		defer wg.Done()

		fmt.Println("Echo - inizializzo ECHO")
		e = echo.New()

		fmt.Println("Echo - Carico middleware")
		e.Use(middleware.Recover())
		e.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))

		fmt.Println("Echo - Carico risorse statiche")
		e.Static("*", "dist/")

		fmt.Println("Echo - Inizializzo rotte")
		e.GET("/getLastActions", controllers.GetLastAction)
		e.POST("/login", controllers.Login)
	}()

	wg.Wait()

	config := config.GetInstance()

	fmt.Println("here we go!")
	// Start server
	e.Logger.Fatal(e.Start(config.AppPort))
}
