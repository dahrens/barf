<template>
  <div>
    <div v-for="a in allocation" class="faked-panel-block">
      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input" type="number" min="0" max="99999" step="25" v-model="a.amount" v-on:change="writeAllocation(a)">
        </p>
        <p class="control">
          <a class="button" v-on:click="increaseAllocation(a)">
            <span class="icon">
              <fa icon="chevron-up" />
            </span>
          </a>
        </p>
        <p class="control">
          <a class="button" v-on:click="decreaseAllocation(a)" :disabled="a.amount === 0">
            <span class="icon">
              <fa icon="chevron-down" />
            </span>
          </a>
        </p>
        <p class="control">
          <a class="button is-static">
            <span class="icon is-medium" v-bind:style="{ color: subCategoryColor(a.subCategory) }">
              <fa size="2x" icon="square"/>
            </span>
          </a>
        </p>
        <p class="control is-expanded">
          <span class="select is-fullwidth">
            <select v-model="a.subCategory" v-on:change="writeAllocation(a)">
              <option v-for="option in subCategoryOptions(a.subCategory)" v-model="a.subCategory">
                {{ option.subCategory }}
              </option>
            </select>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_OR_UPDATE_DAY_ALLOCATION } from '@/store/mutation-types'

export default {
  name: 'dayAllocationEdit',
  props: {
    dog: {
      required: true
    },
    day: {
      required: true
    }
  },
  data () {
    return {
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
      return this.plan.allocation[this.day]
    }
  },
  methods: {
    subCategoryOptions (currentlySelected) {
      let f = (s) => s.subCategory === currentlySelected || this.allocation.map(a => a.subCategory).indexOf(s.subCategory) === -1
      return this.$store.getters.subCategories.filter(f)
    },
    subCategoryColor (subCategory) {
      return this.$store.getters.subCategoryColor(subCategory)
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
        day: this.day,
        allocation
      })
    }
  }
}
</script>

<style lang="sass">

</style>
