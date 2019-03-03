package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/url"

	"github.com/labstack/echo"
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

	e.Static("*", "dist/")

	e.POST("/login", login)

	// Start server
	e.Logger.Fatal(e.Start(":8888"))
}

func login(c echo.Context) error {
	body := make(map[string]interface{})
	err := json.NewDecoder(c.Request().Body).Decode(&body)
	if err != nil {
		return c.JSON(500, &response{
			Status:  1,
			Success: false,
			Message: "Errore interno",
		})
	}

	body["command-name"] = "login"

	form := url.Values{}

	form.Add("command-name", body["command-name"].(string))
	form.Add("name", body["username"].(string))
	form.Add("password", body["password"].(string))

	//jsonValue, _ := json.Marshal(body)

	req, err := http.NewRequest("POST", "http://185.56.219.108:8001/process-request.php", bytes.NewBufferString(form.Encode()))

	if err != nil {
		return c.JSON(500, &response{
			Status:  2,
			Success: false,
			Message: err.Error(),
		})
	}

	req.Header.Set("Cookie", "auth-key=bomba")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")

	client := &http.Client{}

	res, err := client.Do(req)
	if err != nil {
		return c.JSON(500, &response{
			Status:  3,
			Success: false,
			Message: err.Error(),
		})
	}

	defer res.Body.Close()

	var httpResponseData httpResponse

	if err := json.NewDecoder(res.Body).Decode(&httpResponseData); err != nil {
		return c.JSON(500, &response{
			Status:  4,
			Success: false,
			Message: err.Error(),
		})
	}

	return c.JSON(200, httpResponseData)
}
