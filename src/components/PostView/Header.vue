<template>
  <mdc-top-app-bar fixed title="Neues Rezept" class="menu-bar" @click="cancel" icon="close"></mdc-top-app-bar>
</template>

<script>

export default {
  methods: {
    cancel: function() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../theme.scss";

.menu-bar {
  z-index: 999;
  @include mdc-elevation(4);
}
</style>
