<template>
  <nav class="panel">
    <p class="panel-heading">
      Week
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" pack="fas" name="edit" />
        <fa v-if="edit" pack="fas" name="save" />
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
    </p>
    <template v-if="!collapsed && edit" v-for="(weekday, index) in dog.plan.week">
      <p class="faked-panel-block">
        <a v-on:click="addAllocation(index)" :disabled="allocation(index).length === subCategoryOptions.length" class="icon is-pulled-right has-text-dark">
          <fa pack="fas" name="plus" />
        </a>
        {{weekday}}
      </p>
      <span v-for="a in allocation(index)" class="panel-block">
        <div class="field has-addons">
          <p class="control">
            <a class="button is-static">
              <span class="icon is-medium" v-bind:style="{ color: subCategoryColor(a.subCategory) }">
                <fa size="2x" pack="fas" name="square"/>
              </span>
            </a>
          </p>
          <p class="control">
            <span class="select">
              <select v-model="a.subCategory" v-on:change="writeAllocation(a, index)">
                <option v-for="option in subCategoryOptions" v-model="a.subCategory">
                  {{ option.subCategory }}
                </option>
              </select>
            </span>
          </p>
          <p class="control is-expanded">
            <input class="input" type="number" min="0" max="99999" step="25" v-model="a.amount" v-on:change="writeAllocation(a, index)">
          </p>
          <p class="control">
            <a class="button" v-on:click="increaseAllocation(a)">
              <span class="icon">
                <fa pack="fas" name="chevron-up" />
              </span>
            </a>
          </p>
          <p class="control">
            <a class="button" v-on:click="decreaseAllocation(a)" :disabled="a.amount === 0">
              <span class="icon">
                <fa pack="fas" name="chevron-down" />
              </span>
            </a>
          </p>
          <p class="control">
            <a class="button" v-on:click="deleteAllocation(a, index)">
              <span class="icon">
                <fa pack="fas" name="trash" />
              </span>
            </a>
          </p>
        </div>
      </span>
    </template>
    <template v-if="!collapsed && !edit" v-for="(weekday, index) in dog.plan.week">
      <a v-on:click="activate(weekday)" class="panel-block" :class="{'is-active': isActive(weekday)}">
        <p class="panel-icon">
          <fa v-if ="!isActive(weekday)" pack="fas" name="caret-right" />
          <fa v-if ="isActive(weekday)" pack="fas" name="caret-down" />
        </p>
        <span>{{ weekday }}</span>&nbsp;
        <template v-for="a in allocation(index)">
          <subCategoryTag :subCategory="a.subCategory" :textBefore="a.amount + 'g '"></subCategoryTag>&nbsp;
        </template>
      </a>
      <span v-if="isActive(weekday)" class="panel-block">
        hi there
      </span>
    </template>
    <planAllocationWizard :dog="dog" :class="{'is-active': wizard}" v-on:close="wizard = !wizard"></planAllocationWizard>
  </nav>
</template>

<script>
import subCategoryTag from '@/components/include/SubCategoryTag'
import planAllocationWizard from '@/components/PlanAllocationWizard'
import { ADD_OR_UPDATE_DAY_ALLOCATION, REMOVE_DAY_ALLOCATION } from '@/store/mutation-types'

export default {
  name: 'planDay',
  props: ['dog'],
  components: {
    planAllocationWizard,
    subCategoryTag
  },
  data () {
    return {
      wizard: false,
      collapsed: false,
      edit: false,
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
    subCategoryColor (subCategory) {
      return this.$store.state.ui.subCategoryColors[subCategory]
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
    },
    allocation (index) {
      return this.plan.allocation[index]
    },
    addAllocation (index) {
      this.collapsed = false
      if (this.allocation(index).length === this.subCategoryOptions.length) return
      let fresh = JSON.parse(JSON.stringify(this.newAllocation))
      let freshSubCategory = this.subCategoryOptions.filter(s => this.allocation(index).map(a => a.subCategory).indexOf(s.subCategory) === -1)[0].subCategory
      fresh.subCategory = freshSubCategory
      this.allocation(index).push(fresh)
    },
    increaseAllocation (allocation) {
      allocation.amount += 25
      this.writeAllocation(allocation)
    },
    decreaseAllocation (allocation) {
      allocation.amount -= 25
      this.writeAllocation(allocation)
    },
    writeAllocation (allocation, index) {
      allocation.amount = parseInt(allocation.amount)
      this.$store.commit(ADD_OR_UPDATE_DAY_ALLOCATION, {
        dog: this.dog.id,
        day: index,
        allocation
      })
    },
    deleteAllocation (allocation, index) {
      this.$store.commit(REMOVE_DAY_ALLOCATION, {
        dog: this.dog.id,
        day: index,
        allocation
      })
    }
  }
}
</script>
