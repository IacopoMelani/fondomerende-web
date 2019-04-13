package controllers

import (
	"encoding/json"
	"fondomerende-web/config"
	"fondomerende-web/models"
	"net/http"

	"github.com/labstack/echo-contrib/session"

	"github.com/labstack/echo"
)

// GetToEatAndUserFunds - Metodo che richiama il servizio remoto get-to-eat-and-user-funds
func GetToEatAndUserFunds(c echo.Context) error {

	config := config.GetInstance()

	token := c.Request().Header.Get("token")

	req, err := http.NewRequest("GET", config.GetRemoteURL()+"process-request.php?command-name=get-to-eat-and-user-funds", nil)
	if err != nil {
		return c.JSON(1, models.Response{
			Status:  1,
			Success: false,
			Message: err.Error(),
		})
	}

	sess, _ := session.Get("Session", c)
	if sess != nil && sess.Values["PHPSESSID"] != nil {
		setCookie(req, "PHPSESSID", sess.Values["PHPSESSID"].(string))
	}

	setCookie(req, "auth-key", config.RemoteAuthKey)
	setCookie(req, "user-token", token)

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value;charset=UTF-8")

	client := http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return c.JSON(500, models.Response{
			Status:  2,
			Success: false,
			Message: err.Error(),
		})
	}

	defer res.Body.Close()

	var httpResponseData models.HTTPResponse

	if err := json.NewDecoder(res.Body).Decode(&httpResponseData); err != nil {
		return c.JSON(500, models.Response{
			Status:  3,
			Success: false,
			Message: err.Error(),
		})
	}

	return c.JSON(200, httpResponseData)
}
