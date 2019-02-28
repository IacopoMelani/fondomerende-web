import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// VUE-AXIOS
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// BOOTSTRAP-VUE
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// VUE-AWESOME
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);

axios.defaults.withCredentials = true;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
