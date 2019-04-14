import axios from "axios";

export default {
	namespaced: true,

	state: {
		attemptLogin: {
			failedResponse: "",
			requestLoading: false,
			successResponse: ""
		},
		fund: 0.0,
		getUserData: {
			failedResponse: "",
			requestLoading: false,
			successResponse: ""
		},
		username: "",
		token: null
	},
	mutations: {
		/**
		 * Mutator per cambiare per rendere bloccante la richiesta verso il servizio /login
		 * @param {object} state State delle risorse dello store
		 */
		loginRequestLoading: function(state) {
			state.attemptLogin.requestLoading = true;
		},
		/**
		 * Mutator relativo al servizio /getUserData in caso di errore
		 * @param {object} state State delle risorse dello store
		 */
		getUserDataError: function(state) {
			state.getUserData.requestLoading = false;
			state.getUserData.failedResponse = "Errore: richiesta scaduta";
		},
		/**
		 * Mutator relativo al servizio /getUserData in caso di fallimento
		 * @param {object} state State delle risorse dello store
		 * @param {string} message Messaggio di fallimento
		 */
		getUserDataFailed: function(state, message) {
			state.getUserData.requestLoading = false;
			state.getUserData.failedResponse = message;
		},
		/**
		 * Mutator relativo al servizio /getUserData per bloccare ulteriori richieste
		 * @param {object} state State delle risorse dello store
		 */
		getUserDataRequestLoading(state) {
			state.getUserData.requestLoading = true;
		},
		/**
		 * Mutator relativo al servizio /getUserData in caso di successo
		 * @param {object} state State delle risorse dello store
		 * @param {object} payload Dati recuperati dal servizio remoto
		 */
		getUserDataSuccess: function(state, payload) {
			state.getUserData.requestLoading = false;
			state.username = payload.user["friendly-name"];
		},
		/**
		 * Mutator per cambiare lo state relativo al fondo dell'utente
		 * @param {object} state
		 * @param {float} fund
		 */
		setFund: function(state, fund) {
			state.fund = fund;
		},
		/**
		 * Mutator per cambiare lo state realativo al token
		 * @param {object} state State delle risorse dello store
		 * @param {string} token Token di auteticazione
		 */
		setToken: function(state, token) {
			state.token = token;
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /login in caso di errore
		 * @param {object} state State delle risorse dello store
		 */
		userLoginError: function(state) {
			state.attemptLogin.requestLoading = false;
			state.attemptLogin.failedResponse = "Errore: richiesta scaduta";
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /login in caso di fallimento
		 * @param {object} state State delle risorse dello store
		 * @param {string} message Messaggio di fallimento
		 */
		userLoginFailed: function(state, message) {
			state.attemptLogin.requestLoading = false;
			state.user.attemptLogin.failedResponse = "Login fallito: " + message;
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /login in caso di successo, aggiorna la lista delle actions
		 * @param {object} state State delle risorse dello store
		 * @param {object} payload Payload contenente il risultato del del servizio
		 */
		userLoginSuccess: function(state, payload) {
			state.attemptLogin.requestLoading = false;
			state.attemptLogin.successResponse = "Benvenuto";
			state.token = payload.data.token;
			localStorage.setItem("token", payload.data.token);
		}
	},
	actions: {
		/**
		 * Controlla se è stato impostato il token di autenticazione
		 * @returns {Boolean} 	True se impostato altrimenti false
		 */
		checkToken: function() {
			if (this.state.user.token != null && this.state.user.token != "" && this.state.user.token != ".") {
				return true;
			}
			return false;
		},
		/**
		 * Si occupa di richiamare il servizio per restituire lo username dell'utente
		 * @param {object} context
		 */
		getUserData: function(context) {
			if (context.state.getUserData.requestLoading) {
				return;
			}
			context.commit("getUserDataRequestLoading");
			axios
				.get("/getUserData", {headers: {token: this.state.user.token}})
				.then(result => {
					if (result.data && result.data.response.success && result.data.data) {
						context.commit("getUserDataSuccess", result.data.data);
					} else {
						context.commit("getUserDataFailed", result.data.response.message);
					}
				})
				.catch(() => {
					context.commit("getUserDataError");
				});
		},
		/**
		 * Si occupa di richiamare il servizio per eseguire l'autenticazione
		 * @param {object} context
		 * @param {object} payload
		 */
		login: function(context, payload) {
			return new Promise((resolve, reject) => {
				if (context.state.attemptLogin.requestLoading) {
					reject();
				}
				context.commit("loginRequestLoading");
				axios
					.post("/login", payload)
					.then(result => {
						if (result.data && result.data.response.success && result.data.data) {
							context.commit("userLoginSuccess", result.data);
							resolve();
						} else {
							context.commit("userLoginFailed", result.data.response.message);
							reject();
						}
					})
					.catch(() => {
						context.commit("userLoginError");
						reject();
					});
			});
		},
		/**
		 * Si occupa di impostare il token di autenticazione
		 * @param {object} context
		 * @param {string} token Token di autenticazione
		 */
		setToken(context, token) {
			context.commit("setToken", token);
		}
	}
};
