import Vue from 'vue'
import Vuex from 'vuex'
import VueMoment from 'vue-moment'
import defaultState from './state'

const moment = require('moment')
require('moment/locale/de')

Vue.use(VueMoment, {
  moment
})

Vue.use(Vuex)

if (JSON && !JSON.dateParser) {
  var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/
  JSON.dateParser = function (key, value) {
    if (typeof value === 'string') {
      var a = reISO.exec(value)
      if (a) return new Date(value)
    }
    return value
  }
}

export const PERSIST_STORE = 'PERSIST_STORE'
export const UPDATE_DOG = 'UPDATE_DOG'
export const INSERT_DOG = 'INSERT_DOG'
export const FEED_DOG = 'FEED_DOG'
export const INSERT_INGREDIENT = 'INSERT_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const INSERT_RECIPE = 'INSERT_RECIPE'

const localStorage = window.localStorage
let state = JSON.parse(localStorage.getItem('barf'), JSON.dateParser)
if (state === null) {
  state = defaultState
  state.events = [
    { name: 'meal', day: Vue.moment().subtract(4, 'days'), dog: 1, recipe: 1, amount: 500, unit: 'g' },
    { name: 'meal', day: moment().subtract(3, 'days'), dog: 1, recipe: 1, amount: 500, unit: 'g' },
    { name: 'meal', day: moment().subtract(2, 'days'), dog: 1, recipe: 1, amount: 500, unit: 'g' },
    { name: 'meal', day: moment().subtract(1, 'days'), dog: 1, recipe: 1, amount: 500, unit: 'g' }
  ]
}

function persist (state) {
  localStorage.setItem('barf', JSON.stringify(state))
}

export default new Vuex.Store({
  state: state,
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
    },
    // [FEED_DOG] (state, payload) {
    //   state.stash = state.stash.filter(e => e.id !== payload.food.id)
    //   let dog = state.dogs.filter(e => e === e.payload.dog.id)
    //   dog.meals.push(payload.food)
    // },
    [INSERT_INGREDIENT] (state, payload) {
      if (payload.id) throw Error('already has an ID')
      payload.id = state.ids.ingredients
      state.ids.ingredients++
      state.ingredients.push(payload)
      persist(state)
    },
    [REMOVE_INGREDIENT] (state, payload) {
      let idx = state.ingredients.indexOf(payload)
      if (idx === -1) return
      state.ingredients.splice(idx, 1)
    },
    [INSERT_RECIPE] (state, payload) {
      if (payload.id) throw Error('already has an ID')
      payload.id = state.ids.recipes
      state.ids.recipes++
      state.recipes.push(payload)
      persist(state)
    }
  },
  getters: {
    entities: state => {
      let exclude = ['ids', 'categories']
      return Object.keys(state).filter(e => exclude.indexOf(e) === -1)
    },
    categories: state => {
      let options = []
      for (let category of Object.keys(state.categories)) {
        let subcategories = state.categories[category]
        for (let subcategory of subcategories) {
          options.push({
            part: subcategory,
            category: category
          })
        }
      }
      return options
    }
  }
})
