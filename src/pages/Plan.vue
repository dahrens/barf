<template>
  <div class="plan">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">Plan</h2>
          <p class="subtitle">
            Create an individual plan to barf your dog.
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
    <template v-if="dog">
      <div class="columns is-marginless">
        <div class="column is-one-quarter">
          <dogPanel :dog="dog"></dogPanel>
        </div>
        <div class="column">
          <week :dog="dog"></week>
        </div>
        <div class="column is-one-quarter">
          <statistics :dog="dog"></statistics>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import week from '@/components/PlanWeek'
import dogPanel from '@/components/DogPanel'
import dogSelector from '@/components/DogSelector'
import statistics from '@/components/Statistics'

export default {
  name: 'plan',
  components: {
    dogPanel,
    dogSelector,
    statistics,
    week
  },
  computed: {
    settings () {
      return this.$store.state.settings
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

.dog-selector
  background-color: $dark

.dog-selector .field
  margin: 0 0.5em

</style>
