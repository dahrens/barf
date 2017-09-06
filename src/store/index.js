import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state'

Vue.use(Vuex)

export const PERSIST_STORE = 'PERSIST_STORE'
export const UPDATE_DOG = 'UPDATE_DOG'
export const INSERT_DOG = 'INSERT_DOG'

const localStorage = window.localStorage
let state = localStorage.getItem('barf')
if (state === null) {
  state = defaultState
}

export default new Vuex.Store({
  state: state,
  mutations: {
    [PERSIST_STORE] (state) {
      localStorage.setItem('barf', state)
    },
    [UPDATE_DOG] (state, payload) {
      let idx = state.dogs.indexOf(payload.id)
      if (idx === -1) {
        throw new Error('Unknown Dog for update')
      }
      state.dogs[idx] = payload
    },
    [INSERT_DOG] (state, payload) {
      payload.id = state.ids.dogs
      state.ids.dogs++
      state.dogs.push(payload)
    }
  },
  getters: {
    entities: state => {
      let exclude = ['ids', 'categories']
      return Object.keys(state).filter(e => exclude.indexOf(e) === -1)
    }
  }
})
