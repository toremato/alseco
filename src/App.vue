<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("testFirebase").then(res => {
      console.log("Dispatch from app: ", res);
    });
    // this.$store.dispatch("addDocument").then(res => {
    //   console.log("Tried to Create doc: ", res);
    // });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 1000px;
  margin: auto;
  padding: 100px 50px;
  // background-color: lighten($color: lightcyan, $amount: 3);
  background: #ccc;
}
</style>
