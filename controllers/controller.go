package controllers

import (
	"net/http"
)

// Si occupa di impostare un cookie per la specifica request passata per riferimento
func setCookie(r *http.Request, name string, value string) *http.Request {

	cookie := http.Cookie{Name: name, Value: value}
	r.AddCookie(&cookie)

	return r
}
