  <template>
  <b-container fluid>
    <b-row>
      <b-col class="snacks-label" cols="12">Lista snacks</b-col>
      <b-col class="snacks-scrollable" cols="12">
        <b-list-group>
          <b-list-group-item
            v-for="snack in snacks"
            :key="snack['price-per-snack']"
            :variant="getCasualVariant()"
          >{{snack["friendly-name"]}} - qta {{snack.quantity}} - {{snack["price-per-snack"]}}€</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>


<style scoped>
.snacks-scrollable {
  justify-content: center;
  padding: 0;
}
.snacks-label {
  justify-content: center;
}
</style>

<script>
export default {
  name: "SnacksList",
  computed: {
    snacks() {
      return this.$store.state.snack.snacksList;
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


