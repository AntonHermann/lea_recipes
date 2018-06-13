import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView/View'
import HomeHeader from '@/components/HomeView/Header'
import DetailView from '@/components/DetailView/View'
import DetailHeader from '@/components/DetailView/Header'
import PostView from '@/components/PostView/View'
import PostHeader from '@/components/PostView/Header'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        header: HomeHeader
      }
    },
    {
      path: '/details/:id',
      name: 'details',
      components: {
        default: DetailView,
        header: DetailHeader
      }
    },
    {
      path: '/post',
      name: 'post',
      components: {
        default: PostView,
        header: PostHeader
      }
    }
  ]
})
