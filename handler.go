package main

import (
	"github.com/labstack/echo"
)

func main() {

	e := echo.New()

	e.File("/", "dist/index.html")
	e.File("/login", "dist/index.html")

	// Start server
	e.Logger.Fatal(e.Start(":8888"))
}
