<template>
  <nav class="panel">
    <p class="panel-heading">
      Allocation
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
    </p>
    <template v-if="!collapsed">
      <div class="panel-block">
        <allocationChart :chartData="allocationChartData"></allocationChart>
      </div>
    </template>
  </nav>
</template>

<script>
import allocationChart from '@/components/AllocationChart'

export default {
  name: 'planPanel',
  props: ['dog'],
  components: {
    allocationChart
  },
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    allocationChartData () {
      let chartData = {
        datasets: [{
          data: [],
          stack: 'recommended',
          backgroundColor: [],
          label: 'recommended'
        },
        {
          data: [],
          stack: 'assignement',
          backgroundColor: [],
          label: 'assigned'
        },
        {
          data: [],
          stack: 'assignement',
          backgroundColor: [],
          label: 'missing'
        }],
        labels: []
      }
      for (let category in this.$store.getters.planDistribution(this.dog)) {
        let distSubCategories = this.$store.getters.planDistribution(this.dog)[category]
        let allocSubCategories = this.$store.getters.planAllocation(this.dog)[category]
        for (let subCategory in distSubCategories) {
          let recommendedAmount = distSubCategories[subCategory]
          let currentAmount = allocSubCategories[subCategory]
          chartData.datasets[0].data.push(recommendedAmount)
          chartData.datasets[0].backgroundColor.push(
            this.$store.state.ui.subCategoryColors[subCategory]
          )
          if (recommendedAmount - currentAmount > 0) {
            chartData.datasets[1].data.push(currentAmount)
            chartData.datasets[1].backgroundColor.push(
              this.$store.state.ui.subCategoryColors[subCategory]
            )
            chartData.datasets[2].data.push(recommendedAmount - currentAmount)
            chartData.datasets[2].backgroundColor.push('#dbdbdb')
          } else {
            chartData.datasets[1].data.push(currentAmount)
            chartData.datasets[1].backgroundColor.push(
              this.$store.state.ui.subCategoryColors[subCategory]
            )
            chartData.datasets[2].data.push(0)
            chartData.datasets[2].backgroundColor.push('grey')
          }
          chartData.labels.push(currentAmount + 'g / ' + recommendedAmount + 'g ' + subCategory)
        }
      }
      return chartData
    }
  }
}
</script>
