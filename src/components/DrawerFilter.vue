<template>
  <li class="recipe-filter" @click="toggleDetails">
    <div class="recipe-filter--top-row">
      <i class="material-icons mdc-list-item__graphic" aria-hidden="true">
        {{ icon }}
      </i>
      <div class="recipe-filter--title">
        {{ title }}
      </div>
      <!-- <mdc-switch v-model="active" /> -->
      <div>SWITCH</div>
    </div>
    <div class="recipe-filter--details" v-show-slide="showDetails" v-if="$slots.default">
      <slot />
    </div>
  </li>
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
      showDetails: this.expanded
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recipe-filter {
  height: auto;
  display: flex;
  flex-direction: column;

  .recipe-filter--top-row {
    display: flex;
    flex-direction: row;
    height: 48px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 0 16px;

    i.material-icons {
      margin-right: 16px;
    }
    .recipe-filter--title {
      flex-grow: 1;
    }
  }
  .recipe-filter--details {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
  }
}
</style>
