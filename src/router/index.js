import Vue from 'vue'
import Router from 'vue-router'
import Stash from '@/pages/Stash'
import Plan from '@/pages/Plan'
import Meals from '@/pages/Meals'
import Settings from '@/pages/Settings'
import About from '@/pages/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Plan',
      component: Plan
    },
    {
      path: '/meals',
      name: 'Meals',
      component: Meals
    },
    {
      path: '/stash',
      name: 'Stash',
      component: Stash
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
