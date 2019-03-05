import Vue from "vue";
import Vuex from "vuex";

import router from "./router";

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
		setToken: function(state, token) {
			state.user.token = token;
		},
		userLoginError: function(state) {
			state.user.attemptLogin.requestLoading = false;
			state.user.attemptLogin.failedResponse = "Errore: richiesta scaduta";
		},
		userLoginFailed: function(state, message) {
			state.user.attemptLogin.requestLoading = false;
			state.user.attemptLogin.failedResponse = "Login fallito: " + message;
		},
		userLoginSuccess: function(state, payload) {
			state.user.attemptLogin.requestLoading = false;
			state.user.attemptLogin.successResponse = "Benvenuto";
			state.user.token = payload.data.token;
			localStorage.setItem("token", payload.data.token);
		}
	},
	actions: {
		checkToken: function() {
			if (this.state.user.token != "") {
				return true;
			}
			return false;
		},
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
		setToken(context, token) {
			context.commit("setToken", token);
		}
	}
});
