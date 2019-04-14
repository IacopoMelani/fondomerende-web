export default {
	namespaced: true,
	state: {
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
			state.snack.getToEat.requestLoading = false;
			state.snack.getToEat.failedResponse = "Errore: richiesta scaduta";
		},
		/**
		 * Mutator per cambiare lo stato relativo al servizio /getToEatAndUserFunds in caso di fallimento
		 * @param {object} state State delle risorse dello store
		 * @param {string} message Messaggio di fallimento
		 */
		getToEatFailed: function(state, message) {
			state.snack.getToEat.requestLoading = false;
			state.snack.getToEat.failedResponse = "Impossibile recuperare la lista degli snacks: " + message;
		},
		/**
		 * Mutator per avvertire che è in corso una richiesta verso /getToEatAndUserFunds
		 * @param {object} state State delle risorse dello store
		 */
		getToEatRequestLoading: function(state) {
			state.snack.getToEat.requestLoading = true;
		},
		/**
		 * Mutator per cambiare lo state dopo aver chiamato il servizio remoto /getToEatAndUserFunds in caso di successo, aggiorna la lista degli snacks e il credio dell'utente
		 * @param {object} state State delle risorse dello store
		 * @param {object} payload Payload contente il risultato della chiamata remota
		 */
		getToEatSuccess: function(state, payload) {
			state.snack.getToEat.requestLoading = false;
			state.snack.snacksList = payload.snacks;
			state.user.data.fund = payload["user-funds-amount"];
		}
	},
	actions: {}
};
