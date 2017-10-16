<template>
  <nav class="panel">
    <!-- day heading -->
    <p class="panel-heading">
      <span class="is-size-5 is-uppercase">{{ weekday }}</span>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" icon="edit"/>
        <fa v-if="edit" icon="save"/>
      </a>
    </p>
    <!-- categories overview -->
    <div class="faked-panel-block">
      <div class="field is-grouped is-grouped-multiline">
        <template v-for="allocation in allocations">
          <div class="control">
            <subCategoryTag :subCategory="allocation.subCategory" :amount="allocation.amount">
              <a slot="suffix" v-if="edit" v-on:click="deleteAllocation(allocation)" class="tag is-medium is-delete"></a>
            </subCategoryTag>
          </div>
        </template>
        <div v-if="edit" class="control">
          <a v-on:click="addAllocation()" :disabled="allocations.length === subCategoryOptions.length" class="button icon is-medium is-success">
            <fa icon="plus"/>
          </a>
        </div>
      </div>
    </div>

    <!-- categories edit -->
    <template v-if="edit">
      <dayAllocationEdit :dog="dog" :day="day"></dayAllocationEdit>
    </template>

  </nav>
</template>

<script>
import subCategoryTag from '@/components/include/SubCategoryTag'
import dayAllocationEdit from '@/components/DayAllocationEdit'
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
    }
  },
  components: {
    dayAllocationEdit,
    subCategoryTag
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
    allocations () {
      return this.dog.plan.allocation[this.day]
    }
  },
  methods: {
    subCategoryColor (subCategory) {
      return this.$store.getters.subCategoryColor(subCategory)
    },
    addAllocation () {
      if (this.allocations.length === this.subCategoryOptions.length) return
      let fresh = JSON.parse(JSON.stringify(this.newAllocation))
      let notUsed = (s) => this.allocations.map(a => a.subCategory).indexOf(s.subCategory) === -1
      let freshSubCategory = this.subCategoryOptions.filter(notUsed)[0].subCategory
      let distribution = this.$store.getters.planDistribution(this.dog)
      let allocation = this.$store.getters.planAllocation(this.dog)
      for (let category in this.$store.state.categories) {
        if (this.$store.state.categories[category].indexOf(freshSubCategory) !== -1) {
          let allocationAmount = allocation[category][freshSubCategory]
          let distributionAmount = distribution[category][freshSubCategory]
          if (allocationAmount < distributionAmount) {
            fresh.amount = distributionAmount - allocationAmount
            break
          } else {
            fresh.amount = 0
            break
          }
        }
      }
      fresh.subCategory = freshSubCategory
      this.allocations.push(fresh)
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
