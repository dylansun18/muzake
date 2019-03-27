// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(VueFire)

var config = {
    apiKey: "AIzaSyCT2rWWAGMjRMi_EElbwykHEuIqj2QTW9U",
    authDomain: "muzake-fa5a6.firebaseapp.com",
    databaseURL: "https://muzake-fa5a6.firebaseio.com",
    projectId: "muzake-fa5a6",
    storageBucket: "muzake-fa5a6.appspot.com",
    messagingSenderId: "192490519185"
  };
firebase.initializeApp(config);

export const db = firebase.firestore()


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
