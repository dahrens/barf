<template>
  <div class="category-sliders">
    <template v-for="subCategory in subCategories">
      <div class="columns">
        <div class="column is-3">
          <span class="is-pulled-right">
            <subCategoryTag :subCategory="subCategory" :size="'is-size-7'"></subCategoryTag>
          </span>
        </div>
        <div class="column is-6">
          <subCategorySlider
            v-on:changed="onCategoryChange"
            :sliderConfig="sliderConfig"
            :subCategory="subCategory"
            :value="plan.distribution[category][subCategory]"></subCategorySlider>
        </div>
        <div class="column is-3">
          <span>{{ parseInt(planDistribution[subCategory]) }}g</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import subCategorySlider from '@/components/SubCategorySlider'
import subCategoryTag from '@/components/SubCategoryTag'
import { UPDATE_PLAN_SUBCATEGORY_DISTRIBUTION } from '@/store/mutation-types'

export default {
  name: 'planPanel',
  props: ['dog', 'category', 'sliderConfig'],
  components: {
    subCategorySlider,
    subCategoryTag
  },
  data () {
    return {
      used: []
    }
  },
  computed: {
    plan () {
      return this.dog.plan
    },
    subCategories () {
      return this.$store.getters.subCategories.filter(c => c.category === this.category).map(e => e.subCategory)
    },
    planDistribution () {
      return this.$store.getters.planDistribution(this.dog)[this.category]
    }
  },
  methods: {
    onCategoryChange (payload) {
      // remind last usage of the slider
      if (this.used.indexOf(payload.subCategory) !== -1) {
        this.used.splice(this.used.indexOf(payload.subCategory), 1)
      }
      this.used.unshift(payload.subCategory)
      // gather together some neccessary data
      let newValue = payload.value
      let subCategory = payload.subCategory
      let diff = newValue - this.plan.distribution[this.category][subCategory]
      let others = this.subCategories.filter(s => s !== subCategory)
      // we don't need to do anything if the value did not change at all
      if (diff === 0) return
      // for readablinty reasons - it indicates if the value was increased
      let increased = diff > 0
      // the difference is needed as absolute value from now on
      diff = Math.abs(diff)
      // the distribution holds new values for the commit later
      let distribution = this.plan.distribution[this.category]
      // sort the remaining sliders by last usage
      let sortUsedLast = others.sort((a, b) => {
        let adx = this.used.indexOf(a)
        let bdx = this.used.indexOf(b)
        if (adx === -1 && bdx === -1) return 0  // both never used
        if (adx !== -1 && bdx === -1) return 1  // a was never used, but b
        if (adx === -1 && bdx !== -1) return -1  // b was never used, but a
        if (adx < bdx) return 1  // both were used... but a was touched before b
        if (adx > bdx) return -1  // the case above vice versa
      })
      // iterate the subcategories and add or remove the diff
      // until we reach diff = 0 as long as the value stays between 0 and 100
      for (let subCategory of sortUsedLast) {
        if (diff === 0) break
        let currentValue = distribution[subCategory]
        if (increased) {
          let n = currentValue - diff
          if (n >= 0) {
            distribution[subCategory] = n
            diff = 0
          } else {
            diff = Math.abs(n)
            distribution[subCategory] = 0
          }
        } else {  // increase others as user decreased one
          let n = currentValue + diff
          if (n <= 100) {
            distribution[subCategory] = n
            diff = 0
          } else {
            diff = (n - 100)
            distribution[subCategory] = 100
          }
        }
      }
      // finally set the requested value
      this.plan.distribution[this.category][subCategory] = newValue
      // and commit everything into the store
      this.$store.commit(UPDATE_PLAN_SUBCATEGORY_DISTRIBUTION, {
        dog: this.dog.id,
        category: this.category,
        distribution: distribution
      })
      // force updating this component for the sliders to react
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.category-sliders {
  margin-top: 1.5em;
}
.vue-slider-component {
  margin-bottom: 0.5em;
}
</style>
