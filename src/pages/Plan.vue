<template>
  <div class="plan">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">Plan</h2>
          <p class="subtitle">
            Create an individual plan to barf your dog.
          </p>
        </div>
      </div>
    </section>
    <nav class="planbar">
      <div class="columns is-gapless">
        <div class="column is-one-quarter dog-selector">
          <dogSelector></dogSelector>
        </div>
        <div class="column">
          <div class="tabs is-fullwidth is-boxed">
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
      </div>
    </nav>
    <div v-if="!dog" class="container">
      <div class="notification is-info">
        <span class="icon">
          <fa size="2x" pack="fas" name="info" />
        </span>
        There is currently no dog available. Please click the plus button above and provide some data regarding your dog.
      </div>
    </div>
    <div v-if="view === 'base'">
      <div v-if="dog" class="columns">
        <div class="column is-one-third">
          <dogPanel :dog="dog"></dogPanel>
        </div>
        <div class="column">
          <planAllocationWeek :dog="dog"></planAllocationWeek>
        </div>
        <div class="column is-one-third">
          <planAllocationPanel :dog="dog"></planAllocationPanel>
        </div>
      </div>
    </div>
    <div v-if="view === 'meals' && dog">
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
        <div v-if="settings.useStash" class="field has-addons">
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
      <planMeal :dog="dog"></planMeal>
      <div class="columns">
        <div class="column">
          <ingredients></ingredients>
        </div>
        <div class="column">
          <mealAllocationPanel :dog="dog"></mealAllocationPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import planAllocationWeek from '@/components/PlanAllocationWeek'
import planMeal from '@/components/PlanMeal'
import dogPanel from '@/components/DogPanel'
import dogSelector from '@/components/DogSelector'
import planAllocationPanel from '@/components/PlanAllocationPanel'
import mealAllocationPanel from '@/components/MealAllocationPanel'
import ingredients from '@/components/Ingredients'
import { SET_ACTIVE_PLAN_VIEW } from '@/store/mutation-types'

export default {
  name: 'plan',
  components: {
    planAllocationWeek,
    planMeal,
    dogPanel,
    dogSelector,
    planAllocationPanel,
    mealAllocationPanel,
    ingredients
  },
  computed: {
    settings () {
      return this.$store.state.settings
    },
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
      if (this.dogs.length === 0 || !this.$store.state.ui.selectedDog) {
        return false
      }
      return this.$store.state.dogs.filter(d => d.id === this.$store.state.ui.selectedDog)[0]
    }
  },
  methods: {
    setActiveView (view) {
      this.$store.commit(SET_ACTIVE_PLAN_VIEW, { view })
    }
  }
}
</script>

<style lang="sass">
@import "../assets/sass/variables"
@import "../../node_modules/bulma/bulma"

.plan
  margin-bottom: 0.5em

.planbar
  margin-bottom: 0.5em
  background-color: whitesmoke

.dog-selector
  background-color: $dark

.dog-selector .field
  margin: 0 0.5em

.tabs li
  background-color: $dark

.tabs a
  color: white !important

.tabs ul
  border: 0 !important

.tabs li
  border-bottom: 1px solid $dark !important

.tabs li a:hover
  border-bottom: 1px solid $grey-light !important

.tabs li.is-active
  border-top: 1px solid $dark !important
  border-bottom: 0 !important

.tabs li.is-active a
  color: $dark !important

.tabs a:hover
  background-color: $grey-light !important

.tabs li.is-active a:hover
  background-color: white !important

.meals-config
  display: flex
  justify-content: center

.meals-config .field
  margin: 0.5em
</style>
