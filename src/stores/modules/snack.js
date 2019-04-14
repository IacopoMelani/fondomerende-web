import axios from "axios";

import router from "../../router";

import utility from "../../utility";

export default {
	namespaced: true,
	state: {
		fund: 0.0,
		getToEat: {
			failedResponse: "",
			requestLoading: false,
			successResponse: ""
		},
		snacksList: []
	},
	mutations: {
		/**
		 * Mutator per cambiare lo state relativo al servizio /getToEatAndUserFunds in caso di errore
		 * @param {object} state State delle risorse dello store
		 */
		getToEatError: function(state) {
			state.getToEat.requestLoading = false;
			state.getToEat.failedResponse = "Errore: richiesta scaduta";
		},
		/**
		 * Mutator per cambiare lo stato relativo al servizio /getToEatAndUserFunds in caso di fallimento
		 * @param {object} state State delle risorse dello store
		 * @param {string} message Messaggio di fallimento
		 */
		getToEatFailed: function(state, message) {
			state.getToEat.requestLoading = false;
			state.getToEat.failedResponse = "Impossibile recuperare la lista degli snacks: " + message;
		},
		/**
		 * Mutator per avvertire che è in corso una richiesta verso /getToEatAndUserFunds
		 * @param {object} state State delle risorse dello store
		 */
		getToEatRequestLoading: function(state) {
			state.getToEat.requestLoading = true;
		},
		/**
		 * Mutator per cambiare lo state dopo aver chiamato il servizio remoto /getToEatAndUserFunds in caso di successo, aggiorna la lista degli snacks e il credio dell'utente
		 * @param {object} state State delle risorse dello store
		 * @param {object} payload Payload contente il risultato della chiamata remota
		 */
		getToEatSuccess: function(state, payload) {
			state.getToEat.requestLoading = false;
			state.snacksList = payload.snacks;
			state.user.data.fund = payload["user-funds-amount"];
		},
		/**
		 * Mutator per cambiare lo state relativo ai fund del fondomerende
		 * @param {object} state
		 * @param {float} fund
		 */
		setFund: function(state, fund) {
			state.fund = fund;
		}
	},
	actions: {
		getToEatAndUserFund: function(context) {
			if (context.state.getToEat.requestLoading) {
				return;
			}

			context.commit("getToEatRequestLoading");
			axios
				.get("/getToEatAndUserFunds", {headers: {token: this.state.user.token}})
				.then(result => {
					if (result.data && result.data.response.success && result.data.data) {
						context.commit("getToEatSuccess", result.data.data);
						this.commit("user/setFund", result.data.data["user-funds-amount	"]);
					} else {
						if (utility.checkTokenIsExpired(result.data.response.message, result.data.response.status)) {
							router.push({name: "login"});
						}
						context.commit("getToEatFailed", result.data.response.message);
					}
				})
				.catch(() => {
					context.commit("getToEatError");
				});
		}
	}
};
