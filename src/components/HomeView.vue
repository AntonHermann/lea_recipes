<template>
  <div>
    <div class="wrapper">
      <div class="books">
        <recipe v-for="list in lists" :key="list.imageUrl" :list="list"></recipe>
      </div>
    </div>
  </div>
</template>

<script>
import data from '../db.json'
import Recipe from './Recipe'

export default {
  data () {
    return {
      lists: []
    }
  },
  created () {
    this.lists = data
  },
  components: { Recipe }
}
</script>

<style scoped>
</style>
