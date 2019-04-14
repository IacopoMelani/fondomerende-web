package controllers

import (
	"encoding/json"
	"fondomerende-web/config"
	"fondomerende-web/models"
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo-contrib/session"
)

// GetMainData - Metodo che richiama il servizio remoto get-main-view-data
func GetMainData(c echo.Context) error {

	config := config.GetInstance()

	token := c.Request().Header.Get("token")

	req, err := http.NewRequest("GET", config.GetRemoteURL()+"/process-request.php?command-name=get-main-view-data", nil)
	if err != nil {
		return c.JSON(500, models.Response{
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
