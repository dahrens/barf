import * as types from './mutation-types'

export default {
  [types.UPDATE_DOG] (state, payload) {
    let idx = state.dogs.map(d => d.id).indexOf(payload.id)
    if (idx === -1) {
      throw new Error('Unknown Dog for update')
    }
    state.dogs[idx] = payload
  },
  [types.INSERT_DOG] (state, payload) {
    payload.id = state.ids.dogs
    state.ids.dogs++
    state.dogs.push(payload)
  },
  [types.INSERT_INGREDIENT] (state, payload) {
    payload.id = state.ids.ingredients
    state.ids.ingredients++
    state.ingredients.push(payload)
  },
  [types.REMOVE_INGREDIENT] (state, payload) {
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
  },
  [types.STASH_INGREDIENT] (state, payload) {
    state.stash.push(payload)
  },
  [types.INSERT_RECIPE] (state, payload) {
    payload.id = state.ids.recipes
    state.ids.recipes++
    state.recipes.push(payload)
  },
  [types.REMOVE_RECIPE] (state, payload) {
    let idx = state.recipes.indexOf(payload)
    if (idx === -1) return
    state.recipes.splice(idx, 1)
  },
  [types.STASH_RECIPE] (state, payload) {
    let included = state.stash.filter((i) => i.hasOwnProperty('recipe') && i.recipe === payload.recipe)
    if (included.length === 1) {
      let recipe = included[0]
      recipe.quantity += payload.quantity
    } else {
      state.stash.push(payload)
    }
  },
  [types.UPDATE_PLAN_SUBCATEGORY_DISTRIBUTION] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    let plan = dog.plan
    plan.distribution[payload.category] = payload.distribution
  },
  [types.UPDATE_PLAN_CATEGORY_DISTRIBUTION] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    let plan = dog.plan
    plan.animal = payload.value
    plan.vegetables = 100 - payload.value
  },
  [types.ADD_OR_UPDATE_DAY_ALLOCATION] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    let subCategory = payload.allocation.subCategory
    let idx = dog.plan.allocation[payload.day].map(v => v.subCategory).indexOf(subCategory)
    if (idx === -1) {
      dog.plan.allocation[payload.day].push(payload.allocation)
    } else {
      dog.plan.allocation[payload.day][idx].amount = payload.allocation.amount
    }
  },
  [types.REMOVE_DAY_ALLOCATION] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    let subCategory = payload.allocation.subCategory
    let idx = dog.plan.allocation[payload.day].map(v => v.subCategory).indexOf(subCategory)
    if (idx !== -1) {
      dog.plan.allocation[payload.day].splice(idx, 1)
    }
  },
  [types.UPDATE_PLAN_ALLOCATION] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    dog.plan.allocation = payload.allocation
  },
  [types.SET_ACTIVE_PLAN_VIEW] (state, payload) {
    state.ui.activePlanView = payload.view
  }
}
