<template>
  <div class="recipe">
    <div class="recipeDetails">
      <!-- <img :src="list.imageUrl" :alt="list.title" /> -->
      <div class="recipe-image" :style="{ 'background-image': 'url(' + list.imageUrl + ')' }" >

      </div>
      <h4>{{ list.title }}</h4>
      <p>{{ list.duration }}</p>
      <p>{{ list.difficulty }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  name: 'recipe'
}
</script>

<style scoped lang="scss">
.recipe {
  background-color: #f5f5f5;
  margin: 1em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  overflow: hidden; // to force border radius on children too

  img {
    display: block;
    width: 100%;
  }
}
</style>
