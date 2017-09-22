import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Stash from '@/pages/Stash'
import Plan from '@/pages/Plan'

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
    }
  ]
})
