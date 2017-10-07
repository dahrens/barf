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
    <!-- categories overview -->
    <div v-if="showCategories" class="faked-panel-block">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control is-size-5 is-uppercase">daily consumption</div>
        <template v-for="a in allocation">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-dark is-medium">{{ a.amount }}g</span>
              <span class="tag is-light is-medium" v-bind:style="{
                backgroundColor: subCategoryColor(a.subCategory),
                color: categoryColor,
                }">{{ a.subCategory }}</span>
              <a v-if="edit" v-on:click="deleteAllocation(a)" class="tag is-medium is-delete"></a>
            </div>
          </div>
        </template>
        <div v-if="edit" class="control">
          <a v-on:click="addAllocation()" :disabled="allocation.length === subCategoryOptions.length" class="button icon is-medium is-success">
            <fa pack="fas" name="plus" />
          </a>
        </div>
      </div>
    </div>

    <!-- categories edit -->
    <template v-if="showCategories && edit">
      <dayAllocationEdit :dog="dog" :day="day"></dayAllocationEdit>
    </template>

    <!-- meals for that day -->
    <div v-if="showMeals" class="faked-panel-block">
      <nav class="level">
        <div v-for="timeOfDay in ['morning', 'evening']" class="level-item has-text-centered">
          <div>
            <p class="heading is-size-4">
              <a v-if="edit" class="button icon is-medium is-success">
                <fa pack="fas" name="plus" />
              </a>
              <span>{{ timeOfDay }}</span>
              <a v-if="edit" class="button icon is-medium is-danger">
                <fa pack="fas" name="bomb" />
              </a>
            </p>
            <p v-if="dog.plan.meals[day][timeOfDay].length" class="subtitle">
              <ul>
                <li v-for="meal in dog.plan.meals[day][timeOfDay]">
                  {{ getIngredient(meal.ingredient).name }}
                </li>
              </ul>
            </p>
            <p v-else class="subtitle has-text-danger">nothing</p>
          </div>
        </div>
      </nav>
    </div>
  </nav>
</template>

<script>
import subCategoryTag from '@/components/include/SubCategoryTag'
import dayAllocationEdit from '@/components/DayAllocationEdit'
import ingredients from '@/components/Ingredients'
import { REMOVE_DAY_ALLOCATION } from '@/store/mutation-types'

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
    },
    showCategories: {
      required: false,
      default: () => (true)
    },
    showMeals: {
      required: false,
      default: () => (true)
    }
  },
  components: {
    dayAllocationEdit,
    subCategoryTag,
    ingredients
  },
  data () {
    return {
      edit: false,
      newAllocation: {
        subCategory: 'meat',
        amount: 100
      }
    }
  },
  computed: {
    subCategoryOptions () {
      return this.$store.getters.subCategories
    },
    categoryColor () {
      if (this.category === 'animal') return 'whitesmoke'
    },
    allocation () {
      return this.dog.plan.allocation[this.day]
    }
  },
  methods: {
    subCategoryColor (subCategory) {
      return this.$store.state.ui.subCategoryColors[subCategory]
    },
    addAllocation () {
      if (this.allocation.length === this.subCategoryOptions.length) return
      let fresh = JSON.parse(JSON.stringify(this.newAllocation))
      let freshSubCategory = this.subCategoryOptions.filter(s => this.allocation.map(a => a.subCategory).indexOf(s.subCategory) === -1)[0].subCategory
      fresh.subCategory = freshSubCategory
      this.allocation.push(fresh)
    },
    getIngredient (id) {
      return this.$store.getters.ingredientById(id)
    },
    deleteAllocation (allocation) {
      this.$store.commit(REMOVE_DAY_ALLOCATION, {
        dog: this.dog.id,
        day: this.day,
        allocation
      })
    }
  }
}
</script>
