<template>
  <mdc-top-app-bar fixed title="Rezeptsammlung" class="menu-bar" event="toggle-drawer" />
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
@import "../../theme.scss";

.menu-bar {
  z-index: 999;
  @include mdc-elevation(4);
}
</style>
