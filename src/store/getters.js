export default {
  subCategories: state => {
    let options = []
    for (let category of Object.keys(state.categories)) {
      if (category === 'additives') continue
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
  ingredientHasRelations: (state) => (ingredient) => {
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
  ingredientRelations: (state) => (ingredient) => {
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
        if (recipes.map(r => r.id).indexOf(item.recipe) !== -1) stashContent.push(item)
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
    return dog.weight * (dog.percentOfWeight / 100) * factor
  },
  planRequirements: (state, getters) => (dog) => {
    let foodPerDay = getters.dogFoodQuantityPerDay(dog)
    return foodPerDay
  },
  planDistribution: (state, getters) => (dog) => {
    let plan = dog.plan
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
        distribution[category][subcategory] = parseInt(value)
      }
    }
    return distribution
  },
  planAllocation: (state, getters) => (dog) => {
    let allocation = JSON.parse(JSON.stringify(getters.emptyDistribution))
    for (let day of dog.plan.allocation) {
      for (let a of day) {
        let category = getters.subCategories.filter(c => c.subCategory === a.subCategory)[0].category
        allocation[category][a.subCategory] += parseInt(a.amount)
      }
    }
    return allocation
  }
}
