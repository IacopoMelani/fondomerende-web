import Vue from "vue";
import Vuex from "vuex";

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
			token: ""
		}
	},
	mutations: {
		changeLoginRequestLoading: function(state) {
			state.user.attemptLogin.requestLoading = !state.user.attemptLogin.requestLoading;
		}
	},
	actions: {
		login: function(context, payload) {
			if (this.state.user.attemptLogin.requestLoading) {
				return;
			}
			this.state.user.attemptLogin.requestLoading = true;
			this.axios
				.post("/login", {})
				.then(result => {
					console.log(result);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
});
