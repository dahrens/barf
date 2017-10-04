<template>
  <div class="plan">
    <nav class="plan-tabs">
      <div class="container is-clearfix">
        <div class="dog-selector field has-addons has-addons-right is-pulled-left">
          <p class="control">
            <a class="button is-static">
              <span><strong>selected dog</strong></span>
            </a>
          </p>
          <div class="control is-expanded">
            <div class="select">
              <select v-model="selectedDog" v-on:change="dogSelect()">
                <option v-for="d in dogs" v-bind:value="d.id">{{ d.name }}</option>
              </select>
            </div>
          </div>
          <p class="control">
            <a class="button">
              <span class="icon is-medium">
                <fa pack="fas" name="plus"/>
              </span>
            </a>
          </p>
        </div>
        <div class="tabs is-pulled-right">
          <ul>
            <li :class="{'is-active': view === 'base'}">
              <a v-on:click="setActiveView('base')">
                <span class="icon is-medium">
                  <fa pack="fas" name="chart-pie"/>
                </span>
                BASEMENT
              </a>
            </li>
            <li :class="{'is-active': view === 'meals'}">
              <a v-on:click="setActiveView('meals')">
                <span class="icon is-medium">
                  <fa pack="fas" name="calendar-alt"/>
                </span>
                MEALS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="view === 'base'" class="container">
      <div class="columns">
        <div class="column is-one-third">
          <dogPanel :dog="dog"></dogPanel>
        </div>
        <div class="column">
          <planWeek :dog="dog"></planWeek>
        </div>
        <div class="column is-one-third">
          <planAllocationPanel :dog="dog"></planAllocationPanel>
        </div>
      </div>
    </div>
    <div v-if="view === 'meals'" class="container">
      <div class="meals-config">
        <div class="field has-addons">
          <p class="control">
            <a class="button">
              <span class="icon">
                <fa pack="fas" name="magic" />
              </span>
              <span class="is-hidden-mobile">auto meal allocation</span>
            </a>
          </p>
        </div>
        <div class="field has-addons">
          <p class="control">
            <a class="button">
              <span class="icon">
                <fa pack="fas" name="hand-paper" />
              </span>
              <span class="is-hidden-mobile">manual</span>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <span class="icon">
                <fa pack="fas" name="archive" />
              </span>
              <span class="is-hidden-mobile">based on stash</span>
            </a>
          </p>
        </div>
      </div>
      <div class="columns">
        <div v-for="day in dog.plan.week" class="column">
          <div class="weekday">
            <strong>{{ day.toUpperCase() }}</strong>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <ingredients></ingredients>
        </div>
        <div class="column">
          <recipes></recipes>
        </div>
        <div class="column">
          <mealAllocationPanel :dog="dog"></mealAllocationPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import planWeek from '@/components/PlanWeek'
import dogPanel from '@/components/DogPanel'
import planAllocationPanel from '@/components/PlanAllocationPanel'
import mealAllocationPanel from '@/components/MealAllocationPanel'
import ingredients from '@/components/Ingredients'
import recipes from '@/components/Recipes'
import { SET_ACTIVE_PLAN_VIEW } from '@/store/mutation-types'

export default {
  name: 'plan',
  components: {
    planWeek,
    dogPanel,
    planAllocationPanel,
    mealAllocationPanel,
    ingredients,
    recipes
  },
  data () {
    return {
      selectedDog: 1
    }
  },
  computed: {
    view () {
      return this.$store.state.ui.activePlanView
    },
    subCategories () {
      return this.$store.getters.subCategories
    },
    dogs () {
      return this.$store.state.dogs
    },
    dog () {
      return this.$store.state.dogs.filter(d => d.id === this.selectedDog)[0]
    }
  },
  methods: {
    setActiveView (view) {
      this.$store.commit(SET_ACTIVE_PLAN_VIEW, { view })
    },
    dogSelect () {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="sass">
.plan-tabs
  margin-bottom: 0.75em
  background-color: whitesmoke

.dog-selector
  position: relative
  top: 0.5em

.weekday
  border: 1px solid whitesmoke

.meals-config
  display: flex
  justify-content: center
  margin: 0.5em

.meals-config .field
  margin: 0.5em
</style>
