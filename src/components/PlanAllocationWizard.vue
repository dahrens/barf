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
    return {
      fastenDays: [false, false, false, false, false, false, false],
      vegetarianDays: [false, false, false, false, false, false, false],
      meatCount: 0,
      meatPortion: 0,
      stomachCount: 0,
      stomachPortion: 0,
      entrailsCount: 0,
      entrailsPortion: 0,
      bonesCount: 0,
      bonesPortion: 0,
      fruitsCount: 0,
      fruitsPortion: 0,
      vegetablesCount: 0,
      vegetablesPortion: 0,
      grainsCount: 0,
      grainsPortion: 0
    }
  },
  methods: {
    calcPortion (occurency, total, average) {
      if (!average) average = this.$store.getters.dogFoodQuantityPerDay(this.dog)
      let roundSettings = this.$store.state.settings.rounding
      return round(
        Math.min(
          parseInt(
            total / occurency
          ),
          parseInt(average)
        ),
        roundSettings
      )
    },
    calculateDefaults () {
      let totalDays = this.dog.plan.week.length
      let average = this.$store.getters.dogFoodQuantityPerDay(this.dog)
      let vegDayCount = this.vegetarianDays
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1]).length
      let dist = this.$store.getters.planDistribution(this.dog)
      this.meatCount = Math.ceil((totalDays - vegDayCount) / 2)
      this.meatPortion = this.calcPortion(
        this.meatCount, dist['animal']['meat']
      )
      this.stomachCount = totalDays - vegDayCount - this.meatCount
      this.stomachPortion = this.calcPortion(
        this.stomachCount, dist['animal']['stomach']
      )
      this.entrailsCount = randomDays(this.stomachCount + this.meatCount, this.meatCount)
      this.entrailsPortion = this.calcPortion(
        this.entrailsCount, dist['animal']['entrails']
      )
      this.bonesCount = randomDays(this.stomachCount + this.meatCount, this.meatCount)
      this.bonesPortion = this.calcPortion(
        this.bonesCount, dist['animal']['bones']
      )
      this.fruitsCount = randomDays(this.stomachCount + this.meatCount, this.stomachCount)
      this.fruitsPortion = this.calcPortion(
        this.fruitsCount, dist['vegetables']['fruits']
      )
      this.vegetablesCount = randomDays(this.stomachCount + this.meatCount, this.meatCount)
      this.vegetablesPortion = this.calcPortion(
        this.vegetablesCount, dist['vegetables']['vegetables']
      )
      this.grainsCount = randomDays(this.stomachCount + this.meatCount, this.meatCount)
      this.grainsPortion = this.calcPortion(
        this.grainsCount, dist['vegetables']['grains']
      )
      if (vegDayCount) {
        this.vegetablesPortion = this.calcPortion(
          vegDayCount, dist['vegetables']['vegetables'], average / 2
        )
        this.grainsPortion = this.calcPortion(
          vegDayCount, dist['vegetables']['grains'], average / 2
        )
      }
    },
    toggleFastenDay (day) {
      this.fastenDays[day] = !this.fastenDays[day]
      this.$forceUpdate()
    },
    toggleVegetarianDay (day) {
      this.vegetarianDays[day] = !this.vegetarianDays[day]
      this.$forceUpdate()
    },
    allocate () {
      this.calculateDefaults()
      let fastenDays = this.fastenDays
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1])
      let vegetarianDays = this.vegetarianDays
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1])
      let vegDayCount = vegetarianDays.length
      let stomachCount = this.stomachCount
      let entrailsCount = this.entrailsCount
      let bonesCount = this.bonesCount
      let fruitsCount = this.fruitsCount
      let vegetablesCount = this.vegetablesCount
      let grainsCount = this.grainsCount

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

      if (vegDayCount) {
        for (let day of vegetarianDays) {
          allocation[day].push({
            subCategory: 'vegetables',
            amount: this.vegetablesPortion
          })
          allocation[day].push({
            subCategory: 'grains',
            amount: this.grainsPortion
          })
          let idx = todo.indexOf(day)
          if (idx) {
            todo.splice(idx, 1)
          }
        }
      }

      for (let idx in todo) {
        let daysLeft = todo.length - idx
        let day = todo[idx]
        if ((stomachCount < daysLeft && randomDays(0, 1)) || stomachCount === daysLeft) {
          allocation[day].push({
            subCategory: 'stomach',
            amount: this.stomachPortion
          })
          stomachCount--
        } else {
          allocation[day].push({
            subCategory: 'meat',
            amount: this.meatPortion
          })
          this.meatCount--
        }
        if ((entrailsCount < daysLeft && randomDays(0, 1)) || entrailsCount === daysLeft) {
          allocation[day].push({
            subCategory: 'entrails',
            amount: this.entrailsPortion
          })
          entrailsCount--
        }
        if ((bonesCount < daysLeft && randomDays(0, 1)) || bonesCount === daysLeft) {
          allocation[day].push({
            subCategory: 'bones',
            amount: this.bonesPortion
          })
          bonesCount--
        }
        if ((fruitsCount < daysLeft && randomDays(0, 1)) || fruitsCount === daysLeft) {
          allocation[day].push({
            subCategory: 'fruits',
            amount: this.fruitsPortion
          })
          fruitsCount--
        }
        if (!vegDayCount) {
          if ((vegetablesCount < daysLeft && randomDays(0, 1)) || vegetablesCount === daysLeft) {
            allocation[day].push({
              subCategory: 'vegetables',
              amount: this.vegetablesPortion
            })
            vegetablesCount--
          }
          if ((grainsCount < daysLeft && randomDays(0, 1)) || grainsCount === daysLeft) {
            allocation[day].push({
              subCategory: 'grains',
              amount: this.grainsPortion
            })
            grainsCount--
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
