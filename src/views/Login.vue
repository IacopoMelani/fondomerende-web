<template>
  <div>
    <b-row>
      <b-col cols="8">
        <login-form class="form"></login-form>
      </b-col>
      <b-col cols="4">
        <img class="logo" alt="Vue logo" src="../assets/fridge.svg">
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.logo {
  height: 512px;
  width: 512px;
}
.form {
  justify-content: center;
  width: 100%;
}
</style>

<script>
import LoginForm from "./viewComponents/Login/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>

