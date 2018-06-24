<template>
  <header class="top-app-bar">
    <section class="align-start">
      <button
        v-if="icon"
        @click="iconClicked"
        class="material-icons"
      >
        {{ icon }}
      </button>
      <h1>{{ title }}</h1>
    </section>
    <section>
      <slot />
    </section>
  </header>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    event: {
      type: String,
      default() {
        return 'nav'
      }
    },
    eventTarget: {
      type: Object,
      required: false
    },
    icon: String
  },
  methods: {
    iconClicked() {
      if (this.event) {
        let target = this.eventTarget || this.$root
        target.$emit(this.event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@material/elevation/mdc-elevation";

.top-app-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #212121;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  height: 64px;
  @include mdc-elevation(4);

  button {
    display: block;
    border: none;
    outline: none;
    height: 48px;
    width: 48px;
    padding: 12px;
    background-color: transparent;
    fill: currentColor;
    color: currentColor;
    cursor: pointer;
    position: relative;
    will-change: transform, opacity;

    &::before {
      content: " ";
      pointer-events: none;
      border-radius: 50%;
      background-color: #ffffff;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      transition: opacity 15ms linear;
      opacity: 0;
    }
    &:hover::before {
      opacity: .08;
    }
  }

  section {
    // flex properties affecting the children
    display: flex;
    flex-direction: row;
    align-items: center;

    // it's own position/size in the parent flex
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: flex-end;

    padding: 8px 12px;

    &.align-start {
      justify-content: flex-start;

      h1 {
        font-size: 1.25rem;
        line-height: 2rem;
        font-weight: 500;
        letter-spacing: 0.125em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding-left: 20px;
        margin: 0;
      }
    }
  }
}
</style>
