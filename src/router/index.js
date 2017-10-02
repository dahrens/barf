import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Stash from '@/pages/Stash'
import Plan from '@/pages/Plan'
import Settings from '@/pages/Settings'
import About from '@/pages/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stash',
      name: 'Stash',
      component: Stash
    },
    {
      path: '/plan',
      name: 'Plan',
      component: Plan
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
