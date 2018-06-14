// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VueMDCAdapter from 'vue-mdc-adapter'
import './theme.scss'
import VShowSlide from 'v-show-slide'

Vue.config.productionTip = false

Vue.use(VueFire)

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAHqwmplbJdvew_8EYts40A0rn-Xzw3AYE',
  authDomain: 'rezeptbuch-a9f1c.firebaseapp.com',
  projectId: 'rezeptbuch-a9f1c'
}
firebase.initializeApp(config)

export const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
db.enablePersistence()
  .then(function() {
    // Initialize Cloud Firestore through firebase
    console.log('persistence enabled')
  })
  .catch(function(err) {
    console.error(err)
    // if (err.code === 'failed-precondition') {
    //   // Multiple tabs open, persistence can only be enabled
    //   // in one tab at a a time.
    //   // ...
    // } else if (err.code === 'unimplemented') {
    //   // The current browser does not support all of the
    //   // features required to enable persistence
    //   // ...
    // }
  })

Vue.use(VueMDCAdapter)
Vue.use(VShowSlide)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
