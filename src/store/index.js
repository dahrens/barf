import Vue from 'vue'
import Vuex from 'vuex'
import VueMoment from 'vue-moment'
import defaultState from './default-state'
import mutations from './mutations'
import getters from './getters'

const moment = require('moment')
require('moment/locale/de')

Vue.use(VueMoment, {
  moment
})

Vue.use(Vuex)

const localStorage = window.localStorage
let state = JSON.parse(localStorage.getItem('barf'), JSON.dateParser)
if (state === null) {
  state = defaultState
  state.events = [
    { name: 'meal', day: Vue.moment().subtract(4, 'days'), dog: 1, recipe: 1, amount: 500, unit: 'g' },
    { name: 'meal', day: Vue.moment().subtract(3, 'days'), dog: 1, recipe: 1, amount: 500, unit: 'g' },
    { name: 'meal', day: Vue.moment().subtract(2, 'days'), dog: 1, recipe: 1, amount: 500, unit: 'g' },
    { name: 'meal', day: Vue.moment().subtract(1, 'days'), dog: 1, recipe: 1, amount: 500, unit: 'g' }
  ]
}

const persistPlugin = store => {
  store.subscribe((mutation, state) => {
    // The mutation comes in the format of `{ type, payload }`.
    console.log('persist is disabled', state)
    // localStorage.setItem('barf', JSON.stringify(state))
  })
}

export default new Vuex.Store({
  state: state,
  plugins: [persistPlugin],
  mutations: mutations,
  getters: getters
})
