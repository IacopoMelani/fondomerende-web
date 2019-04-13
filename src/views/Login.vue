<template>
  <b-container class="content" fluid>
    <b-row>
      <b-col cols="12 logo-container">
        <div class="logo-backgroud">
          <img class="logo" alt="Vue logo" src="../assets/fridge.svg">
        </div>
      </b-col>
      <b-col cols="12 login-form">
        <login-form v-on:commit-login="login($event)"></login-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.content {
  margin-top: 60px;
}
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
.logo-backgroud {
  align-items: center;
  background: linear-gradient(azure, whitesmoke);
  border-radius: 50%;
  display: flex;
  height: 450px;
  justify-content: center;
  width: 450px;
}
.logo-container {
  align-items: center;
  justify-content: center;
}
</style>

<script>
import LoginForm from "./viewComponents/Login/LoginForm";

import router from "./../router.js";

export default {
  name: "Login",
  components: {
    LoginForm
  },
  data: function() {
    return {
      errorLoginMessage: ""
    };
  },
  methods: {
    login: function(payload) {
      this.$store.dispatch("login", payload).then(() => {
        this.$router.push({ name: "home" });
      });
    }
  },
  mounted() {
    this.$store.dispatch("checkToken").then(result => {
      if (result) {
        router.push({ name: "home" });
      }
    });
  }
};
</script>

