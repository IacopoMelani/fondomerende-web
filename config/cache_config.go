package config

import (
	"errors"
	"fmt"
	"os"
	"reflect"
	"sync"
)

// CacheConfig - struttura dove immagazzinare le configurazioni
type CacheConfig struct {
	RemoteSchema     string
	RemoteServiceURL string
	RemoteAuthKey    string
	AppPort          string
}

var arrayEnvMapper = map[string]string{
	"REMOTE_SCHEMA":      "RemoteSchema",
	"REMOTE_SERVICE_URL": "RemoteServiceURL",
	"REMOTE_AUTH_KEY":    "RemoteAuthKey",
	"APP_PORT":           "AppPort",
}

var cacheConfig *CacheConfig
var once sync.Once

// GetInstance - restituisce l'unica istanza della struttura contenente le configurazioni
func GetInstance() *CacheConfig {
	once.Do(func() {
		cacheConfig = &CacheConfig{}
	})
	return cacheConfig
}

// Init - Inizializza la struttura caricando le configurazioni
func Init() {
	config := GetInstance()
	config.loadEnvConfig()
}

// loadEnvConfig - si occupa di caricare tutte le configurazioni dell'env nella struttura di configurazione
func (c *CacheConfig) loadEnvConfig() {
	for envName, StructName := range arrayEnvMapper {
		c.setField(StructName, os.Getenv(envName))
	}
}

// GetRemoteURL - restituisce l'url remoto senza separatore finale
func (c *CacheConfig) GetRemoteURL() string {
	remoteSchema := c.RemoteSchema
	remoteURL := c.RemoteServiceURL
	return remoteSchema + "://" + remoteURL
}

// setField - si occupa di impostare  attrun campo averso la reflection, c è necessario sia un puntatore a una struttura
func (c *CacheConfig) setField(name string, value string) error {

	rv := reflect.ValueOf(c)

	// Controllo se pointer a una struct
	if rv.Kind() != reflect.Ptr || rv.Elem().Kind() != reflect.Struct {
		return errors.New("c must be pointer to struct")
	}

	// Prelevo i campi della struct
	rv = rv.Elem()

	// Controllo che il campo esista
	fv := rv.FieldByName(name)
	if !fv.IsValid() {
		return fmt.Errorf("not a field name: %s", name)
	}

	if !fv.CanSet() {
		return fmt.Errorf("cannot set field %s", name)
	}

	// Controllo tipo stringa
	if fv.Kind() != reflect.String {
		return fmt.Errorf("%s is not a string field", name)
	}

	// assegno valore al campo
	fv.SetString(value)

	return nil
}
