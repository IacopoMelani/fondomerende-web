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