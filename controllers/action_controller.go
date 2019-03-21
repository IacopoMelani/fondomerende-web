package controllers

import (
	"encoding/json"
	"fondomerende-web/config"
	"fondomerende-web/models"
	"net/http"

	"github.com/labstack/echo"
)

// GetLastAction - metodo che richiama il servizio remoto per richiedere le ultime azioni
func GetLastAction(c echo.Context) error {

	config := config.GetInstance()

	token := c.Request().Header.Get("token")

	URLRequest := config.GetRemoteURL()

	req, err := http.NewRequest("GET", URLRequest+"/process-request.php?command-name=get-last-actions", nil)
	if err != nil {
		return c.JSON(500, &models.Response{
			Status:  1,
			Success: false,
			Message: err.Error(),
		})
	}

	req.Header.Set("Cookie", "auth-key="+config.RemoteAuthKey+";token="+token)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")

	client := http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return c.JSON(500, &models.Response{
			Status:  2,
			Success: false,
			Message: err.Error(),
		})
	}

	defer res.Body.Close()

	var httpResponseData models.HTTPResponse

	if err := json.NewDecoder(res.Body).Decode(&httpResponseData); err != nil {
		return c.JSON(500, &models.Response{
			Status:  3,
			Success: false,
			Message: err.Error(),
		})
	}

	return c.JSON(200, httpResponseData)
}
