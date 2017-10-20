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
  REMOVE_SCHEDULED_MEAL, REPLACE_SCHEDULE
} from '@/store/mutation-types'

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
    categoryColor () {
      if (this.category === 'animal') return 'whitesmoke'
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
    autoAllocate () {
      let meals = { morning: [], evening: [] }
      let morningCount = 0
      let eveningCount = 0
      for (let allocation of this.allocations) {
        let amount = allocation.amount
        let ingredients = this.$store.state.ingredients.filter(
          (i) => i.subCategories.map(e => e.subCategory).indexOf(allocation.subCategory) !== -1
        )
        let ingredient = ingredients[Math.floor(Math.random() * ingredients.length)]

        let slots = ['morning', 'evening']
        let slot = null

        if (morningCount > eveningCount) {
          slot = 'evening'
        } else if (morningCount < eveningCount) {
          slot = 'morning'
        } else {
          slot = slots[Math.floor(Math.random() * slots.length)]
        }
        meals[slot].push({
          ingredient: ingredient.id,
          amount
        })
        if (slot === 'morning') morningCount++
        else eveningCount++
      }
      this.$store.commit(REPLACE_SCHEDULE, {
        dog: this.dog.id,
        day: this.day,
        meals
      })
      this.$forceUpdate()
    }
  }
}
</script>
