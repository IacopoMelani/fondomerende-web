import router from "../../router";

import utility from "../../utility";

import axios from "axios";

export default {
	namespaced: true,
	state: {
		getLastActions: {
			failedResponse: "",
			requestLoading: false,
			successResponse: ""
		},
		getMainViewData: {
			failedResponse: "",
			requestLoading: false,
			successResponse: ""
		},
		lastActionList: []
	},
	mutations: {
		/**
		 * Mutator per cambiare lo state relativo al servizio /getLastActions in caso di errore
		 * @param {object} state State delle risorse dello store
		 */
		getLastActionsError: function(state) {
			state.getLastActions.requestLoading = false;
			state.getLastActions.failedResponse = "Errore: richiesta scaduta";
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /getLastActions in caso di fallimento
		 * @param {object} state State delle risorse dello store
		 * @param {string} message Messaggio di fallimento
		 */
		getLastActionsFailed: function(state, message) {
			state.getLastActions.requestLoading = false;
			state.getLastActions.failedResponse = "Impossbile recuperare le ultime azioni: " + message;
		},
		/**
		 * Mutator per rendere bloccante la richiesta verso il servizio /getLastActionss
		 * @param {object} state State delle risorse dello store
		 */
		getLastActionRequestLoading: function(state) {
			state.getLastActions.requestLoading = true;
		},
		/**
		 * Mutator per cambiare lo state relativo al servizio /getLastActions in caso di successo, aggiorna la lista delle actions
		 * @param {object} state State delle risorse dello store
		 * @param {object} payload Payload contenente il risultato del del servizio
		 */
		getLastActionsSuccess: function(state, payload) {
			state.getLastActions.requestLoading = false;
			state.lastActionList = payload.actions;
		},
		/**
		 * Mutator relativo al servizio /getMainViewData in caso di errore
		 * @param {object} state
		 */
		getMainViewDataError: function(state) {
			state.getMainViewData.requestLoading = false;
			state.getMainViewData.failedResponse = "Errore: richiesta scaduta";
		},
		/**
		 * Mutator relativo al servizio /getMainViewData in caso di errore
		 * @param {object} state
		 */
		getMainViewDataFailed: function(state, message) {
			state.getMainViewData.requestLoading = false;
			state.getMainViewData.failedResponse = message;
		},
		/**
		 * Mutator relativo al servizio /getMainViewData per bloccare ulteriori richieste
		 * @param {object} state
		 */
		getMainViewDataRequestLoading: function(state) {
			state.getMainViewData.requestLoading = true;
		},
		/**
		 * Mutator relativo al servizio /getMainViewData in caso di successo
		 * @param {object} state
		 */
		getMainViewDataSuccess: function(state, payload) {
			state.getMainViewData.requestLoading = false;
			state.lastActionList = payload.actions;
		}
	},
	actions: {
		/**
		 * Restituisce le ultime 5 azioni eseguite dall'utente
		 * @param {object} context
		 * @param {object} payload
		 */
		getLastActions: function(context) {
			if (context.state.getLastActions.requestLoading) {
				return;
			}
			context.commit("getLastActionRequestLoading");
			axios
				.get("/getLastActions", {headers: {token: this.state.user.token}})
				.then(result => {
					if (result.data && result.data.response.success && result.data.data) {
						context.commit("getLastActionsSuccess", result.data.data);
					} else {
						if (utility.checkTokenIsExpired(result.data.response.message, result.data.response.status)) {
							router.push({name: "login"});
						}
						context.commit("getLastActionsFailed", result.data.response.message);
					}
				})
				.catch(() => {
					context.commit("getLastActionsError");
				});
		},
		getMainViewData: function(context) {
			if (context.state.getMainViewData.requestLoading) {
				return;
			}

			context.commit("getMainViewDataRequestLoading");
			axios
				.get("/getMainViewData", {headers: {token: this.state.user.token}})
				.then(result => {
					if (result.data && result.data.response.success && result.data.data) {
						context.commit("getMainViewDataSuccess", result.data.data);
					} else {
						if (utility.checkTokenIsExpired(result.data.response.message, result.data.response.status)) {
							router.push({name: "login"});
						}
						context.commit("getMainViewDataFailed", result.data.response.message);
					}
				})
				.catch(() => {
					context.commit("getMainViewDataError");
				});
		}
	}
};
