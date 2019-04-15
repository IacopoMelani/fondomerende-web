<template>
  <ul
    class="menu"
    id="scroll"
    :class="{jcenter: itemList.length <= 9, 'jspace-between': itemList.length > 9}"
  >
    <li v-for="item in itemList" :key="item.view">
      <v-icon class="icon" :name="item.icon" :scale="item.scale"/>
      <p class="icon">{{item.title}}</p>
    </li>
  </ul>
</template>

<style scoped>
li {
  margin: 10px 20px;
}
ul {
  list-style-type: none;
}
.icon {
  color: whitesmoke;
}
.jcenter {
  justify-content: center;
}

.jspace-between {
  justify-content: space-between;
}
.menu {
  display: flex;
  flex-direction: row;
  margin: 0;
  overflow: auto;
  padding: 0;
  width: 95vw;
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

