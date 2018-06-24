<template>
  <!-- <mdc-top-app-bar fixed title="Rezeptsammlung" class="menu-bar" event="toggle-drawer" /> -->
  <top-app-bar title="Rezeptsammlung" icon="menu">
    <button class="material-icons">
      backup
    </button>
  </top-app-bar>
</template>

<script>
import TopAppBar from '../TopAppBar.vue'

export default {
  components: {
    TopAppBar
  }
}
</script>

<style lang="scss" scoped>
@import "../../theme.scss";

.menu-bar {
  z-index: 999;
  // FIXME: @include mdc-elevation(4);
}
</style>
