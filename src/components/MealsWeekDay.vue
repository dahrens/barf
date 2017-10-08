<template>
  <nav class="panel">
    <!-- day heading -->
    <p class="panel-heading">
      <span class="is-size-5 is-uppercase">{{ weekday }}</span>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" pack="fas" name="edit" />
        <fa v-if="edit" pack="fas" name="save" />
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

    <!-- categories edit -->
    <template v-if="edit">
      <ingredients :showHeading="false" :dog="dog" :day="day" :availableSubCategories="allocatedSubCategories"></ingredients>
    </template>

    <!-- categories overview -->
    <div class="faked-panel-block">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control is-size-5 is-uppercase">planned ration</div>
        <template v-for="allocation in allocations">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-dark is-medium">{{ allocation.amount }}g</span>
              <span class="tag is-light is-medium" v-bind:style="{
                backgroundColor: subCategoryColor(allocation.subCategory)
              }">{{ allocation.subCategory }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import dayAllocationEdit from '@/components/DayAllocationEdit'
import ingredients from '@/components/Ingredients'
import { REMOVE_SCHEDULED_MEAL } from '@/store/mutation-types'

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
    ingredients
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
    allocatedSubCategories () {
      return this.allocations.map(a => a.subCategory)
    }
  },
  methods: {
    subCategoryColor (subCategory) {
      return this.$store.getters.subCategoryColor(subCategory)
    },
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
    }
  }
}
</script>
