<template>
  <nav class="panel">
    <p class="panel-heading">
      Plan
      <strong>
        <span
          :class="{
            'has-text-danger': Math.abs(planAnimalAllocation + planVegetablesAllocation - expectedQuantityWeek) > variance,
            'has-text-success': Math.abs(planAnimalAllocation + planVegetablesAllocation - expectedQuantityWeek) < variance
          }">
          {{ planAnimalAllocation + planVegetablesAllocation }}g
        </span>
        / {{ expectedQuantityWeek }}g per week
      </strong>
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" pack="fas" name="edit" />
        <fa v-if="edit" pack="fas" name="save" />
      </a>
    </p>
    <div v-if="!collapsed && !edit" class="columns is-gapless faked-panel-block">
      <div class="column">
        <span class="subtitle">Distribution (expected)</span>
        <doughnutChart :chartData="distributionChart"></doughnutChart>
      </div>
      <div class="column">
        <span class="subtitle">Allocation</span>
        <doughnutChart :chartData="allocationChart"></doughnutChart>
      </div>
    </div>
    <p v-if="!collapsed && edit" class="faked-panel-block">
      <template>
        <div class="columns distribution-slider">
          <div class="column is-3">
            <span class="is-pulled-right">animal</span>
          </div>
          <div class="column is-6">
            <vue-slider @callback="setPlanCategoryDistribution" v-bind="getPlanCategoryDistribution" v-model="getPlanCategoryDistribution.value"></vue-slider>
          </div>
          <div class="column is-3">
            <span class="is-pulled-left">vegetables</span>
          </div>
        </div>
        <categorySliders :dog="dog" :category="'animal'" :sliderConfig="sliderConfig"></categorySliders>
        <categorySliders :dog="dog" :category="'vegetables'" :sliderConfig="sliderConfig"></categorySliders>
      </template>
    </p>
  </nav>
</template>

<script>
import vueSlider from 'vue-slider-component'
import subCategoryTag from '@/components/SubCategoryTag'
import subCategorySlider from '@/components/SubCategorySlider'
import categorySliders from '@/components/CategorySliders'
import doughnutChart from '@/components/DoughnutChart'
import { UPDATE_PLAN_CATEGORY_DISTRIBUTION } from '@/store/mutation-types'

export default {
  name: 'planPanel',
  props: ['dog'],
  components: {
    vueSlider,
    subCategorySlider,
    subCategoryTag,
    categorySliders,
    doughnutChart
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
          { 'backgroundColor': 'green' }
        ],
        processStyle: { 'backgroundColor': '#363636' },
        tooltipStyle: [
          { 'backgroundColor': 'green', 'borderColor': 'green' },
          { 'backgroundColor': 'green', 'borderColor': 'green' }
        ]
      }
    }
  },
  computed: {
    plan () {
      return this.dog.plan
    },
    allocationChart () {
      let chartData = {
        datasets: [{
          data: [],
          backgroundColor: []
        }],
        labels: []
      }
      for (let category in this.$store.getters.planAllocation(this.dog)) {
        let subCategories = this.$store.getters.planAllocation(this.dog)[category]
        for (let subCategory in subCategories) {
          let amount = subCategories[subCategory]
          chartData.datasets[0].data.push(amount)
          chartData.datasets[0].backgroundColor.push(
            this.$store.state.ui.subCategoryColors[subCategory]
          )
          chartData.labels.push(subCategory)
        }
      }
      let diff = this.expectedQuantityWeek - (this.planAnimalAllocation + this.planVegetablesAllocation)
      if (diff > 0) {
        chartData.datasets[0].data.push(diff)
        chartData.datasets[0].backgroundColor.push('#FF272D')
        chartData.labels.push('missing to fit expected value')
      }
      return chartData
    },
    distributionChart () {
      let chartData = {
        datasets: [{
          data: [],
          backgroundColor: []
        }],
        labels: []
      }
      for (let category in this.$store.getters.planDistribution(this.dog)) {
        let subCategories = this.$store.getters.planDistribution(this.dog)[category]
        for (let subCategory in subCategories) {
          let amount = subCategories[subCategory]
          chartData.datasets[0].data.push(amount)
          chartData.datasets[0].backgroundColor.push(
            this.$store.state.ui.subCategoryColors[subCategory]
          )
          chartData.labels.push(subCategory)
        }
      }
      return chartData
    },
    planAllocation () {
      return this.$store.getters.planAllocation(this.dog)
    },
    planAnimalAllocation () {
      return Object.values(
        this.$store.getters.planAllocation(this.dog)['animal']
      ).reduce((a, c) => parseInt(a) + parseInt(c))
    },
    planVegetablesAllocation () {
      return Object.values(
        this.$store.getters.planAllocation(this.dog)['vegetables']
      ).reduce((a, c) => parseInt(a) + parseInt(c))
    },
    getPlanCategoryDistribution () {
      let slider = JSON.parse(JSON.stringify(this.sliderConfig))
      slider.value = this.plan.animal
      return slider
    },
    expectedQuantityPerDay () {
      return this.$store.getters.planRequirements(this.dog)
    },
    expectedQuantityWeek () {
      return this.plan.week.length * this.expectedQuantityPerDay
    },
    expectedAnimalDistribution () {
      return this.$store.getters.planDistribution(this.dog)['animal']
    },
    expectedVegetablesDistribution () {
      return this.$store.getters.planDistribution(this.dog)['vegetables']
    }
  },
  methods: {
    setPlanCategoryDistribution (value) {
      this.$store.commit(
        UPDATE_PLAN_CATEGORY_DISTRIBUTION,
        {dog: this.dog.id, value: value}
      )
    }
  }
}
</script>

<style scoped>
.distribution-slider {
  margin-top: 2.2em;
}

.faked-panel-block {
  padding: 1em ;
  border-bottom: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
}
</style>
