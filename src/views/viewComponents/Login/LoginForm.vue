<template>
  <b-form inline>
    <b-input class="mb-2 mr-sm-2 mb-sm-0" v-model="username" placeholder="Big Boss"/>

    <b-input
      class="mb-2 mr-sm-2 mb-sm-0"
      type="password"
      v-model="password"
      placeholder="Password"
    />

    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" v-model="remember">Remember me</b-form-checkbox>

    <b-button variant="primary">Save</b-button>
  </b-form>
</template>

<style scoped>
</style>

<script>
export default {
  name: "LoginForm",
  data: function() {
    return {
      username: "",
      password: "",
      remember: false
    };
  }
};
</script>
