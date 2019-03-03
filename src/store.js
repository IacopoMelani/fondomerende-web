import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		server: {
			host: "http://185.56.219.108:8001/process-request.php",
			authKey: "auth-key=bomba"
		},
		user: {
			attemptLogin: {
				failedResponse: "",
				requestLoading: false,
				successResponse: ""
			},
			data: {},
			token: ""
		}
	},
	mutations: {
		loginRequestLoading: function(state) {
			state.user.attemptLogin.requestLoading = true;
		},
		userLoginError: function(state) {
			state.user.attemptLogin.requestLoading = false;
			state.user.attemptLogin.failedResponse = "Errore: richiesta scaduta";
		},
		userLoginSuccess: function(state, payload) {
			state.user.attemptLogin.requestLoading = false;
			state.user.attemptLogin.successResponse = payload.response.message;
			state.user.token = payload.response.data.token;
		}
	},
	actions: {
		login: function(context, payload) {
			if (this.state.user.attemptLogin.requestLoading) {
				return;
			}
			context.commit("loginRequestLoading");
			axios
				.post("/login", payload)
				.then(result => {
					this.commit("userLoginSuccess", result);
				})
				.catch(() => {
					this.commit("userLoginError");
				});
		}
	}
});
