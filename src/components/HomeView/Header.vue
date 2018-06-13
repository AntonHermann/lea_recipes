<template>
  <div>
    <mdc-top-app-bar fixed title="Rezeptsammlung" class="menu-bar" event="toggle-drawer">
      <mdc-top-app-bar-action icon="ballot"></mdc-top-app-bar-action>
    </mdc-top-app-bar>
    <!-- <mdc-drawer toggle-on="toggle-drawer" toolbar-spacer class="page-drawer">
      <mdc-drawer-list>
        <mdc-drawer-item start-icon="home"     to="/"    >Home</mdc-drawer-item>
        <mdc-drawer-item start-icon="note_add" to="/post">Neues Rezept</mdc-drawer-item>
      </mdc-drawer-list>
    </mdc-drawer> -->
  </div>
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
// .page-drawer {

// }
</style>
