<template>
  <div id="app">
    <router-view id="app-content" class="flex m-auto flex-col" />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getRecords");
  }
};
</script>

<style lang="scss">
@import "assets/styles/main.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4a5568;
  min-height: 100vh;
  width: 100vw;
  margin: auto;
  padding: 50px;
  background: $bg-app;
}

#app-content {
  max-width: 1200px;
}
</style>
