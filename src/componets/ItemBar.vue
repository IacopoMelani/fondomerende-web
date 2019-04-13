<template>
  <ul class="menu">
    <li v-for="item in itemList" :key="item">
      <v-icon name="hamburger" title="Mangia" scale="2"/>
    </li>
  </ul>
</template>

<style>
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
          icon: "android",
          scale: 2,
          view: ""
        }
      ]
    };
  }
};
</script>

