<template>
  <b-row>
    <b-col cols="12 logo-container">
      <img class="logo" alt="Vue logo" src="../assets/fridge.svg">
    </b-col>
    <b-col cols="12 login-form">
      <login-form v-on:commit-login="login($event)"></login-form>
    </b-col>
  </b-row>
</template>

<style scoped>
.login-form {
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}
.logo {
  height: 312px;
  width: 312px;
}
.logo-container {
  align-items: center;
  background-color: antiquewhite;
  height: 500px;
  justify-content: center;
}
</style>

<script>
import LoginForm from "./viewComponents/Login/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm
  },
  methods: {
    login: function(payload) {
      this.$store.dispatch("login", payload);
    }
  }
};
</script>

