import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './default-state'
import mutations from './mutations'
import getters from './getters'
import { safeMigrate } from '@/store/migrations'
import { version } from '../../package.json'

Vue.use(Vuex)

const localStorage = window.localStorage
let state = JSON.parse(localStorage.getItem('barf'), JSON.dateParser)
if (state !== null && state.version !== version) {
  state = safeMigrate(state, version)
} else if (state === null) {
  defaultState.version = version
  state = defaultState
}

const persistPlugin = store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('barf', JSON.stringify(state))
  })
}

export default new Vuex.Store({
  state: state,
  plugins: [persistPlugin],
  mutations,
  getters
})
