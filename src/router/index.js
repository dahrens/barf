import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ingredients from '@/components/Ingredients'
import Recipes from '@/components/Recipes'
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
      path: '/ingredients',
      name: 'Ingredients',
      component: Ingredients
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes
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
