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
          <UserFundInfo
            class="user-info-centered"
            :username="this.$store.state.user.username"
            :fund="this.$store.state.snack.fund"
            :userFund="this.$store.state.user.fund"
          ></UserFundInfo>
          <b-col cols="12">
            <LastActions class="user-info-centered"></LastActions>
          </b-col>
          <b-col cols="12">
            <SnackList class="user-info-centered"></SnackList>
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
  height: 95vh;
  justify-content: center;
  overflow: auto;
}
.user-info-centered {
  align-items: center;
  display: flex;
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
import LastActions from "../componets/LastActions";
import SnackList from "../componets/SnackList";
import UserFundInfo from "../componets/UserFundInfo";
export default {
  name: "home",
  components: {
    Actions,
    ItemBar,
    LastActions,
    SnackList,
    UserFundInfo
  },
  data: function() {
    return {
      getMainViewDataId: undefined,
      getToEatAndUserFundId: undefined
    };
  },
  mounted: function() {
    this.$store.dispatch("user/getUserData");
    this.$store.dispatch("action/getMainViewData");
    this.$store.dispatch("snack/getToEatAndUserFund");

    this.getMainViewDataId = setInterval(() => {
      this.$store.dispatch("action/getMainViewData");
    }, 5000);

    this.getToEatAndUserFundId = setInterval(() => {
      this.$store.dispatch("snack/getToEatAndUserFund");
    }, 5000);
  },
  destroyed: function() {
    clearInterval(this.getMainViewDataId);
  }
};
</script>