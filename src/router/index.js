import Vue from 'vue'
import Router from 'vue-router'
import Plan from '@/pages/Plan'
import Meals from '@/pages/Meals'
import Ingredients from '@/pages/Ingredients'
import Stash from '@/pages/Stash'
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
      path: '/ingredients',
      name: 'Ingredients',
      component: Ingredients
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
