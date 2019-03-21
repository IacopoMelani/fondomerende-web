import Vue from "vue";
import Vuex from "vuex";

import router from "./router";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		actions: {
			getLastActions: {
				failedResponse: "",
				lastActionList: [],
				requestLoading: false,
				successResponse: ""
			}
		},
		user: {
			attemptLogin: {
				failedResponse: "",
				requestLoading: false,
				successResponse: ""
			},
			data: {},
			token: null
		}
	},
	mutations: {
		/**
		 * Mutator per cambiare lo state relativo al servizio /getLastActions in caso di errore
		 * @param {object} state State delle risorse dello store
		 */
		getLastActionsError: function(state) {
			state.actions.getLastActions.requestLoading = false;
			state.actions.getLastActions.failedResponse = "Errore: richiesta scaduta";
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /getLastActions in caso di fallimento
		 * @param {object} state State delle risorse dello store
		 * @param {string} message Messaggio di fallimento
		 */
		getLastActionsFailed: function(state, message) {
			state.actions.getLastActions.requestLoading = false;
			state.actions.getLastActions.failedResponse = "Impossbile recuperare le ultime azioni: " + message;
		},
		/**
		 * Mutator per cambiare per rendere bloccante la richiesta verso il servizio /getLastActionss
		 * @param {object} state State delle risorse dello store
		 */
		getLastActionRequestLoading: function(state) {
			state.actions.getLastActions.requestLoading = true;
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /getLastActions in caso di successo, aggiorna la lista delle actions
		 * @param {object} state State delle risorse dello store
		 * @param {object} payload Payload contenente il risultato del del servizio
		 */
		getLastActionsSuccess: function(state, payload) {
			state.actions.getLastActions.requestLoading = false;
			state.actions.getLastActions.lastActionList = payload.actions;
		},
		/**
		 * Mutator per cambiare per rendere bloccante la richiesta verso il servizio /login
		 * @param {object} state State delle risorse dello store
		 */
		loginRequestLoading: function(state) {
			state.user.attemptLogin.requestLoading = true;
		},
		/**
		 * Mutator per cambiare lo state realativo al token
		 * @param {object} state State delle risorse dello store
		 * @param {string} token Token di auteticazione
		 */
		setToken: function(state, token) {
			state.user.token = token;
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /login in caso di errore
		 * @param {object} state State delle risorse dello store
		 */
		userLoginError: function(state) {
			state.user.attemptLogin.requestLoading = false;
			state.user.attemptLogin.failedResponse = "Errore: richiesta scaduta";
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /login in caso di fallimento
		 * @param {object} state State delle risorse dello store
		 * @param {string} message Messaggio di fallimento
		 */
		userLoginFailed: function(state, message) {
			state.user.attemptLogin.requestLoading = false;
			state.user.attemptLogin.failedResponse = "Login fallito: " + message;
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /login in caso di successo, aggiorna la lista delle actions
		 * @param {object} state State delle risorse dello store
		 * @param {object} payload Payload contenente il risultato del del servizio
		 */
		userLoginSuccess: function(state, payload) {
			state.user.attemptLogin.requestLoading = false;
			state.user.attemptLogin.successResponse = "Benvenuto";
			state.user.token = payload.data.token;
			localStorage.setItem("token", payload.data.token);
		}
	},
	actions: {
		/**
		 * Controlla se è stato impostato il token di autenticazione
		 * @returns {Boolean} 	True se impostato altrimenti false
		 */
		checkToken: function() {
			if (this.state.user.token != null) {
				return true;
			}
			return false;
		},
		/**
		 * Restituisce le ultime 5 azioni eseguite dall'utente
		 * @param {object} context
		 * @param {object} payload
		 */
		getLastActions: function(context, payload) {
			if (this.state.actions.getLastActions.requestLoading) {
				return;
			}
			context.commit("getLastActionRequestLoading");
			axios
				.get("/getLastActions", {headers: {token: payload.token}})
				.then(result => {
					if (result.data && result.data.requestLoading.success && result.data.data) {
						this.commit("getLastActionsSuccess", result.data);
					} else {
						this.commit("getLastActionsFailed", result.data.response.message);
					}
				})
				.catch(() => {
					this.commit("getLastActionsError");
				});
		},
		/**
		 * Si occupa di richiamare il servizio per eseguire l'autenticazione
		 * @param {object} context
		 * @param {object} payload
		 */
		login: function(context, payload) {
			if (this.state.user.attemptLogin.requestLoading) {
				return;
			}
			context.commit("loginRequestLoading");
			axios
				.post("/login", payload)
				.then(result => {
					if (result.data && result.data.response.success && result.data.data) {
						this.commit("userLoginSuccess", result.data);
						router.push({name: "home"});
					} else {
						this.commit("userLoginFailed", result.data.response.message);
					}
				})
				.catch(() => {
					this.commit("userLoginError");
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
});
