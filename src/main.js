// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(VueFire)

firebase.initializeApp({
  projectId: 'muzake-sbhacks',
  databaseURL: 'https://muzake-sbhacks.firebaseio.com'
})

export const db = firebase.firestore()

import GoogleAuth from 'vue-google-auth'

Vue.use(GoogleAuth, { clientID: '10448693707-nh9hplfcnv3bjbvb9i4g0ed0gho423pr.apps.googleusercontent.com' })
Vue.googleAuth().load()



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
