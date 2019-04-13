<template>
  <b-container fluid>
    <b-row>
      <b-col class="centered actions" cols="5">
        <b-row>
          <b-col cols="12">ciao</b-col>
        </b-row>
      </b-col>
      <b-col class="centered itembar" cols="2">
        <ItemBar></ItemBar>
      </b-col>
      <b-col class="centered info" cols="5">
        <b-row>
          <b-col cols="12">
            <LastActions></LastActions>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.actions {
  background: linear-gradient(to right, whitesmoke, azure);
}
.centered {
  justify-content: center;
}
.info {
  background: linear-gradient(to right, azure, whitesmoke);
}
.itembar {
  width: 50% !important;
  background-color: azure;
}
.last-action-label {
  justify-content: center;
}
</style>

<script>
import ItemBar from "../componets/ItemBar";
import LastActions from "./viewComponents/lastActions/LastActions";
export default {
  name: "home",
  components: {
    ItemBar,
    LastActions
  },
  data: function() {
    return {
      getLastActionsId: undefined
    };
  },
  mounted: function() {
    this.$store.dispatch("getLastActions");
    this.getLastActionsId = setInterval(() => {
      this.$store.dispatch("getLastActions");
    }, 5000);
  },
  destroyed: function() {
    clearInterval(this.getLastActionsId);
  }
};
</script>