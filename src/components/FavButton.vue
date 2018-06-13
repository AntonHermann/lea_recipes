<template>
  <mdc-icon-toggle
    class="media-icon-fav"
    :value="status"
    v-on:input="toggleFav"
    toggle-on="star"
    toggle-off="star_border">
  </mdc-icon-toggle>
</template>

<script>
import { db } from '../main'

export default {
  props: {
    id: String,
    status: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    toggleFav: function(event) {
      db.collection('recipes')
        .doc(this.id)
        .update({fav: event})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
