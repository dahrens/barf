<template>
  <nav class="panel">
    <p class="panel-heading">
      <span>Plan</span>
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

      <planDistributionEdit v-if="edit" :dog="dog"></planDistributionEdit>

    </template>
  </nav>
</template>

<script>
import planDistributionEdit from '@/components/PlanDistributionEdit'
import dogEdit from '@/components/DogEdit'
import dogDetail from '@/components/DogDetail'
import { UPDATE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogPanel',
  props: ['dog'],
  components: {
    planDistributionEdit,
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
    expectedQuantityPerDay () {
      return parseInt(this.$store.getters.planRequirements(this.dog))
    },
    expectedQuantityWeek () {
      return parseInt(this.dog.plan.week.length * this.expectedQuantityPerDay)
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
