import * as types from './mutation-types'

export default {
  [types.SET_VERSION] (state, version) {
    state.version = version
  },
  [types.WRITE_SETTINGS] (state, settings) {
    state.settings = settings
  },
  [types.INSERT_DOG] (state, dog) {
    dog.id = state.ids.dogs
    state.ids.dogs++
    state.dogs.push(dog)
    state.selectedDog = dog.id
  },
  [types.UPDATE_DOG] (state, dog) {
    let idx = state.dogs.map(d => d.id).indexOf(dog.id)
    if (idx === -1) {
      throw new Error('Unknown Dog for update')
    }
    state.dogs[idx] = dog
  },
  [types.REMOVE_DOG] (state, dogId) {
    let idx = state.dogs.map(d => d.id).indexOf(dogId)
    if (idx === -1) {
      throw new Error('Remove dog: Unknown DogId ' + dogId)
    }
    state.dogs.splice(idx, 1)
  },
  [types.SELECT_DOG] (state, dogId) {
    if (!state.dogs.some(d => d.id === dogId)) {
      throw new Error('Unknown DogId ' + dogId)
    }
    state.selectedDogId = dogId
  },
  [types.INSERT_INGREDIENT] (state, ingredient) {
    ingredient.id = state.ids.ingredients
    state.ids.ingredients++
    state.ingredients.push(ingredient)
  },
  [types.REMOVE_INGREDIENT] (state, payload) {
    let ingredient = payload.ingredient
    let idx = state.ingredients.indexOf(ingredient)
    if (idx === -1) return
    state.ingredients.splice(idx, 1)
    for (let item of payload.cascade.stashContent) {
      state.stash.splice(state.stash.indexOf(item), 1)
    }
  },
  [types.STASH_INGREDIENT] (state, item) {
    state.stash.push(item)
  },
  [types.UPDATE_PLAN_DISTRIBUTION] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    let plan = dog.plan
    plan.distribution = payload.distribution
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
  [types.SCHEDULE_MEAL] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    dog.plan.meals[payload.day][payload.timeOfDay].push(payload.meal)
  },
  [types.REMOVE_SCHEDULED_MEAL] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    let idx = dog.plan.meals[payload.day][payload.timeOfDay].indexOf(payload.meal)
    if (idx !== -1) {
      dog.plan.meals[payload.day][payload.timeOfDay].splice(idx, 1)
    }
  },
  [types.REPLACE_SCHEDULE] (state, payload) {
    let dog = state.dogs.filter(d => d.id === payload.dog)[0]
    dog.plan.meals[payload.day].morning = payload.meals.morning
    dog.plan.meals[payload.day].evening = payload.meals.evening
  },
  [types.INSERT_NOTIFICATION] (state, notification) {
    state.notifications.push(notification)
  },
  [types.REMOVE_NOTIFICATION] (state, notification) {
    let idx = state.notifications.indexOf(notification)
    if (idx !== -1) {
      state.notifications.splice(idx, 1)
    }
  }
}
