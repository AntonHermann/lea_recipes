<template>
  <!-- <div> -->
    <mdc-top-app-bar fixed v-if="isHome" :title="title" class="menu-bar" event="toggle-drawer"></mdc-top-app-bar>
    <mdc-top-app-bar fixed v-else        :title="title" class="menu-bar" @click="goBack" icon="arrow_back"></mdc-top-app-bar>
  <!-- </div> -->
</template>

<script>
export default {
  computed: {
    isHome: function() {
      return this.$route.name === 'home'
    }
  },
  props: {
    title: {
      type: String,
      default() { return 'Rezeptsammlung' }
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@material/elevation/mdc-elevation";

  .menu-bar {
    z-index: 999;
  //   @include mdc-elevation(4);
  }
</style>
