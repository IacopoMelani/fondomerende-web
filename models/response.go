package models

// Response - struttura di una response standard
type Response struct {
	Status  int    `json:"status"`
	Success bool   `json:"Success"`
	Message string `json:"Message"`
}

// SetSuccess - imposta il success della response
func (r *Response) SetSuccess(success bool) {
	r.Success = success
}

// SetStatus - imposta lo status della response
func (r *Response) SetStatus(status int) {
	r.Status = status
}

// SetMessage - imposta il messaggio della response
func (r *Response) SetMessage(message string) {
	r.Message = message
}
