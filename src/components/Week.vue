<template>
  <nav class="panel">
    <p class="panel-heading">
      Week
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-on:click="wizard = !wizard" class="icon is-pulled-right has-text-dark">
        <fa pack="fas" name="magic" />
      </a>
      <a v-on:click="expandMany = !expandMany" class="is-light is-pulled-right">
        <span class="icon has-text-dark panel-heading-icon">
          <fa v-if="expandMany" pack="fas" name="arrows-alt-v" size="sm" />
          <fa v-if="!expandMany" pack="fas" name="crosshairs" size="sm" />
        </span>
      </a>
      <a v-on:click="expandAll()" class="is-light is-pulled-right">
        <span class="icon has-text-dark panel-heading-icon">
          <fa pack="fas" name="expand-arrows-alt" size="sm" />
        </span>
      </a>
    </p>

    <!-- iterate weekdays weekday = monday, index = 0 -->
    <template v-if="!collapsed" v-for="(weekday, index) in dog.plan.week">
      <!-- day heading -->
      <a v-on:click="activate(weekday)" class="panel-block" :class="{'is-active': isActive(weekday)}">
        <p class="panel-icon">
          <fa v-if ="!isActive(weekday)" pack="fas" name="caret-right" />
          <fa v-if ="isActive(weekday)" pack="fas" name="caret-down" />
        </p>
        <span v-if="!isActive(weekday)" class="is-size-5 is-uppercase">{{ weekday.slice(0, 2) }}&nbsp;</span>
        <span v-else class="is-size-5 is-uppercase">{{ weekday }}</span>
        <template v-if="!isActive(weekday)" v-for="a in allocation(index)">
          <subCategoryTag :subCategory="a.subCategory" :textBefore="a.amount + 'g '"></subCategoryTag>&nbsp;
        </template>
      </a>

      <!-- categories overview -->
      <div v-if="isActive(weekday)" class="faked-panel-block">
        <span class="has-text-weight-bold">Categories</span>
        <template v-if="isActive(weekday)" v-for="a in allocation(index)">
          <subCategoryTag :subCategory="a.subCategory" :textBefore="a.amount + 'g '"></subCategoryTag>&nbsp;
        </template>
        <a v-on:click="toggleDayAllocationEdit(weekday)" class="icon has-text-dark is-pulled-right">
          <fa v-if="!hasAllocationEdit(weekday)" pack="fas" name="edit" />
          <fa v-else pack="fas" name="save" />
        </a>
        <a v-on:click="addAllocation(index)" :disabled="allocation(index).length === subCategoryOptions.length" class="icon is-pulled-right has-text-dark">
          <fa pack="fas" name="plus" />
        </a>
        <div class="is-clearfix"/>
      </div>

      <!-- categories edit -->
      <template v-if="hasAllocationEdit(weekday)">
        <dayAllocationEdit :dog="dog" :day="index"></dayAllocationEdit>
      </template>

      <!-- meals for that day -->
      <div v-if="isActive(weekday)" class="faked-panel-block">
        <nav class="level">
          <div v-for="timeOfDay in ['morning', 'evening']" class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6">{{ timeOfDay }}</p>
              <p v-if="plan.meals[index][timeOfDay].length" class="subtitle">
                <ul>
                  <li v-for="meal in plan.meals[index][timeOfDay]">
                    {{ getIngredient(meal.ingredient).name }}
                  </li>
                </ul>
              </p>
              <p v-else class="subtitle">nothing</p>
            </div>
          </div>
        </nav>
      </div>
    </template>
    <planAllocationWizard :dog="dog" :class="{'is-active': wizard}" v-on:close="wizard = !wizard"></planAllocationWizard>
  </nav>
</template>

<script>
import subCategoryTag from '@/components/include/SubCategoryTag'
import dayAllocationEdit from '@/components/DayAllocationEdit'
import planAllocationWizard from '@/components/PlanAllocationWizard'

export default {
  name: 'planDay',
  props: ['dog'],
  components: {
    planAllocationWizard,
    dayAllocationEdit,
    subCategoryTag
  },
  data () {
    return {
      wizard: false,
      collapsed: false,
      allocationEdit: [],  // list of weekday with activated edit panel
      active: [],
      expandMany: false,
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
    }
  },
  methods: {
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
    expandAll () {
      this.expandMany = true
      for (let day of this.plan.week) {
        this.activate(day)
      }
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
    activate: function (day) {
      if (this.active.indexOf(day) === -1) {
        if (!this.expandMany) this.active = []
        this.active.push(day)
      } else {
        if (!this.expandMany) this.active = []
        this.active.splice(this.active.indexOf(day), 1)
      }
    },
    isActive: function (day) {
      return this.active.indexOf(day) !== -1
    }
  }
}
</script>
