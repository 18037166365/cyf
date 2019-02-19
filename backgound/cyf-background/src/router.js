import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HospitalEdit from './views/Hospital-edit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      // path: '/hospitalList',
      name: 'hospitalList',
      component: () => import(/* webpackChunkName: "hospitalList" */ './views/Hospital-list.vue')
    },
    {
      path: '/hospitalEdit',
      name: 'hospitalEdit',
      // component: () => import(/* webpackChunkName: "hospitalEdit" */ './views/Hospital-edit.vue')
      component: HospitalEdit
    }
  ]
})
