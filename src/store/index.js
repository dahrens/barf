import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state'

Vue.use(Vuex)

export const UPDATE_DOG = 'UPDATE_DOG'
export const INSERT_DOG = 'INSERT_DOG'

export default new Vuex.Store({
  state: defaultState,
  mutations: {
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

