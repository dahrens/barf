<template>
  <div class="week">
    <div class="field has-addons">
      <p class="control is-expanded">
        <a v-on:click="wizard = !wizard" class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="magic" />
          </span>
          <span>wizard</span>
        </a>
      </p>
      <p class="control is-expanded">
        <a class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="print" />
          </span>
          <span>print</span>
        </a>
      </p>
      <p class="control is-expanded">
        <a v-on:click="showCategories = !showCategories" class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="tags" />
          </span>
          <span v-if="!showCategories">show</span>
          <span v-else>hide</span>
          <span>&nbsp;categories</span>
        </a>
      </p>
      <p class="control is-expanded">
        <a v-on:click="showMeals = !showMeals" class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="utensils" />
          </span>
          <span v-if="!showMeals">show</span>
          <span v-else>hide</span>
          <span>&nbsp;meals</span>
        </a>
      </p>
    </div>

    <!-- iterate weekdays weekday = monday, index = 0 -->
    <template v-if="!collapsed" v-for="(weekday, index) in dog.plan.week">
      <nav class="panel">
        <!-- day heading -->
        <p class="panel-heading">
          <span class="is-size-5 is-uppercase">{{ weekday }}</span>
        </p>

        <!-- categories overview -->
        <div v-if="showCategories" class="faked-panel-block">
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <a v-on:click="addAllocation(index)" :disabled="allocation(index).length === subCategoryOptions.length" class="button icon is-medium is-success">
                <fa pack="fas" name="plus" />
              </a>
            </div>
            <div class="control">
              <a v-on:click="toggleDayAllocationEdit(weekday)" class="button icon is-medium is-dark">
                <fa v-if="!hasAllocationEdit(weekday)" pack="fas" name="edit" />
                <fa v-else pack="fas" name="save" />
              </a>
            </div>
            <template v-for="a in allocation(index)">
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag is-dark is-medium">{{ a.amount }}g</span>
                  <span class="tag is-light is-medium" v-bind:style="{
                    backgroundColor: subCategoryColor(a.subCategory),
                    color: categoryColor,
                    }">{{ a.subCategory }}</span>
                  <a v-on:click="deleteAllocation(a, index)" class="tag is-medium is-delete"></a>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- categories edit -->
        <template v-if="showCategories && hasAllocationEdit(weekday)">
          <dayAllocationEdit :dog="dog" :day="index"></dayAllocationEdit>
        </template>

        <!-- meals for that day -->
        <div v-if="showMeals" class="faked-panel-block">
          <nav class="level">
            <div v-for="timeOfDay in ['morning', 'evening']" class="level-item has-text-centered">
              <div>
                <p class="heading is-size-4">
                  <a class="button icon is-medium is-success">
                    <fa pack="fas" name="plus" />
                  </a>
                  <span>{{ timeOfDay }}</span>
                  <a class="button icon is-medium is-danger">
                    <fa pack="fas" name="bomb" />
                  </a>
                </p>
                <p v-if="plan.meals[index][timeOfDay].length" class="subtitle">
                  <ul>
                    <li v-for="meal in plan.meals[index][timeOfDay]">
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
    <planAllocationWizard :dog="dog" :class="{'is-active': wizard}" v-on:close="wizard = !wizard"></planAllocationWizard>
  </div>
</template>

<script>
import subCategoryTag from '@/components/include/SubCategoryTag'
import dayAllocationEdit from '@/components/DayAllocationEdit'
import planAllocationWizard from '@/components/PlanAllocationWizard'
import ingredients from '@/components/Ingredients'
import { REMOVE_DAY_ALLOCATION } from '@/store/mutation-types'

export default {
  name: 'planDay',
  props: ['dog'],
  components: {
    planAllocationWizard,
    dayAllocationEdit,
    subCategoryTag,
    ingredients
  },
  data () {
    return {
      wizard: false,
      showCategories: true,
      showMeals: true,
      allocationEdit: [],  // list of weekday with activated edit panel
      newAllocation: {
        subCategory: 'meat',
        amount: 100
      }
    }
  },
  computed: {
    plan () {
      return this.dog.plan
    },
    subCategoryOptions () {
      return this.$store.getters.subCategories
    },
    categoryColor () {
      if (this.category === 'animal') return 'whitesmoke'
    }
  },
  methods: {
    subCategoryColor (subCategory) {
      return this.$store.state.ui.subCategoryColors[subCategory]
    },
    allocation (day) {
      return this.plan.allocation[day]
    },
    addAllocation (day) {
      if (!this.hasAllocationEdit(this.plan.week[day])) {
        this.toggleDayAllocationEdit(this.plan.week[day])
      }
      if (this.allocation(day).length === this.subCategoryOptions.length) return
      let fresh = JSON.parse(JSON.stringify(this.newAllocation))
      let freshSubCategory = this.subCategoryOptions.filter(s => this.allocation(day).map(a => a.subCategory).indexOf(s.subCategory) === -1)[0].subCategory
      fresh.subCategory = freshSubCategory
      this.allocation(day).push(fresh)
    },
    editAll () {

    },
    toggleDayAllocationEdit (weekday) {
      let idx = this.allocationEdit.indexOf(weekday)
      if (idx === -1) {
        this.allocationEdit.push(weekday)
      } else {
        this.allocationEdit.splice(idx, 1)
      }
    },
    hasAllocationEdit (weekday) {
      return this.allocationEdit.indexOf(weekday) !== -1
    },
    getIngredient (id) {
      return this.$store.getters.ingredientById(id)
    },
    deleteAllocation (allocation, day) {
      this.$store.commit(REMOVE_DAY_ALLOCATION, {
        dog: this.dog.id,
        day,
        allocation
      })
    }
  }
}
</script>
