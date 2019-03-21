<template>
  <b-container fluid>
    <b-row>
      <b-col class="centered" cols="6">
        <b-row>
          <b-col cols="12">ciao</b-col>
        </b-row>
      </b-col>
      <b-col class="centered" cols="1">
        <ul class="menu">
          <li>
            <v-icon name="sync" scale="2" spin/>
          </li>
          <li>
            <v-icon name="comment" scale="2"/>
          </li>
          <li>
            <v-icon name="code-branch" scale="2"/>
          </li>
        </ul>
      </b-col>
      <b-col class="centered" cols="5">
        <b-row>
          <b-col class="last-action-label" cols="12">ultime azioni</b-col>
          <b-col cols="12">
            <LastActions></LastActions>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
li {
  margin: 15px 0;
}
ul {
  list-style-type: none;
}
.centered {
  justify-content: center;
}
.last-action-label {
  justify-content: center;
}
.menu {
  margin: 0;
  padding: 0;
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
<script>
import LastActions from "./viewComponents/lastActions/LastActions";
export default {
  name: "home",
  components: {
    LastActions
  },
  mounted: function() {
    this.$store.dispatch("getLastActions");
    setInterval(() => {
      this.$store.dispatch("getLastActions");
    }, 5000);
  }
};
</script>