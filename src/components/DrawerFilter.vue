<template>
  <mdc-drawer-item class="recipe-filter2" @click="toggleDetails">
    <div class="recipe-filter--top-row">
      <i class="material-icons mdc-list-item__graphic" aria-hidden="true">
        {{ icon }}
      </i>
      <div class="recipe-filter--title">
        {{ title }}
      </div>
      <mdc-switch v-model="active" />
    </div>
    <div class="recipe-filter--details" v-if="$slots.default" v-show="showDetails">
      <slot />
    </div>
  </mdc-drawer-item>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    value: Boolean,
    expanded: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showDetails: 
    }
  },
  computed: {
    active: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    toggleDetails: function(event) {
      let tagname = event.target.tagName
      let blocked = ['INPUT', 'LABEL', 'SPAN']
      if (!blocked.includes(tagname)) {
        this.showDetails = !this.showDetails
      } else {
        event.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .recipe-filter--details {
    border-bottom: 1px solid rgba(0, 0, 0, .12);
  }
</style>
