<template>
<div class="page-layout-container">
  <mdc-drawer toggle-on="toggle-drawer" class="page-drawer" persistent>
    <mdc-drawer-list>
      <drawer-filter title="Zeitaufwand" icon="timelapse" v-model="filters.duration.active">
        <mdc-textfield v-model="filters.duration.value" label="abc" type="number" />
      </drawer-filter>
      <drawer-filter title="Schwierigkeit" icon="fitness_center" v-model="filters.difficulty.active">
        <div class="filter-list">
          <mdc-checkbox v-model="filters.difficulty.value.easy" label="simpel" />
          <mdc-checkbox v-model="filters.difficulty.value.normal" label="normal" />
          <mdc-checkbox v-model="filters.difficulty.value.hard" label="schwer" />
        </div>
      </drawer-filter>
      <drawer-filter title="Nur Favoriten" icon="star" v-model="filters.fav.active">
      </drawer-filter>
    </mdc-drawer-list>
  </mdc-drawer>
  <section class="recipe-overview">
    <h2>{{ active_filters }}</h2>
    <h2>{{ filters.difficulty.value2 }}</h2>
    <div class="recipes">
      <mdc-card class="recipe" v-for="list in lists" :key="list.imageUrl">
        <mdc-card-primary-action :to="'/details/' + list.id">

          <mdc-card-media :src="list.imageUrl"></mdc-card-media>

          <mdc-card-header :title="list.title"></mdc-card-header>

          <mdc-list-divider></mdc-list-divider>

        </mdc-card-primary-action>
        <div class="meta">
          <span class="meta-item meta-item-duration">
            <i class="material-icons">timelapse</i>
            <span class="meta-text">{{ list.duration }}</span>
          </span>
          <span class="meta-item meta-item-difficulty">
            <i class="material-icons">fitness_center</i>
            <span class="meta-text">{{ list.difficulty }}</span>
          </span>
          <span class="meta-item meta-item-difficulty">
            <i class="material-icons">access_time</i>
            <span class="meta-text">{{ list.createtAt | formatDate }}</span>
          </span>
          <!-- <span class="meta-item meta-item-fav"> -->
            <fav-button :id="list.id" :status="list.fav"></fav-button>
          <!-- </span> -->
        </div>
      </mdc-card>
    </div>
    <mdc-fab icon="add" fixed to="/post"></mdc-fab>
  </section>
</div>
</template>

<script>
import { db } from '../../main'
import moment from 'moment'
import FavButton from '../FavButton.vue'
import DrawerFilter from '../DrawerFilter.vue'

export default {
  methods: {
    displayDetails(id) {
      this.$router.push({
        name: 'detail',
        params: { id: id }
      })
    },
    toggleDetails(filter, event) {
      let tagname = event.target.tagName
      let blocked = ['INPUT', 'LABEL', 'SPAN']
      if (!blocked.includes(tagname)) {
        filter.showDetails = !filter.showDetails
      } else {
        event.preventDefault()
      }
      console.log('toggle', tagname, filter, event)
    }
  },
  data() {
    return {
      testValue: true,
      lists: [],
      showFilters: false,
      filters: {
        'duration': {
          title: 'Zeitaufwand',
          icon: 'timelapse',
          active: false,
          value: '30',
          showDetails: true
        },
        'difficulty': {
          title: 'Schwierigkeit',
          icon: 'fitness_center',
          active: true,
          value: {
            easy: true,
            normal: true,
            hard: true
          },
          showDetails: true
        },
        'fav': {
          title: 'Nur Favoriten',
          icon: 'star',
          active: false,
          value: true,
          showDetails: true
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
      console.log('af', af)
      return af
    }
  },
  firestore() {
    return {
      lists: db.collection('recipes').orderBy('createtAt')
    }
  },
  filters: {
    formatDate(d) {
      // d is a firestore timestamp now
      let date = d.toDate()
      return moment(date).locale('de').fromNow()
    }
  },
  components: {
    FavButton,
    DrawerFilter
  }
}
</script>

<style lang="scss">
@import "../../theme.scss";
@import "@material/chips/mdc-chips";
@import "@material/drawer/mdc-drawer";

.page-layout-container {
  display: flex;
  flex-direction: row;

  .page-drawer {
    @include mdc-drawer-fill-color-accessible($mdc-theme-surface);
    @include mdc-rtl-reflexive-box(border, right, 1px solid #e4e4e4);
    @include mdc-rtl-reflexive-position(left, 0);

    .recipe-filter {
      .mdc-list-item__graphic {
        margin-right: 16px;
      }
      .filter-title {
        flex-grow: 1;
      }
    }
  }
}

.recipe-filter2 {
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

    i.material-icons {
      margin-right: 16px;
    }
    .recipe-filter--title {
      flex-grow: 1;
    }
  }
  .recipe-filter--details {
    padding-bottom: 12px;
    width: 100%;
  }
}

.filter-list {
  display: flex;
  flex-direction: column;
}

.recipe-overview {
  flex-grow: 1;
}

.recipe {
  margin: 16px;

  .meta {
    font-size: 1rem;
    line-height: 1.5rem;
    color: rgba(0, 0, 0, 0.87);
    color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));

    padding: 7px 12px;
    margin: 4px;
    padding: 8px 16px;

    .meta-item {
      margin-right: 32px;
      &:last-of-type {
        margin-right: 0;
      }

      .material-icons {
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
    }
  }
  .mdc-card__media-content {
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
}
</style>
