<template>
  <b-row>
    <b-col cols="12" class="center">
      <b-input class="mb-2 mr-sm-2 mb-sm-0" size="lg" v-model="username" placeholder="Big Boss"/>
    </b-col>
    <b-col cols="12" class="center">
      <b-input
        class="mb-2 mr-sm-2 mb-sm-0"
        type="password"
        size="lg"
        v-model="password"
        placeholder="Password"
      />
    </b-col>
    <b-col cols="12" class="vertical center">
      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" size="lg" v-model="remember">Remember me</b-form-checkbox>
    </b-col>
    <b-col cols="12" class="center">
      <b-button variant="primary" size="lg" @click="commitLogin()">Login fucker</b-button>
    </b-col>
  </b-row>
</template>

<style scoped>
.vertical {
  align-items: center;
}
.center {
  justify-content: center;
  margin-top: 10px;
}
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
  },
  methods: {
    commitLogin: function() {
      this.$emit("commit-login", {
        username: this.username,
        password: this.password,
        remember: this.remember
      });
    }
  }
};
</script>
