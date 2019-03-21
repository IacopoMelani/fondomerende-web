package controllers

import (
	"bytes"
	"encoding/json"
	"fondomerende-web/config"
	"fondomerende-web/models"
	"net/http"
	"net/url"

	"github.com/labstack/echo"
)

// Login - metodo per richiamare il servizio remoto di login
func Login(c echo.Context) error {

	config := config.GetInstance()

	body := make(map[string]interface{})
	err := json.NewDecoder(c.Request().Body).Decode(&body)
	if err != nil {
		return c.JSON(500, &models.Response{
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

	URLRequest := config.GetRemoteURL()

	req, err := http.NewRequest("POST", URLRequest+"/process-request.php", bytes.NewBufferString(form.Encode()))

	if err != nil {
		return c.JSON(500, &models.Response{
			Status:  2,
			Success: false,
			Message: err.Error(),
		})
	}

	req.Header.Set("Cookie", "auth-key="+config.RemoteAuthKey)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")

	client := &http.Client{}

	res, err := client.Do(req)
	if err != nil {
		return c.JSON(500, &models.Response{
			Status:  3,
			Success: false,
			Message: err.Error(),
		})
	}

	defer res.Body.Close()

	var httpResponseData models.HTTPResponse

	if err := json.NewDecoder(res.Body).Decode(&httpResponseData); err != nil {
		return c.JSON(500, &models.Response{
			Status:  4,
			Success: false,
			Message: err.Error(),
		})
	}

	return c.JSON(200, httpResponseData)
}
