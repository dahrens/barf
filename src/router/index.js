import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Stash from '@/components/Stash'
import Plan from '@/components/Plan'

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
