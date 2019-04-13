<template>
  <ul class="menu" id="scroll">
    <li v-for="item in itemList" :key="item.view">
      <v-icon :name="item.icon" :scale="item.scale"/>
      <p>{{item.title}}</p>
    </li>
  </ul>
</template>

<style scoped>
li {
  margin: 15px 0;
}
ul {
  list-style-type: none;
}
.menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin: 0;
  overflow: auto;
  padding: 0;
  position: fixed;
}
</style>


<script>
export default {
  name: "ItemBar",
  data: function() {
    return {
      itemList: [
        {
          icon: "hamburger",
          scale: 2,
          title: "Mangia",
          view: ""
        }
      ]
    };
  }
};
</script>

