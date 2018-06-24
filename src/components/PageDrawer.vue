<template>
  <aside
    class="drawer-container"
    :class="{ open: open }"
    @click="_containerClicked"
  >
    <div class="drawer" ref="drawer">
      <div class="content">
        <slot />
      </div>
    </div>
  </aside>
</template>

<script>
// TODO: add proper touch support
export default {
  props: {
    toggleOn: String,
    toggleOnSource: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      open: true
    }
  },
  mounted() {
    if (this.toggleOn) {
      this.toggleOnEventSource = this.toggleOnSource || this.$root
      this.toggleOnEventSource.$on(this.toggleOn, this.toggle)
    }
  },
  beforeDestroy() {
    if (this.toggleOnEventSource) {
      this.toggleOnEventSource.$off(this.toggleOn, this.toggle)
    }
  },
  methods: {
    toggle() {
      if (this.open) {
        this.closeDrawer()
      } else {
        this.openDrawer()
      }
    },
    closeDrawer() {
      this.open = false
      this.$refs.drawer.setAttribute('tabindex', -1)
      document.removeEventListener('keydown', this._docKeydown)
    },
    openDrawer() {
      this.open = true
      let d = this.$refs.drawer
      d.setAttribute('tabindex', 0)
      d.focus()
      document.addEventListener('keydown', this._docKeydown)
    },
    _containerClicked: function(event) {
      if (event.target === this.$el) {
        this.closeDrawer()
      }
    },
    _docKeydown: function(event) {
      if (!event.key) { return }
      if (event.key === 'Escape' || event.keyCode === 27) {
        this.closeDrawer()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@material/elevation/mdc-elevation";
@import "@material/animation/functions";

.drawer-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
  pointer-events: none;


  &::before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    content: "";
    will-change: opacity;
    background-color: rgba(0, 0, 0, 0.6);
    transition: mdc-animation-enter(opacity, .3s);
  }

  .drawer {
    position: absolute;
    right: auto;
    left: 0;
    top: 0;
    height: 100%;
    width: calc(100% - 56px);
    max-width: 280px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    @include mdc-elevation(16);

    // normally the drawer is outside the screen
    transform: translateX(-107%);
    transform: translateX(calc(-100% - 20px));
    will-change: transform;
    transition: mdc-animation-standard(transform, 200ms);

    @media (min-width: 600px) {
      width: calc(100% - 64px);
      max-width: 320px;
    }

    .content {
      flex-grow: 1;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-y;
    }
  }

  &.open {
    pointer-events: auto;

    &::before {
      opacity: 1;
    }

    .drawer {
      transform: none;
      transition: mdc-animation-standard(transform, 250ms);
    }
  }
}
</style>
