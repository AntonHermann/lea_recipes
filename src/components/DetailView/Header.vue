<template>
  <mdc-top-app-bar fixed title="Rezept" class="menu-bar" @click="goBack" icon="arrow_back"></mdc-top-app-bar>
</template>

<script>

export default {
  methods: {
    goBack: function() {
      this.$router.go(-1)
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
