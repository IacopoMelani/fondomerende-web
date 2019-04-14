    <template>
  <b-container fluid>
    <b-row>
      <b-col class="last-action-label" cols="12">ultime azioni</b-col>
      <b-col class="actions-scrollable" cols="12">
        <b-list-group>
          <b-list-group-item
            v-for="action in actions"
            :key="action"
            :variant="getCasualVariant()"
          >{{action}}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>


<style scoped>
.actions-scrollable {
  justify-content: center;
  padding: 0;
}
.last-action-label {
  justify-content: center;
}
</style>

<script>
export default {
  name: "LastAction",
  computed: {
    actions() {
      return this.$store.state.action.lastActionList;
    }
  },
  data: function() {
    return {
      variant: ["primary", "secondary", "success", "danger", "warning", "info"]
    };
  },
  methods: {
    getCasualVariant: function() {
      let min = 0;
      let max = Math.floor(this.variant.length);
      return this.variant[Math.floor(Math.random() * (max - min)) + min];
    }
  }
};
</script>