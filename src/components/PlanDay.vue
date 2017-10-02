<template>
  <nav class="panel">
    <p class="panel-heading">
      {{weekday}}
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-on:click="addAllocation()" :disabled="allocation.length === subCategoryOptions.length" class="icon is-pulled-right has-text-dark">
        <fa pack="fas" name="plus" />
      </a>
    </p>
    <span v-if="!collapsed" v-for="a in allocation" class="panel-block">
      <div class="field has-addons">
        <p class="control">
          <span class="select">
            <select v-model="a.subCategory" v-on:change="writeAllocation(a)">
              <option v-for="option in subCategoryOptions" v-model="a.subCategory">{{ option.subCategory }}</option>
            </select>
          </span>
        </p>
        <p class="control is-expanded">
          <input class="input" type="number" min="0" max="99999" step="25" v-model="a.amount" v-on:change="writeAllocation(a)">
        </p>
        <p class="control">
          <a class="button" v-on:click="decreaseAllocation(a)" :disabled="a.amount === 0">
            <span class="icon">
              <fa pack="fas" name="chevron-down" />
            </span>
          </a>
        </p>
        <p class="control">
          <a class="button" v-on:click="increaseAllocation(a)">
            <span class="icon">
              <fa pack="fas" name="chevron-up" />
            </span>
          </a>
        </p>
        <p class="control">
          <a class="button" v-on:click="deleteAllocation(a)">
            <span class="icon">
              <fa pack="fas" name="trash" />
            </span>
          </a>
        </p>
      </div>
    </span>
  </nav>
</template>

<script>
import subCategoryTag from '@/components/SubCategoryTag'
import { ADD_OR_UPDATE_DAY_ALLOCATION, REMOVE_DAY_ALLOCATION } from '@/store/mutation-types'

export default {
  name: 'planDay',
  props: ['dog', 'weekday', 'index'],
  components: {
    subCategoryTag
  },
  data () {
    return {
      expandedCreate: true,
      expandAll: false,
      collapsed: false,
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
    allocation () {
      return this.plan.allocation[this.index]
    },
    subCategoryOptions () {
      return this.$store.getters.subCategories
    }
  },
  methods: {
    addAllocation () {
      this.collapsed = false
      if (this.allocation.length === this.subCategoryOptions.length) return
      let fresh = JSON.parse(JSON.stringify(this.newAllocation))
      let freshSubCategory = this.subCategoryOptions.filter(s => this.allocation.map(a => a.subCategory).indexOf(s.subCategory) === -1)[0].subCategory
      fresh.subCategory = freshSubCategory
      this.allocation.push(fresh)
    },
    increaseAllocation (allocation) {
      allocation.amount += 25
      this.writeAllocation(allocation)
    },
    decreaseAllocation (allocation) {
      allocation.amount -= 25
      this.writeAllocation(allocation)
    },
    writeAllocation (allocation) {
      allocation.amount = parseInt(allocation.amount)
      this.$store.commit(ADD_OR_UPDATE_DAY_ALLOCATION, {
        dog: this.dog.id,
        day: this.index,
        allocation
      })
    },
    deleteAllocation (allocation) {
      this.$store.commit(REMOVE_DAY_ALLOCATION, {
        dog: this.dog.id,
        day: this.index,
        allocation
      })
    }
  }
}
</script>
