<template>
    <!-- <mdc-card class="content"> -->
    <div class="content card">
      <!-- <mdc-card-media :src="cur.imageUrl"> -->
      <div class="card-media">
        <!-- <mdc-card-actions class="media-icons">
          <mdc-card-action-icons>
            <mdc-icon-toggle
              class="media-icon-fav"
              v-model="cur.fav"
              v-on:input="toggleFav"
              toggle-on="star"
              toggle-off="star_border">
            </mdc-icon-toggle>
          </mdc-card-action-icons>
        </mdc-card-actions> -->
      <!-- </mdc-card-media> -->
      </div>
      <!-- <mdc-card-header :title="cur.title">
      </mdc-card-header> -->
      <h1>{{ cur.title }}</h1>
      <!-- <mdc-card-text>
        <ul>
          <li v-for="ingredient in cur.ingredients" :key="ingredient.name">
            {{ ingredient.amount }} {{ ingredient.unit }} : {{ ingredient.name }}
          </li>
        </ul>
      </mdc-card-text>
      <mdc-card-text>
        {{ cur.instructions }}
      </mdc-card-text> -->
    <!-- </mdc-card> -->
    </div>
</template>

<script>
import { db } from '../../main'

export default {
  data: function() {
    return {
      cur: {
        imageUrl: '',
        fav: false,
        title: 'Lade Rezept',
        ingredients: [],
        instructions: ''
      }
    }
  },
  firestore() {
    return {
      cur: db.collection('recipes').doc(this.$route.params.id)
    }
  },
  methods: {
    toggleFav: function(event) {
      db.collection('recipes')
        .doc(this.cur.id)
        .update({fav: event})
    }
  }
}
</script>
<style lang="scss">
  .content .mdc-card__media-content {
    display: flex;
    flex-direction: column-reverse;
    .mdc-card-action-icons {
      .mdc-icon-toggle {
        margin-bottom: -9px;
        background-color: rgba(255, 255, 255, 0.7);
        background-color: white;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        &::before, &::after {
          border-radius: 0;
        }
      }
      .media-icon-fav {
        color: orange;
      }
    }
  }
</style>
