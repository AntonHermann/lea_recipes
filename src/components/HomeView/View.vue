<template>
<div class="page-layout-container">
  <page-drawer toggle-on="nav">
    <ul class="filter-list">
      <h2 class="drawer-header">
        Filter auswählen
      </h2>
      <drawer-filter title="Zeitaufwand" icon="timelapse" v-model="filters.duration.active">
        <!-- <mdc-textfield v-model="filters.duration.value" label="abc" type="number" /> -->
        <input v-model="filters.duration.value" placeholder="abc" type="number" />
      </drawer-filter>
      <drawer-filter title="Schwierigkeit" icon="fitness_center" v-model="filters.difficulty.active">
        <!-- <div class="filter-list"> -->
        <div>
          <!-- <mdc-checkbox v-model="filters.difficulty.value.easy" label="simpel" />
          <mdc-checkbox v-model="filters.difficulty.value.normal" label="normal" />
          <mdc-checkbox v-model="filters.difficulty.value.hard" label="schwer" /> -->
          <input type="checkbox" v-model="filters.difficulty.value.easy" />
          <input type="checkbox" v-model="filters.difficulty.value.normal" />
          <input type="checkbox" v-model="filters.difficulty.value.hard" />
        </div>
      </drawer-filter>
      <drawer-filter title="Nur Favoriten" icon="star" v-model="filters.fav.active">
      </drawer-filter>
    </ul>
  </page-drawer>

  <section class="recipe-overview">
    <div class="mdc-layout-grid">
    <transition-group tag="div" name="list" class="recipes mdc-layout-grid__inner">
      <!-- <mdc-layout-cell -->
      <div class="layout-cell"
        v-for="list in lists"
        :key="list.imageUrl"
      >
      <!-- <mdc-card -->
      <div
        class="recipe card"
      >
        <!-- <mdc-card-primary-action :to="'/details/' + list.id"> -->
        <div class="primary-action">

          <!-- <mdc-card-media :src="list.imageUrl"></mdc-card-media> -->
          <div class="card-media">{{ list.imageUrl }}</div>

          <!-- <mdc-title class="recipe-title" v-html="formatTitle(list.title)"></mdc-title> -->
          <div class="recipe-title" v-html="formatTitle(list.title)"></div>

        <!-- </mdc-card-primary-action> -->
        </div>
        <div class="meta" v-responsive="{ small: el => el.width <= 450 }">
          <span class="meta-item meta-item-duration">
            <i class="material-icons">timelapse</i>
            <span class="meta-text">{{ list.duration }}min</span>
          </span>
          <span class="meta-item meta-item-difficulty">
            <i class="material-icons">fitness_center</i>
            <span class="meta-text">{{ list.difficulty }}</span>
          </span>
          <span class="meta-item meta-item-difficulty">
            <i class="material-icons">access_time</i>
            <span class="meta-text">{{ list.createtAt | formatDate }}</span>
          </span>
          <span class="meta-item meta-item-fav">
            <fav-button :id="list.id" :status="list.fav"></fav-button>
          </span>
        </div>
      <!-- </mdc-card> -->
      </div>
      <!-- </mdc-layout-cell> -->
      </div>
    </transition-group>
    </div>
    <!-- <mdc-fab icon="add" fixed to="/post"></mdc-fab> -->
    <div class="fab">add</div>
  </section>
</div>
</template>

<script>
import { db } from '../../main'
import moment from 'moment'
import FavButton from '../FavButton.vue'
import DrawerFilter from '../DrawerFilter.vue'
import { ResponsiveDirective } from 'vue-responsive-components'
import PageDrawer from '../PageDrawer.vue'

export default {
  methods: {
    displayDetails(id) {
      this.$router.push({
        name: 'detail',
        params: { id: id }
      })
    },
    formatTitle(t) {
      let split = t.split(' ')
      let len = split.length
      let halfLen = Math.ceil(len / 2)
      let leftSide = split.slice(0, halfLen).join(' ')
      let rightSide = split.slice(halfLen, len).join(' ')
      console.log(['formatTitle', leftSide, rightSide])
      return '<span>' + leftSide + '</span> <span>' + rightSide + '</span>'
    }
  },
  data() {
    return {
      lists_raw: [],
      filters: {
        'duration': {
          active: false,
          value: '30'
        },
        'difficulty': {
          active: false,
          value: {
            easy: true,
            normal: true,
            hard: true
          }
        },
        'fav': {
          active: false,
          value: true
        }
      }
    }
  },
  computed: {
    active_filters() {
      let fi = this.filters
      var af = {}
      for (const f in fi) {
        let cur = fi[f]
        if (cur.active) {
          af[f] = (cur.value)
        }
      }
      return af
    },
    lists() {
      let fi = this.filters
      let filterFunc = (e) => {
        if (fi.duration.active) {
          let maxDur = parseInt(fi.duration.value)
          console.log('maxDur', maxDur, e.duration)
          if (maxDur && maxDur < e.duration) { return false }
        }
        if (fi.difficulty.active) {
          let v = fi.difficulty.value
          if (v.easy || v.normal || v.hard) {
            // at least one has to be true
            if (v[e.difficulty] === false) { return false }
          }
        }
        if (fi.fav.active) {
          if (!e.fav) { return false }
        }
        return true
      }
      return this.lists_raw.filter(filterFunc)
    }
  },
  firestore() {
    return {
      lists_raw: db.collection('recipes').orderBy('createtAt')
    }
  },
  filters: {
    formatDate(d) {
      // d is a firestore timestamp now
      let date = d.toDate()
      return moment(date).locale('de').fromNow()
    // },
    // formatTitle(t) {
    //   let split = t.split(' ')
    //   let len = split.length
    //   let halfLen = Math.ceil(len / 2)
    //   let leftSide = split.slice(0, halfLen).join(' ')
    //   let rightSide = split.slice(halfLen, len).join(' ')
    //   console.log(['formatTitle', leftSide, rightSide])
    //   return '<span>' + leftSide + '</span><span>' + rightSide + '</span>'
    }
  },
  components: {
    FavButton,
    DrawerFilter,
    PageDrawer
  },
  directives: {
    responsive: ResponsiveDirective
  }
}
</script>

<style lang="scss">
@import "../../theme.scss";
// FIXME: @import "@material/chips/mdc-chips";
// FIXME: @import "@material/drawer/mdc-drawer";

.page-layout-container {
  display: flex;
  flex-direction: row;

  // .page-drawer {
  // FIXME: @include mdc-drawer-fill-color-accessible($mdc-theme-surface);
  // FIXME: @include mdc-rtl-reflexive-box(border, right, 1px solid #e4e4e4);
  // FIXME: @include mdc-rtl-reflexive-position(left, 0);

  .filter-list {
    padding: 0;
    margin: 0;
  }
}


.recipe-overview {
  flex-grow: 1;

  .recipes {
    // padding: 16px;
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // justify-content: center;

    .recipe {
      margin-bottom: 16px;

      &.list-enter-active, &.list-leave-active {
        transition: all 0.5s;
      }
      &.list-enter, &.list-leave-to {
        opacity: 0;
        transform: translateX(30px);
      }

      &>a.mdc-card-primary-action {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }
      .mdc-card-header {
        padding: 16px;
      }
      .recipe-title {
        margin: 16px;
        span {
          white-space: nowrap;
        }
      }

      .meta {
        font-size: 1rem;
        line-height: 1.5rem;
        color: rgba(0, 0, 0, 0.87);
        color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));

        margin: 4px;
        padding: 8px 16px;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        &.small {
          flex-direction: row;
        }

        .meta-item {
          white-space: nowrap;
          margin-right: 32px;
          &:last-of-type {
            margin-right: 0;
          }

          &>.material-icons {
            width: 20px;
            height: 20px;
            font-size: 20px;
            vertical-align: middle;
            display: inline-block;
            margin: -4px 4px -4px -4px;
            white-space: nowrap;
          }
          .meta-text {
            line-height: 17px;
            white-space: nowrap;
          }

          &.meta-item-fav .mdc-icon-toggle {
            padding: 0;
            height: 24px;
            width: 24px;
            --mdc-ripple-fg-scale: 3 !important;
          }
        }
      }
      .mdc-card__media-content {
        display: flex;
        flex-direction: column-reverse;
      }
    }
  }
}
</style>
