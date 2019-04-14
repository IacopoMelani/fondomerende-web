import Vue from "vue";
import Vuex from "vuex";

// Modules
import action from "./modules/action";
import snack from "./modules/snack";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		action,
		snack,
		user
	},
	state: {},
	mutations: {},
	actions: {}
});
