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
export const STASH_INGREDIENT = 'STASH_INGREDIENT'
export const INSERT_RECIPE = 'INSERT_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'
export const UPDATE_PLAN_CATEGORIES = 'UPDATE_PLAN_CATEGORIES'

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
  console.log('persist is disabled')
  // localStorage.setItem('barf', JSON.stringify(state))
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
      payload.id = state.ids.ingredients
      state.ids.ingredients++
      state.ingredients.push(payload)
      persist(state)
    },
    [REMOVE_INGREDIENT] (state, payload) {
      console.log('will delete: ', payload)
      let ingredient = payload.ingredient
      let idx = state.ingredients.indexOf(ingredient)
      if (idx === -1) return
      state.ingredients.splice(idx, 1)
      for (let item of payload.cascade.stashContent) {
        state.stash.splice(state.stash.indexOf(item), 1)
      }
      for (let recipe of payload.cascade.recipes) {
        state.recipes.splice(state.recipes.indexOf(recipe), 1)
      }
      persist(state)
    },
    [STASH_INGREDIENT] (state, payload) {
      state.stash.push(payload)
      persist(state)
    },
    [INSERT_RECIPE] (state, payload) {
      payload.id = state.ids.recipes
      state.ids.recipes++
      state.recipes.push(payload)
      persist(state)
    },
    [REMOVE_RECIPE] (state, payload) {
      let idx = state.recipes.indexOf(payload)
      if (idx === -1) return
      state.recipes.splice(idx, 1)
      persist(state)
    },
    [UPDATE_PLAN_CATEGORIES] (state, payload) {
      let plan = state.plans.filter(p => p.id === payload.plan)[0]
      for (let category of payload.subCategories) {
        for (let p of plan.subCategories) {
          if (category[1] === p[1]) {
            p[0] = category[0]
          }
        }
      }
    }
  },
  getters: {
    entities: state => {
      let exclude = ['ids', 'categories']
      return Object.keys(state).filter(e => exclude.indexOf(e) === -1)
    },
    subCategories: state => {
      let options = []
      for (let category of Object.keys(state.categories)) {
        let subCategories = state.categories[category]
        for (let subCategory of subCategories) {
          options.push({
            subCategory,
            category
          })
        }
      }
      return options
    },
    ingredientNeedsCascade: (state) => (ingredient) => {
      for (let item of state.stash) {
        if (item.hasOwnProperty('ingredient')) {
          if (item.ingredient === ingredient.id) return true
        }
      }
      for (let recipe of state.recipes) {
        for (let i of recipe.ingredients) {
          if (i.indredient === ingredient.id) return true
        }
      }
      return false
    },
    getIngredientsCascaded: (state) => (ingredient) => {
      let stashContent = []
      let recipes = []
      for (let recipe of state.recipes) {
        for (let i of recipe.ingredients) {
          if (i.ingredient === ingredient.id) recipes.push(recipe)
        }
      }
      for (let item of state.stash) {
        if (item.hasOwnProperty('ingredient')) {
          if (item.ingredient === ingredient.id) stashContent.push(item)
        }
        if (item.hasOwnProperty('recipe')) {
          console.log(recipes.map(r => parseInt(r.id)), item.recipe)
          if (recipes.map(r => parseInt(r.id)).indexOf(parseInt(item.recipe)) !== -1) stashContent.push(item)
        }
      }
      return {
        stashContent,
        recipes
      }
    },
    stashedIngredients: state => {
      let ingredients = {}
      for (let item of state.stash) {
        if (item.hasOwnProperty('ingredient')) {
          let ingredient = state.ingredients.filter(i => i.id === item.ingredient)[0]
          if (ingredients.hasOwnProperty(ingredient.id)) {
            // already found this one
            let ingredientMeta = ingredients[ingredient.id]
            let existingAmounts = ingredientMeta.amounts.map(e => e[0])
            if (existingAmounts.indexOf(item.amount) === -1) {
              ingredientMeta.amounts.push([item.amount, 1])
            } else {
              let amountCounter = ingredientMeta.amounts.filter(a => item.amount)[0]
              amountCounter[1]++
            }
          } else {
            // first occurency
            ingredients[ingredient.id] = {
              ingredient,
              item,
              amounts: [[item.amount, 1]],
              unit: item.unit
            }
          }
        }
      }
      return ingredients
    },
    stashedRecipes: state => {
      let recipes = {}
      for (let item of state.stash) {
        if (item.hasOwnProperty('recipe')) {
          let recipe = state.recipes.filter(i => i.id === item.recipe)[0]
          if (recipes.hasOwnProperty(recipe.id)) {
            // already found this one
            let recipeMeta = recipes[recipe.id]
            recipeMeta.quantity++
          } else {
            // first occurency
            recipes[recipe.id] = {
              recipe,
              quantity: 1
            }
          }
        }
      }
      return recipes
    }
  }
})
