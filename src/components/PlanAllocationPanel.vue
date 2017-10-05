<template>
  <nav class="panel">
    <p class="panel-heading">
      Food category allocation
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
    </p>
    <template v-if="!collapsed">
      <div class="faked-panel-block">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                portion per day
              </p>
              <p class="subtitle">{{ expectedQuantityPerDay }}g</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                portion per week
              </p>
              <p class="subtitle">{{ expectedQuantityWeek }}g</p>
            </div>
          </div>
        </nav>
        <p class="help is-info has-text-centered">
          {{ dog.weight }}g * {{ dog.percentOfWeight / 100 }} * {{ dogActivity }}
          <template v-if="dog.castrated">* 0.8</template> = {{ expectedQuantityPerDay }}g
          * {{ dog.plan.week.length }} = {{ expectedQuantityWeek }}g
        </p>
      </div>
      <div class="panel-block">
        <allocationChart :chartData="allocationChartData"></allocationChart>
      </div>
    </template>
  </nav>
</template>

<script>
import allocationChart from '@/components/charts/AllocationChart'

export default {
  name: 'planAllocationPanel',
  props: {
    dog: {
      required: true
    }
  },
  components: {
    allocationChart
  },
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    dogActivity () {
      return this.$store.state.activities[this.dog.activity]
    },
    expectedQuantityPerDay () {
      return parseInt(this.$store.getters.planRequirements(this.dog))
    },
    expectedQuantityWeek () {
      return parseInt(this.dog.plan.week.length * this.expectedQuantityPerDay)
    },
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
          chartData.labels.push([subCategory, currentAmount + 'g/' + recommendedAmount + 'g'])
        }
      }
      return chartData
    }
  }
}
</script>
