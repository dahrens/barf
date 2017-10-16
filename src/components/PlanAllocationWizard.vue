<template>
  <div>
    <div class="panel-block">
      <div class="field is-horizontal">
        <div class="field-label">Fasting Days</div>
        <div class="field-body">
          <div class="field">
            <div class="field">
              <p class="control buttons-expanded">
                <div class="field has-addons">
                  <p v-for="(weekday, idx) in dog.plan.week" class="control">
                    <a class="button" v-on:click="toggleFastenDay(idx)" :class="{'is-success': fastenWeek[idx]}">
                      <span>{{ weekday.substring(0, 2) }}</span>
                      <span class="icon">
                        <fa v-if="fastenWeek[idx]" icon="check"/>
                        <fa v-else icon="times"/>
                      </span>
                    </a>
                  </p>
                </div>
              </p>
            </div>
            <p v-if="fastenWeek.filter(fd => fd === true).length > 2" class="help is-danger">Are you sure that your dog should not eat on more than 2 days?</p>
            <p class="help is-info">Click on a day to toggle whether it is a fasten day or not</p>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field is-horizontal">
        <div class="field-label">Vegetarian Days</div>
        <div class="field-body">
          <div class="field">
            <div class="field">
              <p class="control buttons-expanded">
                <div class="field has-addons">
                  <p v-for="(weekday, idx) in dog.plan.week" class="control">
                    <a class="button" v-on:click="toggleVegetarianDay(idx)" :class="{'is-success': vegetarianWeek[idx]}">
                      <span>{{ weekday.substring(0, 2) }}</span>
                      <span class="icon">
                        <fa v-if="vegetarianWeek[idx]" icon="check"/>
                        <fa v-else icon="times"/>
                      </span>
                    </a>
                  </p>
                </div>
              </p>
            </div>
            <p v-if="fastenWeek.filter(fd => fd === true).length > 2" class="help is-danger">Are you sure that your dog should not eat on more than 2 days?</p>
            <p class="help is-info">Click on a day to toggle whether it is a fasten day or not</p>
          </div>
        </div>
      </div>
    </div>
    <template v-for="(subCategories, category) in parameters">
      <div class="panel-block">
        <div class="field is-horizontal">
          <div class="field-label is-capitalized">
            {{ category }}
          </div>
          <div class="field-body">
            <div class="field">
              <div class="field is-grouped is-grouped-multiline">
                <div v-for="(data, subCategory) in subCategories" class="control">
                  <subCategoryTag
                    :subCategory="subCategory"
                    :amount="data.portion">
                    <template slot="prefix">
                      <a class="tag is-medium is-danger"
                        v-on:click="decreaseSubCategoryCount(category, subCategory)">
                        <span class="icon">
                          <fa icon="minus" />
                        </span>
                      </a>
                      <span class="tag is-medium is-dark">
                        {{ parameters[category][subCategory].count }} X
                      </span>
                      <a class="tag is-medium is-success"
                        v-on:click="increaseSubCategoryCount(category, subCategory)">
                        <span class="icon">
                          <fa icon="plus" />
                        </span>
                      </a>
                    </template>
                  </subCategoryTag>
                </div>
              </div>
              <p class="help is-info">
                Decide how many allocations for each {{ category }} category should be played.
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
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
import subCategoryTag from '@/components/include/SubCategoryTag'

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
  components: {
    subCategoryTag
  },
  data () {
    return this.freshData()
  },
  computed: {
    dist () {
      return this.$store.getters.planDistribution(this.dog)
    },
    portionPerDay () {
      return this.$store.getters.dogFoodQuantityPerDay(this.dog)
    },
    portionStep () {
      if (this.$store.state.settings.rounding.enabled) {
        return this.$store.state.settings.rounding.value
      }
      return 1
    }
  },
  methods: {
    fastenDays () {
      return this.fastenWeek
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1])
    },
    vegetarianDays () {
      return this.vegetarianWeek
        .map((b, i) => [b, i])
        .filter((i) => i[0])
        .map((d) => d[1])
    },
    freshData () {
      let fastenWeek = [false, false, false, false, false, false, false]
      let vegetarianWeek = [false, false, false, false, false, false, false]
      let parameters = JSON.parse(JSON.stringify(this.$store.getters.emptyDistribution))
      let minCount = 3
      let maxCount = 5
      let dist = this.$store.getters.planDistribution(this.dog)
      for (let category in parameters) {
        for (let subCategory in parameters[category]) {
          let count = randomDays(minCount, maxCount)
          parameters[category][subCategory] = {
            count,
            portion: this.calcPortion(
              count,
              dist[category][subCategory],
              this.$store.getters.dogFoodQuantityPerDay(this.dog)
            )
          }
        }
      }
      return {
        fastenWeek,
        vegetarianWeek,
        parameters
      }
    },
    calcPortion (occurency, total, average) {
      if (!average) {
        average = this.portionPerDay
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
    recalculateParameters (parameters) {
      let vegDayCount = this.vegetarianDays().length
      if (vegDayCount) {
        parameters['vegetables']['vegetables'].count = vegDayCount
        parameters['vegetables']['vegetables'].portion = this.calcPortion(
          vegDayCount, this.dist['vegetables']['vegetables'],
          this.portionPerDay / 2
        )
        parameters['vegetables']['grains'].count = vegDayCount
        parameters['vegetables']['grains'].portion = this.calcPortion(
          vegDayCount, this.dist['vegetables']['grains'],
          this.portionPerDay / 2
        )
      }
    },
    increaseSubCategoryCount (category, subCategory) {
      let count = this.parameters[category][subCategory].count
      if (count < this.dog.plan.week.length) {
        count++
        let p = this.calcPortion(count, this.dist[category][subCategory])
        this.parameters[category][subCategory].count = count
        this.parameters[category][subCategory].portion = p
      }
    },
    decreaseSubCategoryCount (category, subCategory) {
      let count = this.parameters[category][subCategory].count
      if (count > 0) {
        count--
        let p = this.calcPortion(
          count,
          this.dist[category][subCategory],
          this.dist[category][subCategory]
        )
        this.parameters[category][subCategory].count = count
        this.parameters[category][subCategory].portion = p
      }
    },
    toggleFastenDay (day) {
      this.fastenWeek[day] = !this.fastenWeek[day]
      this.recalculateParameters(this.parameters)
      this.$forceUpdate()
    },
    toggleVegetarianDay (day) {
      this.vegetarianWeek[day] = !this.vegetarianWeek[day]
      this.recalculateParameters(this.parameters)
      this.$forceUpdate()
    },
    allocate () {
      let todo = []
      let allocation = []

      for (let day in this.dog.plan.week) {
        todo.push(parseInt(day))
        allocation.push([])
      }

      if (this.fastenDays().length) {
        for (let day of this.fastenDays()) {
          let idx = todo.indexOf(day)
          if (idx) {
            todo.splice(idx, 1)
          }
        }
      }

      if (this.vegetarianDays().length) {
        for (let day of this.vegetarianDays()) {
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
      let freshData = this.freshData()
      this.fastenWeek = freshData.fastenWeek
      this.vegetarianWeek = freshData.vegetarianWeek
      this.parameters = freshData.parameters
    }
  }
}
</script>
