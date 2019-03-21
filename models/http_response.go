package models

// HTTPResponse - struttura completa di una response standard con data
type HTTPResponse struct {
	Response interface{} `json:"response"`
	Data     interface{} `json:"data"`
}

// SetResponse - Imposta  la response della risposta http standard
func (h *HTTPResponse) SetResponse(response interface{}) {
	h.Response = response
}

// SetData - Imposta il data della risposta http standard
func (h *HTTPResponse) SetData(data interface{}) {
	h.Data = data
}
