<template>
  <b-container fluid>
    <b-row>
      <b-col class="centered actions" cols="5">
        <Actions></Actions>
      </b-col>
      <b-col class="centered itembar" cols="2">
        <ItemBar></ItemBar>
      </b-col>
      <b-col class="centered info" cols="5">
        <b-row>
          <b-col class="username-label" cols="12">{{this.$store.state.user.username}}</b-col>
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
  background: linear-gradient(to right, white, azure);
  justify-content: center;
}
white .centered {
  justify-content: center;
}
.info {
  background: linear-gradient(to right, azure, white);
  justify-content: center;
}
.itembar {
  background-color: azure;
  justify-content: center;
}
.last-action-label {
  justify-content: center;
}
.username-label {
  justify-content: center;
  margin-top: 10px;
}
</style>

<script>
import Actions from "./viewComponents/Actions/Actions";
import ItemBar from "../componets/ItemBar";
import LastActions from "./viewComponents/lastActions/LastActions";
export default {
  name: "home",
  components: {
    Actions,
    ItemBar,
    LastActions
  },
  data: function() {
    return {
      getLastActionsId: undefined
    };
  },
  mounted: function() {
    this.$store.dispatch("action/getMainViewData");
    this.getLastActionsId = setInterval(() => {
      this.$store.dispatch("action/getMainViewData");
    }, 5000);
  },
  destroyed: function() {
    clearInterval(this.getLastActionsId);
  }
};
</script>