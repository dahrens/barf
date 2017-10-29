<template>
  <nav class="panel">
    <!-- day heading -->
    <p class="panel-heading">
      <span class="is-size-5 is-uppercase">{{ weekday }}</span>
      <span class="is-size-5 has-text-weight-bold">
        <template v-if="">
          {{ mealSum }}g
        </template>
      </span>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" icon="edit"/>
        <fa v-if="edit" icon="save"/>
      </a>
      <a v-on:click="autoAllocate()" class="icon is-pulled-right has-text-dark">
        <fa icon="magic"/>
      </a>
    </p>
    <!-- meals for that day -->
    <div v-for="timeOfDay in ['morning', 'evening']" class="panel-block">
      <div>
        <p class="heading is-size-4">
          <span>{{ timeOfDay }}</span>
        </p>
        <p v-if="dog.plan.meals[day][timeOfDay].length" class="subtitle">
          <ul>
            <li v-for="meal in dog.plan.meals[day][timeOfDay]">
              <span class="has-text-weight-bold">
                {{ meal.amount }}{{ getIngredient(meal.ingredient).unit }}
              </span>
              <span>
                {{ getIngredient(meal.ingredient).name }}
              </span>
              <a v-if="edit" class="tag is-delete"
                v-on:click="removeScheduledMeal(timeOfDay, meal)"></a>
            </li>
          </ul>
        </p>
        <p v-else class="subtitle has-text-danger">nothing</p>
      </div>
    </div>


    <div class="faked-panel-block">
      <div class="field is-grouped is-grouped-multiline">
        <template v-for="(data, subCategory) in mealSubCategories">
          <div class="control">
            <subCategoryTag
              :subCategory="subCategory"
              :amount="data.expected">
              <span slot="prefix" class="tag is-medium" :class="{
                'is-success': data.expected === data.assigned,
                'is-danger': data.expected !== data.assigned,
                }">
                {{ data.assigned }}g
              </span>
            </subCategoryTag>
          </div>
        </template>
      </div>
    </div>

    <template v-if="edit">
      <ingredients :showHeading="false" :dog="dog" :day="day" :availableSubCategories="planedSubCategories"></ingredients>
    </template>
  </nav>
</template>

<script>
import subCategoryTag from '@/components/include/SubCategoryTag'
import dayAllocationEdit from '@/components/DayAllocationEdit'
import ingredients from '@/components/Ingredients'
import {
  REMOVE_SCHEDULED_MEAL, REPLACE_SCHEDULE, INSERT_NOTIFICATION
} from '@/store/mutation-types'

function shuffle (array) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export default {
  name: 'week',
  props: {
    dog: {
      required: true
    },
    day: {
      required: true
    },
    weekday: {
      required: true
    }
  },
  components: {
    dayAllocationEdit,
    ingredients,
    subCategoryTag
  },
  data () {
    return {
      edit: false
    }
  },
  computed: {
    subCategoryOptions () {
      return this.$store.getters.subCategories
    },
    allocations () {
      return this.dog.plan.allocation[this.day]
    },
    planedSubCategories () {
      return this.allocations.map(a => a.subCategory)
    },
    meals () {
      let meals = []
      meals = meals.concat(this.dog.plan.meals[this.day].morning)
      meals = meals.concat(this.dog.plan.meals[this.day].evening)
      return meals
    },
    mealSum () {
      if (this.meals.length === 0) return 0
      return this.meals.map(m => m.amount).reduce((sum, v) => parseInt(sum) + parseInt(v))
    },
    mealSubCategories () {
      let result = {}
      for (let meal of this.meals) {
        let ingredient = this.getIngredient(meal.ingredient)
        for (let idx in ingredient.subCategories) {
          let m = ingredient.subCategories[idx].portion
          let subCategory = ingredient.subCategories[idx].subCategory
          let amount = parseInt(meal.amount * (m / 100))
          if (!result[subCategory]) {
            let expected = 0
            let f = (a) => a.subCategory === subCategory
            let filtered = this.allocations.filter(f)
            if (filtered.length === 1) {
              expected = filtered[0].amount
            }
            result[subCategory] = { assigned: amount, expected }
          } else {
            result[subCategory].assigned += amount
          }
        }
      }
      for (let alloc of this.allocations) {
        if (!result[alloc.subCategory]) {
          result[alloc.subCategory] = { assigned: 0, expected: alloc.amount }
        }
      }
      return result
    }
  },
  methods: {
    getIngredient (id) {
      return this.$store.getters.ingredientById(id)
    },
    removeScheduledMeal (timeOfDay, meal) {
      this.$store.commit(REMOVE_SCHEDULED_MEAL, {
        dog: this.dog.id,
        day: this.day,
        timeOfDay,
        meal
      })
    },
    randomSuiteableMeal (allocation, remainingAllocations) {
      let ingredients = this.$store.state.ingredients.filter(
        (i) => i.subCategories.map(e => e.subCategory).indexOf(allocation.subCategory) !== -1
      )
      for (let ingredient of shuffle(ingredients)) {
        if (ingredient.subCategories.length === 1) {
          let idx = remainingAllocations.indexOf(allocation)
          remainingAllocations.splice(idx, 1)
          return {
            ingredient: ingredient.id,
            amount: allocation.amount
          }
        }
        if (ingredient.subCategories.every(
          s => remainingAllocations
            .map(r => r.subCategory)
            .indexOf(s.subCategory) !== -1
        )) {
          // x = a * (p / 100)
          // a = 100 * (x / p)
          let targetSubCategory = ingredient.subCategories.filter(
            s => s.subCategory === allocation.subCategory
          )[0]
          let amount = 100 * (allocation.amount / targetSubCategory.portion)
          let idx = remainingAllocations.indexOf(allocation)
          remainingAllocations.splice(idx, 1)
          for (let iSub of ingredient.subCategories.filter(
            s => s.subCategory !== allocation.subCategory
          )) {
            let x = amount * (iSub.portion)
            for (let idx in remainingAllocations) {
              if (remainingAllocations[idx].subCategory === iSub.subCategory) {
                if (remainingAllocations[idx].amount > x) {
                  remainingAllocations[idx].amount -= x
                } else {
                  remainingAllocations.splice(idx, 1)
                }
              }
            }
          }
          return {
            ingredient: ingredient.id,
            amount
          }
        }
      }
      // should not be reached
      throw Error('unable to find suiteable meal that fulfill category: ' + allocation.subCategory)
    },
    autoAllocate () {
      let meals = { morning: [], evening: [] }
      let morningCount = 0
      let eveningCount = 0
      let remainingAllocations = JSON.parse(JSON.stringify(this.allocations))
      let safetyBreak = 0
      while (safetyBreak < 10) {
        safetyBreak++
        if (remainingAllocations.length === 0) break
        let allocation = remainingAllocations[0]

        let slots = ['morning', 'evening']
        let slot = null

        if (morningCount > eveningCount) {
          slot = 'evening'
        } else if (morningCount < eveningCount) {
          slot = 'morning'
        } else {
          slot = slots[Math.floor(Math.random() * slots.length)]
        }

        try {
          let meal = this.randomSuiteableMeal(allocation, remainingAllocations)
          meals[slot].push(meal)
          if (slot === 'morning') morningCount++
          else eveningCount++
        } catch (e) {
          if (remainingAllocations.length > 1) {
            // TODO: this breaks when more than one allocation can not be fulfilled!
            remainingAllocations.push(remainingAllocations.shift())
          } else {
            remainingAllocations.pop()
            this.$store.commit(INSERT_NOTIFICATION, {
              message: e.message,
              style: 'is-danger'
            })
          }
        }
      }
      this.$store.commit(REPLACE_SCHEDULE, {
        dog: this.dog.id,
        day: this.day,
        meals
      })
    }
  }
}
</script>
