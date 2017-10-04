<template>
  <nav class="panel">
    <p class="panel-heading">
      <span>Dog</span>
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" pack="fas" name="edit" />
        <fa v-if="edit" pack="fas" name="save" />
      </a>
    </p>
    <template v-if="!collapsed">
      <dogDetail v-if="!edit" :dog="dog"></dogDetail>
      <dogEdit v-if="edit" :dog="dog"></dogEdit>
      <planEdit v-if="edit" :dog="dog"></planEdit>
      <div class="faked-panel-block">
        <distributionChart :chartData="distributionChartData"></distributionChart>
      </div>
    </template>
  </nav>
</template>

<script>
import planEdit from '@/components/PlanEdit'
import dogEdit from '@/components/DogEdit'
import dogDetail from '@/components/DogDetail'
import distributionChart from '@/components/charts/DistributionChart'
import { UPDATE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogPanel',
  props: ['dog'],
  components: {
    planEdit,
    dogEdit,
    dogDetail,
    distributionChart
  },
  data () {
    return {
      collapsed: false,
      edit: false
    }
  },
  computed: {
    distributionChartData () {
      let chartData = {
        datasets: [{
          data: [],
          backgroundColor: [],
          borderWidth: []
        }],
        labels: []
      }
      for (let category in this.$store.getters.planDistribution(this.dog)) {
        let distSubCategories = this.$store.getters.planDistribution(this.dog)[category]
        for (let subCategory in distSubCategories) {
          let recommendedAmount = distSubCategories[subCategory]
          chartData.datasets[0].data.push(recommendedAmount)
          chartData.datasets[0].backgroundColor.push(
            this.$store.state.ui.subCategoryColors[subCategory]
          )
          chartData.datasets[0].borderWidth.push(3)
          chartData.labels.push(recommendedAmount + 'g ' + subCategory)
        }
      }
      return chartData
    },
    planedAnimalAllocation () {
      return Object.values(
        this.$store.getters.planAllocation(this.dog)['animal']
      ).reduce((a, c) => parseInt(a) + parseInt(c))
    },
    planedVegetablesAllocation () {
      return Object.values(
        this.$store.getters.planAllocation(this.dog)['vegetables']
      ).reduce((a, c) => parseInt(a) + parseInt(c))
    },
    expectedAnimalAllocation () {
      return Object.values(
        this.$store.getters.planDistribution(this.dog)['animal']
      ).reduce((a, c) => parseInt(a) + parseInt(c))
    },
    expectedVegetablesAllocation () {
      return Object.values(
        this.$store.getters.planDistribution(this.dog)['vegetables']
      ).reduce((a, c) => parseInt(a) + parseInt(c))
    }
  },
  methods: {
    toggleEdit () {
      if (this.edit) {
        this.$store.commit(UPDATE_DOG, this.dog)
      }
      this.edit = !this.edit
    }
  }
}
</script>
