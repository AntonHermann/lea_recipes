<template>
  <!-- <mdc-top-app-bar
    fixed
    title="Neues Rezept"
    class="menu-bar"
    @click="cancel"
    icon="close"
  >
    <mdc-top-app-bar-action event="confirm-changes" icon="done"></mdc-top-app-bar-action>
  </mdc-top-app-bar> -->
  <div class="top-app-bar">
    Neues Rezept
  </div>
</template>

<script>

export default {
  methods: {
    cancel: function() {
      console.log('cancel')
      this.$router.back()
    }
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
