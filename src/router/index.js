import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Data from '@/components/Data'
import Plan from '@/components/Plan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hello
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    },
    {
      path: '/plan',
      name: 'Plan',
      component: Plan
    }
  ]
})
