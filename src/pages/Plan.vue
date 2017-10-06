<template>
  <div class="plan">
    <section class="hero is-primary">
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
    <div class="plan-content">
      <div v-if="!dog" class="container">
        <div class="notification is-info">
          <span class="icon">
            <fa size="2x" pack="fas" name="info" />
          </span>
          There is currently no dog available. Please click the plus button above and provide some data regarding your dog.
        </div>
      </div>
      <div v-if="dog" class="columns">
        <div class="column is-one-quarter">
          <dogPanel :dog="dog"></dogPanel>
        </div>
        <div class="column">
          <planAllocationWeek :dog="dog"></planAllocationWeek>
          <ingredients></ingredients>
        </div>
        <div class="column is-one-quarter">
          <planAllocationPanel :dog="dog"></planAllocationPanel>
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
import ingredients from '@/components/Ingredients'

export default {
  name: 'plan',
  components: {
    planMeal,
    dogPanel,
    dogSelector,
    planAllocationPanel,
    planAllocationWeek,
    ingredients
  },
  computed: {
    settings () {
      return this.$store.state.settings
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
