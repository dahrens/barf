<template>
  <div>
    <div class="panel-block">
      <div class="field is-horizontal">
        <div class="field-label">Fasting Days</div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field">
              <p class="control is-expanded">
                <div class="field has-addons">
                  <p v-for="(weekday, idx) in dog.plan.week" class="control">
                    <a class="button" v-on:click="toggleFastenDay(idx)" :class="{'is-success': fastenDays[idx]}">
                      <span>{{ weekday.substring(0, 2) }}</span>
                      <span class="icon">
                        <fa v-if="fastenDays[idx]" icon="check"/>
                        <fa v-else icon="times"/>
                      </span>
                    </a>
                  </p>
                </div>
              </p>
            </div>
            <p v-if="fastenDays.filter(fd => fd === true).length > 2" class="help is-danger">Are you sure that your dog should not eat on more than 2 days?</p>
            <p class="help is-info">Click on a day to toggle whether it is a fasten day or not</p>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field is-horizontal">
        <div class="field-label">Vegetarian Days</div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field">
              <p class="control is-expanded">
                <div class="field has-addons">
                  <p v-for="(weekday, idx) in dog.plan.week" class="control">
                    <a class="button" v-on:click="toggleVegetarianDay(idx)" :class="{'is-success': vegetarianDays[idx]}">
                      <span>{{ weekday.substring(0, 2) }}</span>
                      <span class="icon">
                        <fa v-if="vegetarianDays[idx]" icon="check"/>
                        <fa v-else icon="times"/>
                      </span>
                    </a>
                  </p>
                </div>
              </p>
            </div>
            <p v-if="fastenDays.filter(fd => fd === true).length > 2" class="help is-danger">Are you sure that your dog should not eat on more than 2 days?</p>
            <p class="help is-info">Click on a day to toggle whether it is a fasten day or not</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!newDog" class="panel-block">
      <div class="notification is-warning is-fullwidth">
        <span class="icon is-large fa-fw">
          <fa size="2x" icon="exclamation-triangle" />
        </span>
        <span class="is-size-5">Automatic allocation overrides all existing allocations</span>
      </div>
    </div>
    <p v-if="!newDog" class="panel-block">
      <button v-on:click="allocate" class="button is-primary is-fullwidth">
        <span class="icon">
          <fa icon="save"/>
        </span>
      </button>
    </p>
  </div>
</template>

<script>
import { round } from '@/store/utils'
import { UPDATE_PLAN_ALLOCATION } from '@/store/mutation-types'

function randomDays (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
  name: 'planAllocationWizard',
  props: {
    dog: {
      required: true
    },
    newDog: {
      required: false,
      default: () => (false)
    }
  },
  data () {
    let fastenDays = [false, false, false, false, false, false, false]
    let vegetarianDays = [false, false, false, false, false, false, false]
    let parameters = this.calculateParameters(fastenDays, vegetarianDays)
    return {
      fastenDays,
      vegetarianDays,
      parameters
    }
  },
  methods: {
    calcPortion (occurency, total, average) {
      if (!average) {
        average = this.$store.getters.dogFoodQuantityPerDay(this.dog)
      }
      return round(
        Math.min(
          parseInt(
            total / occurency
          ),
          parseInt(average)
        ),
        this.$store.state.settings.rounding
      )
    },
    calculateParameters (fastenDays, vegetarianDays, parameters) {
      let totalDays = this.dog.plan.week.length
      let fastenDayCount = fastenDays
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1]).length
      let vegDayCount = vegetarianDays
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1]).length
      let average = this.$store.getters.dogFoodQuantityPerDay(this.dog)
      let dist = this.$store.getters.planDistribution(this.dog)
      if (!parameters) {
        parameters = JSON.parse(JSON.stringify(this.$store.getters.emptyDistribution))
        let commonDays = totalDays - vegDayCount - fastenDayCount
        let minCount = 3
        let maxCount = commonDays
        for (let category in parameters) {
          for (let subCategory in parameters[category]) {
            let count = randomDays(minCount, maxCount)
            parameters[category][subCategory] = {
              count,
              portion: this.calcPortion(
                count, dist[category][subCategory]
              )
            }
          }
        }
      }
      if (vegDayCount) {
        parameters['vegetables']['vegetables'].count = vegDayCount
        parameters['vegetables']['vegetables'].portion = this.calcPortion(
          vegDayCount, dist['vegetables']['vegetables'], average / 2
        )
        parameters['vegetables']['grains'].count = vegDayCount
        parameters['vegetables']['grains'].portion = this.calcPortion(
          vegDayCount, dist['vegetables']['grains'], average / 2
        )
      }
      return parameters
    },
    toggleFastenDay (day) {
      this.fastenDays[day] = !this.fastenDays[day]
      this.parameters = this.calculateParameters(this.fastenDays, this.vegetarianDays)
      this.$forceUpdate()
    },
    toggleVegetarianDay (day) {
      this.vegetarianDays[day] = !this.vegetarianDays[day]
      this.parameters = this.calculateParameters(this.fastenDays, this.vegetarianDays)
      this.$forceUpdate()
    },
    allocate () {
      let fastenDays = this.fastenDays
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1])
      let vegetarianDays = this.vegetarianDays
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1])

      let todo = []
      let allocation = []

      for (let day in this.dog.plan.week) {
        todo.push(parseInt(day))
        allocation.push([])
      }

      if (fastenDays.length) {
        for (let day of fastenDays) {
          let idx = todo.indexOf(day)
          if (idx) {
            todo.splice(idx, 1)
          }
        }
      }

      if (vegetarianDays.length) {
        for (let day of vegetarianDays) {
          allocation[day].push({
            subCategory: 'vegetables',
            amount: this.parameters['vegetables']['vegetables'].portion
          })
          this.parameters['vegetables']['vegetables'].count--
          allocation[day].push({
            subCategory: 'grains',
            amount: this.parameters['vegetables']['grains'].portion
          })
          this.parameters['vegetables']['grains'].count--
          let idx = todo.indexOf(day)
          if (idx) {
            todo.splice(idx, 1)
          }
        }
      }

      for (let idx in todo) {
        let daysLeft = todo.length - idx
        let day = todo[idx]
        for (let category in this.parameters) {
          for (let subCategory in this.parameters[category]) {
            let count = this.parameters[category][subCategory].count
            if (!count) continue
            let portion = this.parameters[category][subCategory].portion
            if ((count < daysLeft && randomDays(0, 1)) || count === daysLeft) {
              allocation[day].push({
                subCategory: subCategory,
                amount: portion
              })
              this.parameters[category][subCategory].count--
            }
          }
        }
      }

      if (!this.newDog) {
        this.$store.commit(UPDATE_PLAN_ALLOCATION, {
          dog: this.dog.id,
          allocation
        })
        this.$emit('close')
      } else {
        this.dog.plan.allocation = allocation
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.is-expaned
  display: flex
  flex: 0 0 100%
</style>
