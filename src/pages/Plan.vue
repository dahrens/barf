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
        <div class="column is-one-third dog-selector">
          <div class="field has-addons has-addons-right has-addons-left">
            <p class="control">
              <a v-on:click="createDog()" class="button is-medium is-success">
                <span class="icon is-medium">
                  <fa pack="fas" name="plus"/>
                </span>
              </a>
            </p>
            <div class="control has-icons-left is-expanded">
              <div class="select is-fullwidth is-medium">
                <select v-model="selectedDog" v-on:change="selectDog()">
                  <option v-if="dogs.length === 0" disabled selected value="0">create a dog by clicking the plus icon</option>
                  <option v-for="d in dogs" v-bind:value="d.id">{{ d.name }}</option>
                </select>
                <div class="icon is-left has-text-primary">
                  <fa pack="fas" name="paw" />
                </div>
              </div>
            </div>
            <p class="control">
              <a v-on:click="deleteSelectedDog()" class="button is-medium is-danger" :disabled="selectedDog === 0">
                <span class="icon is-medium">
                  <fa pack="fas" name="trash"/>
                </span>
              </a>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="tabs is-fullwidth is-toggle">
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
          <planWeek :dog="dog"></planWeek>
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
import planWeek from '@/components/PlanWeek'
import planMeal from '@/components/PlanMeal'
import dogPanel from '@/components/DogPanel'
import planAllocationPanel from '@/components/PlanAllocationPanel'
import mealAllocationPanel from '@/components/MealAllocationPanel'
import ingredients from '@/components/Ingredients'
import { SET_ACTIVE_PLAN_VIEW, SELECT_DOG, INSERT_DOG } from '@/store/mutation-types'

export default {
  name: 'plan',
  components: {
    planWeek,
    planMeal,
    dogPanel,
    planAllocationPanel,
    mealAllocationPanel,
    ingredients
  },
  data () {
    return {
      selectedDog: 0
    }
  },
  created () {
    this.selectedDog = this.$store.state.ui.selectedDog
    if (this.selectedDog === 0 && this.dogs.length) {
      this.selectedDog = this.dogs[0].id
      this.selectDog()
    }
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
      if (this.dogs.length === 0 || !this.selectedDog) {
        return false
      }
      return this.$store.state.dogs.filter(d => d.id === this.selectedDog)[0]
    }
  },
  methods: {
    setActiveView (view) {
      this.$store.commit(SET_ACTIVE_PLAN_VIEW, { view })
    },
    selectDog () {
      this.$store.commit(SELECT_DOG, this.selectedDog)
      this.$forceUpdate()
    },
    createDog () {
      let dog = JSON.parse(JSON.stringify(this.$store.state.newDog))
      this.$store.commit(INSERT_DOG, dog)
      this.$store.dispatch('allocate', {
        dog,
        fastenDays: [],
        vegetarianDays: [2, 5]
      })
      this.selectedDog = dog.id
      this.selectDog()
    }
  }
}
</script>

<style lang="sass">
@import "../assets/sass/variables"

.plan
  margin-bottom: 0.5em

.planbar
  margin-bottom: 0.5em
  background-color: whitesmoke

.dog-selector
  background-color: $primary

.dog-selector .field
  margin: 0 0.5em

.meals-config
  display: flex
  justify-content: center

.meals-config .field
  margin: 0.5em
</style>
