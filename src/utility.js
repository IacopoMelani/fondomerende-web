import store from "./store";

export default {
	checkTokenIsExpired: function(message, code) {
		if (message == this.messagetokenExpired && code == this.codeTokenExpired) {
			store.commit("setToken", ".");
			return true;
		}
		return false;
	},
	codeTokenExpired: 401,

	messagetokenExpired: "Invalid user token: missing or expired."
};
