<template>
  <div id="app">
    <menu-bar></menu-bar>
    <main>
      <!-- <img src="./assets/logo.png" alt="Vue.js PWA"> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar'

export default {
  name: 'app',
  components: { MenuBar }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  margin: 0;
  background-color: #e2e2e2;
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  color: #757575;
  line-height: 20px;
  height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
}

main {
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
