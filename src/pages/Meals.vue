<template>
  <div class="meals">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">Meals</h2>
          <p class="subtitle">
            You created an abstract plan now, but What exactly do you feed?
          </p>
          <dogSelector></dogSelector>
        </div>
      </div>
    </section>
    <section v-if="!dog" class="hero is-medium is-info">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-1">
              <span class="icon is-large">
                <fa size="4x" icon="info"/>
              </span>
            </div>
            <div class="column">
              <h2 class="title">
                No dog available
              </h2>
              <p class="subtitle">
                Please click the plus button above and provide some data regarding your dog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-if="dog" class="meals-content">
      <week :dog="dog"></week>
    </div>
  </div>
</template>

<script>
import week from '@/components/MealsWeek'
import dogPanel from '@/components/DogPanel'
import dogSelector from '@/components/DogSelector'

export default {
  name: 'plan',
  components: {
    dogPanel,
    dogSelector,
    week
  },
  computed: {
    settings () {
      return this.$store.state.settings
    },
    dogs () {
      return this.$store.state.dogs
    },
    dog () {
      return this.$store.getters.selectedDog
    }
  }
}
</script>

<style lang="sass">
@import "../assets/sass/variables"
@import "../../node_modules/bulma/bulma"

.plan-content
  margin: 1em 0

.dog-selector
  background-color: $dark

.dog-selector .field
  margin: 0 0.5em

</style>
