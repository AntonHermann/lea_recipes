<template>
  <div :class="{ offline: offline }">
    <router-view name="header"></router-view>

    <main class="mdc-top-app-bar--fixed-adjust">

      <transition :name="transitionName">
        <router-view></router-view>
      </transition>

    </main>

    <div class="snackbar todo">snackbar</div>
  </div>
</template>

<script>

export default {
  name: 'app',
  props: {
    title: {
      type: String,
      default: 'Rezeptsammlung'
    }
  },
  data() {
    return {
      transitionName: 'fade',
      offline: false
    }
  },
  computed: {
    isHome: function() {
      return this.$route.name === 'home'
    }
  },
  watch: {
    '$route'(to, from) {
      let toDepth = to.path.split('/').length
      let fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      console.log({
        'to': to,
        'from': from,
        'transitionName': this.transitionName
      })
    }
  },
  methods: {
    goBack: function() {
      this.$router.back()
    },
    updateOnlineStatus: function() {
      this.offline = !navigator.onLine
      let message = this.offline ? 'Keine Internetverbindung' : 'Es gibt wieder Netz!'
      this.$root.$emit('show-snackbar', {
        message: message,
        timeout: 5500
      })
    }
  },
  created() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
    this.updateOnlineStatus()

    // this.$router.beforeResolve((to, from, next) => {
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   console.log({
    //     'to': to,
    //     'from': from,
    //     'next': next,
    //     'transitionName': this.transitionName
    //   })
    //   next()
    // })
  }

}
</script>

<style lang="scss">
// FIXME: @import "@material/elevation/mdc-elevation";
// FIXME: @import "@material/top-app-bar/mdc-top-app-bar";

@import "theme";

html, body {
  height: 100%;
  background-color: #d1cedd;
  background-color: var(--mdc-theme-background, #d1cedd);
}
#app {
  height: 100%;
  max-height: 100%;
}
.menu-bar {
  z-index: 999;
  // FIXME: @include mdc-elevation(4);
}
.offline-bar {
  position: fixed;
  // top: 56px;
  // display: flex;
  top: calc(56px - 48px);
  display: none;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 998;
  // FIXME: @include mdc-top-app-bar-fill-color-accessible($theme-warning);
  // FIXME: @include mdc-elevation(4);
  // FIXME: @include mdc-typography(headline6);
  text-align: center;
  flex-direction: column;
  justify-content: center;
}
.offline {
  .menu-bar {
    // FIXME: @include mdc-elevation(2);
  }
  .offline-bar {
    top: 56px;
    display: flex;
  }
}


</style>
