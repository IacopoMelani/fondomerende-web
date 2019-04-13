package controllers

import (
	"bytes"
	"encoding/json"
	"fondomerende-web/config"
	"fondomerende-web/models"
	"net/http"
	"net/url"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo"
	"github.com/labstack/echo-contrib/session"
)

// GetUserData - Metodo che richiama il servizio remoto get-user-data
func GetUserData(c echo.Context) error {

	config := config.GetInstance()

	token := c.Request().Header.Get("token")

	req, err := http.NewRequest("GET", config.GetRemoteURL()+"/process-request.php?command-name=get-user-data", nil)
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

// Login - Metodo per richiamare il servizio remoto di login
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

	URLRequest := config.GetRemoteURL()

	req, err := http.NewRequest("POST", URLRequest+"/process-request.php", bytes.NewBufferString(form.Encode()))

	if err != nil {
		return c.JSON(500, &models.Response{
			Status:  2,
			Success: false,
			Message: err.Error(),
		})
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value;charset=UTF-8")

	setCookie(req, "auth-key", config.RemoteAuthKey)

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

	setSession(c, res)

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

// Imposta la sessione se trova nei cookie della response il PHPSESSID
func setSession(c echo.Context, r *http.Response) {

	for _, cookie := range r.Cookies() {

		if cookie.Name == "PHPSESSID" {

			sess, _ := session.Get("Session", c)
			sess.Options = &sessions.Options{
				Path:     "*",
				MaxAge:   60 * 3,
				HttpOnly: true,
			}
			sess.Values["PHPSESSID"] = cookie.Value

			sess.Save(c.Request(), c.Response())
		}
	}
}
