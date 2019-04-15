<template>
  <b-container fluid>
    <b-row>
      <b-col class="centered" cols="12">
        <b-card-group deck>
          <b-card :header="username" header-tag="header">
            <ul>
              <li>utente: {{userFund}}€</li>
              <li>fondo: {{fund}}€</li>
            </ul>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template> 

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
.centered {
  justify-content: center;
  text-align: left;
}
</style>


<script>
export default {
  name: "UserFundInfo",
  props: ["username", "fund", "userFund"]
};
</script>
