<template>
  <div class="plan-distribution-edit">
    <div class="faked-panel-block">
      <template>
        <div class="columns distribution-slider">
          <div class="column is-3">
            <span class="has-text-dark">animal</span>
          </div>
          <div class="column is-6">
            <vue-slider @callback="setAnimalVegetable" v-bind="getPlanCategoryDistribution" v-model="getPlanCategoryDistribution.value"></vue-slider>
          </div>
          <div class="column is-3">
            <span class="has-text-dark is-pulled-left">vegetables</span>
          </div>
        </div>
        <categorySliders @changed="setDistribution" :dog="dog" :category="'animal'" :sliderConfig="sliderConfig"></categorySliders>
        <categorySliders @changed="setDistribution" :dog="dog" :category="'vegetables'" :sliderConfig="sliderConfig"></categorySliders>
      </template>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import subCategoryTag from '@/components/SubCategoryTag'
import subCategorySlider from '@/components/SubCategorySlider'
import categorySliders from '@/components/CategorySliders'
import {
  UPDATE_PLAN_DISTRIBUTION, UPDATE_PLAN_CATEGORY_DISTRIBUTION
} from '@/store/mutation-types'

export default {
  name: 'planPanel',
  props: {
    dog: {
      required: true
    },
    commit: {
      required: false,
      default: () => (true)
    }
  },
  components: {
    vueSlider,
    subCategorySlider,
    subCategoryTag,
    categorySliders
  },
  data () {
    return {
      edit: false,
      collapsed: false,
      variance: 50,
      sliderConfig: {
        value: 0,
        min: 0,
        max: 100,
        speed: 0.5,
        formatter: '{value}%',
        bgStyle: {
          'backgroundColor': 'whitesmoke',
          'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        },
        sliderStyle: [
          { 'backgroundColor': '#363636' },
          { 'backgroundColor': '#363636' }
        ],
        processStyle: { 'backgroundColor': '#363636' },
        tooltipStyle: [
          { 'backgroundColor': '#363636', 'borderColor': '#363636' },
          { 'backgroundColor': '#363636', 'borderColor': '#363636' }
        ]
      }
    }
  },
  computed: {
    plan () {
      return this.dog.plan
    },
    getPlanCategoryDistribution () {
      let slider = JSON.parse(JSON.stringify(this.sliderConfig))
      slider.value = this.plan.animal
      return slider
    }
  },
  methods: {
    setAnimalVegetable (value) {
      if (this.commit) {
        this.$store.commit(
          UPDATE_PLAN_CATEGORY_DISTRIBUTION,
          {dog: this.dog.id, value}
        )
      } else {
        this.plan.animal = value
        this.plan.vegetables = 100 - value
      }
    },
    setDistribution (distribution) {
      if (this.commit) {
        this.$store.commit(UPDATE_PLAN_DISTRIBUTION, {
          dog: this.dog.id,
          distribution
        })
      } else {
        this.plan.distribution = distribution
      }
    }
  }
}
</script>

<style lang="sass">

.distribution-slider
  margin-top: 2.2em

</style>
