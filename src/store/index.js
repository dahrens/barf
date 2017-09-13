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
export const STASH_RECIPE = 'STASH_RECIPE'
export const INSERT_RECIPE = 'INSERT_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'
export const UPDATE_PLAN_SUBCATEGORY_DISTRIBUTION = 'UPDATE_PLAN_SUBCATEGORY_DISTRIBUTION'
export const UPDATE_PLAN_CATEGORY_DISTRIBUTION = 'UPDATE_PLAN_CATEGORY_DISTRIBUTION'

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
  console.log('persist is disabled', state)
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
      for (let planMeal of payload.cascade.planMeals) {
        let plan = state.plans.filter(p => planMeal.plan)[0]
        plan.week[planMeal.dow].splice(planMeal.meal, 1)
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
    [STASH_RECIPE] (state, payload) {
      console.log(payload)
      let included = state.stash.filter((i) => i.hasOwnProperty('recipe') && i.recipe === payload.recipe)
      if (included.length === 1) {
        console.log(payload)
        included[0].quantity += payload.quantity
      }
      state.stash.push(payload)
      persist(state)
    },
    [UPDATE_PLAN_SUBCATEGORY_DISTRIBUTION] (state, payload) {
      let dog = state.dogs.filter(d => d.id === payload.dog)
      let plan = dog.plan
      plan.distribution[payload.category] = payload.distribution
      persist(state)
    },
    [UPDATE_PLAN_CATEGORY_DISTRIBUTION] (state, payload) {
      let dog = state.dogs.filter(d => d.id === payload.dog)
      let plan = dog.plan
      plan.animal = payload.value
      plan.vegetables = 100 - payload.value
      persist(state)
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
    emptyDistribution (state, getters) {
      let distribution = {}
      for (let c of getters.subCategories) {
        if (!distribution.hasOwnProperty(c.category)) distribution[c.category] = {}
        distribution[c.category][c.subCategory] = 0
      }
      return distribution
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
      let planMeals = []
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
          if (recipes.map(r => r.id).indexOf(item.recipe) !== -1) stashContent.push(item)
        }
      }
      for (let plan of state.plans) {
        for (let dow in plan.week) {
          for (let meal in plan.week[dow]) {
            let known = () => recipes.map(r => r.id).indexOf(plan.week[dow][meal].recipe) !== -1
            if (plan.week[dow][meal].hasOwnProperty('ingredient')) {
              planMeals.push({ plan: plan.id, dow, meal })
            } else if (plan.week[dow][meal].hasOwnProperty('recipe') && known()) {
              planMeals.push({ plan: plan.id, dow, meal })
            }
          }
        }
      }
      return {
        stashContent,
        recipes,
        planMeals
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
      let recipeMetas = []
      for (let item of state.stash) {
        if (item.hasOwnProperty('recipe')) {
          let recipe = state.recipes.filter(i => i.id === item.recipe)[0]
          let idx = recipeMetas.map(rm => rm.recipe).indexOf(recipe)
          if (idx !== -1) {
            // already found this one
            let recipeMeta = recipeMetas[idx]
            recipeMeta.quantity++
          } else {
            // first occurency
            recipeMetas.push({
              recipe,
              quantity: 1
            })
          }
        }
      }
      return recipeMetas
    },
    dogFoodQuantityPerDay: (state) => (dog) => {
      let factor = state.activities[dog.activity]
      if (dog.castrated) factor = factor * 0.8
      return dog.weight * 0.02 * factor
    },
    planRequirements: (state, getters) => (dog) => {
      let foodPerDay = getters.dogFoodQuantityPerDay(dog)
      return foodPerDay
    },
    mealsDistribution: (state, getters) => (meals) => {
      let ingredientMeals = []
      for (let meal of meals) {
        if (meal.hasOwnProperty('recipe')) {
          let recipe = state.recipes.filter(r => r.id === meal.recipe)[0]
          ingredientMeals = ingredientMeals.concat(recipe.ingredients)
        } else if (meal.hasOwnProperty('ingredient')) {
          ingredientMeals.push(meal)
        }
      }
      let distribution = JSON.parse(JSON.stringify(getters.emptyDistribution))
      for (let ingredientMeal of ingredientMeals) {
        let ingredient = state.ingredients.filter(i => i.id === ingredientMeal.ingredient)[0]
        for (let d of ingredient.subCategories) {
          if (state.categories.animal.indexOf(d[1]) !== -1) {
            distribution.animal[d[1]] = d[0] * ingredientMeal.amount
          }
        }
      }
      return distribution
    },
    planDistribution: (state, getters) => (dog) => {
      console.log('planDistribution: ', dog)
      let plan = dog.plan
      console.log('dog: ', dog, 'plan: ', plan)
      let overall = getters.dogFoodQuantityPerDay(dog)
      let animal = overall * (plan.animal / 100)
      let vegetables = overall - animal
      let distribution = JSON.parse(JSON.stringify(getters.emptyDistribution))
      for (let category in plan.distribution) {
        for (let subcategory in plan.distribution[category]) {
          let value
          let p = plan.distribution[category][subcategory]
          if (p === 0) value = 0
          else if (category === 'animal') value = (p / 100) * animal * plan.week.length
          else if (category === 'vegetables') value = (p / 100) * vegetables * plan.week.length
          distribution[category][subcategory] = value
        }
      }
      return distribution
    }
  }
})
