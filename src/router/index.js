import Vue from 'vue'
import Router from 'vue-router'
import Decision from '../components/Decision'
import Home from '../components/Home'
// import Login from '../components/Login'
// import Dashboard from '../components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:title',
      name: 'Decision',
      component: Decision
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login, 
    //   meta: { guestOnly: true }
    // },
    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   component: Dashboard, 
    //   meta: { requireAuth: true } 
    // },
  
  ]
})
