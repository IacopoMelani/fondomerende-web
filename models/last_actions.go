package models

import (
	"sync"
	"time"
)

// LastActions - Struttura per immagazzinare le ultime azioni
type LastActions struct {
	Actions      []string
	LastCallDate time.Time
}

var lastAction *LastActions
var once sync.Once

// GetLastActionStruct - Restituisce un puntatore all'unica struttura di LastActions
func GetLastActionStruct() *LastActions {
	once.Do(func() {
		lastAction = &LastActions{}
	})
	return lastAction
}

// GetActions - Restituisce le ultime azioni immagazzinate nella struttura
func (l *LastActions) GetActions() []string {
	return l.Actions
}

// GetLastCallDate - Restituisce la data dell'ultima chiamata al servizio getLastActions
func (l *LastActions) GetLastCallDate() time.Time {
	return l.LastCallDate
}
