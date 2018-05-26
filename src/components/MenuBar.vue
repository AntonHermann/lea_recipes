<template>
  <div :class="{'is-active': isDrawerActive}">
    <header class="menu-bar">
      <div class="burger" v-on:click="isDrawerActive = !isDrawerActive" role="button" aria-expanded="false" tabindex="0">
        <i class="material-icons">menu</i>
      </div>
      <div class="header">
        <span>Leas Rezeptbuch</span>
        <div class="search">
          <label>
            <i class="material-icons">search</i>
          </label>
        </div>
      </div>
    </header>
    <div class="menu-obfuscator" @click="isDrawerActive = false"></div>
    <div class="menu-drawer">
      <header>
        <span>Leas Rezeptbuch</span>
      </header>
      <nav>
        <router-link to="/" @click.native="isDrawerActive = false">Home</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu-bar',
  data: function () {
    return {
      isDrawerActive: false
    }
  }
}
</script>

<style scoped lang="scss">
// $transition-func: cubic-bezier(0.68, -0.55, 0.265, 1.55);
$transition-func: cubic-bezier(0.25, 0.8, 0.25, 1);
$transition-dur: .4s;

header.menu-bar {
  height: 56px;
  background-color: #f5f5f5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  .burger {
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    font-size: 26px;
    line-height: 56px;
    margin: 4px;
    text-align: center;
    cursor: pointer;
  }
  .header {
    padding: 0 16px 0 72px;
    height: 56px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 1;
    justify-content: space-between;
    align-self: stretch;
    box-sizing: border-box;

    span {
      display: block;
      position: relative;
      font-size: 20px;
      line-height: 1;
      letter-spacing: 0.02em;
      font-weight: 400;
      box-sizing: border-box;
    }
    .search {
      min-width: 32px;
      min-height: 32px;
      font-size: 16px;
      padding: 20px 0;
      label {
        display: inline-block;
        height: 32px;
        width: 32px;
        font-size: 24px;
        line-height: normal;
        text-align: center;
        vertical-align: middle;
        border-radius: 50%;
        i {
          vertical-align: middle;
        }
        &:hover {
          background-color: rgba(158,158,158,.2);
        }
      }
    }
  }

}
div.menu-obfuscator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  pointer-events: auto;
  visibility: hidden;
  transition-property: background-color;
  transition-duration: $transition-dur;
  transition-timing-function: $transition-func;
}
div.menu-drawer {
  width: 240px;
  height: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fafafa;
  transform: translateX(calc(-100% - 20px));
  transition-duration: $transition-dur;
  transition-timing-function: $transition-func;
  transition-property: transform;
  will-change: transform;

  // box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);
  header {
    padding-left: 16px;
    line-height: 56px;
    font-size: 20px;
  }
  nav {
    padding-left: 16px;

    a {
      // text-decoration: none;
      color: inherit;
    }
  }
}
.is-active {
  div.menu-drawer {
    transform: translateX(0);
  }
  div.menu-obfuscator {
    visibility: visible;
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
