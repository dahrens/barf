<template>
  <nav class="panel">
    <p class="panel-heading">
      Plan for <strong>{{ dog.name }}</strong>
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-on:click="toggleEdit()" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" pack="fas" name="edit" />
        <fa v-if="edit" pack="fas" name="save" />
      </a>
    </p>
    <template v-if="!collapsed">
      <div v-if="edit" class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="dog.name" class="input" type="text" placeholder="Name">
              <span class="icon is-left">
                <fa pack="fas" name="address-card" />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <strong>Ration</strong>&nbsp;
        {{ dog.weight }}g * 0.02 * {{ dogActivity }}
        <template v-if="dog.castrated">* 0.8</template> = {{ expectedQuantityPerDay }}g
        * {{ dog.plan.week.length }} = {{ expectedQuantityWeek }}g
      </div>
      <div class="faked-panel-block">
        <distributionChart :chartData="distributionChartData"></distributionChart>
      </div>
      <planEdit v-if="edit" :dog="dog"></planEdit>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Weight</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field">
            <p class="control has-icons-left">
              <input v-model="dog.weight" class="input" type="number" placeholder="weight" min="0" max="150000" step="50">
              <span class="icon is-left">
                <fa pack="fas" name="tachometer-alt" />
              </span>
            </p>
          </div>
          <div v-else>
            {{ dog.weight }}g
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Activity</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field is-expanded">
            <div class="field has-addons">
              <div class="control">
                <a class="button is-static">
                  <span class="icon is-left">
                    <fa pack="fas" name="futbol" />
                  </span>
                </a>
              </div>
              <div class="select is-fullwidth">
                <select v-model="dog.activity">
                  <option v-for="option in activities" v-model="dog.activity">{{ option.activity }}</option>
                </select>
              </div>
            </div>
          </div>
          <div v-else>
            moderate
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label">
          <label class="label">Sex</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field is-narrow">
            <div class="control">
              <label class="radio">
                <input type="radio" name="sex" v-model="dog.sex" value="m">
                <span class="icon">
                  <fa pack="fas" name="mars" />
                </span>
              </label>
              <label class="radio">
                <input type="radio" name="sex" v-model="dog.sex" value="f">
                <span class="icon">
                  <fa pack="fas" name="venus" />
                </span>
              </label>
            </div>
          </div>
          <div v-else>
            <span class="icon">
              <fa pack="fas" name="mars" />
            </span>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">
            Castrated
          </label>
        </div>
        <div class="field-body">
          <input v-if="edit" type="checkbox" v-model="dog.castrated">
          <div v-else>
            <span class="icon">
              <fa pack="fas" name="check" />
            </span>
          </div>
        </div>
      </div>
    </template>
  </nav>
</template>

<script>
import planEdit from '@/components/PlanEdit'
import distributionChart from '@/components/DistributionChart'
import allocationChart from '@/components/AllocationChart'
import { UPDATE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogPanel',
  props: ['dog'],
  components: {
    planEdit,
    distributionChart,
    allocationChart
  },
  data () {
    return {
      collapsed: false,
      edit: false
    }
  },
  computed: {
    dogActivity () {
      return this.$store.state.activities[this.dog.activity]
    },
    activities () {
      let options = []
      for (let activity in this.$store.state.activities) {
        let value = this.$store.state.activities[activity]
        options.push({
          activity,
          value
        })
      }
      return options
    },
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
      return this.$store.getters.planRequirements(this.dog)
    },
    expectedQuantityWeek () {
      return this.dog.plan.week.length * this.expectedQuantityPerDay
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

<style lang="sass" scoped>

.faked-panel-block
  padding: 1em
  border-bottom: 1px solid #dbdbdb
  border-left: 1px solid #dbdbdb
  border-right: 1px solid #dbdbdb

</style>
