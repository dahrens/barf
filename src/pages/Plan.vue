<template>
  <div class="is-marginless">
    <div class="plan container">
      <div class="columns">
        <div class="column is-4">
          <dogPanel :dog="dog"></dogPanel>
          <ingredients></ingredients>
          <recipes></recipes>
        </div>
        <div class="column is-8">
          <planPanel :dog="dog"></planPanel>
          <div class="columns is-gapless is-multiline">
            <div v-for="(weekday, index) in plan.week" class="column is-6 weekday">
              <planDay :plan="plan" :weekday="weekday" :index="index"></planDay>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import planPanel from '@/components/PlanPanel'
import planDay from '@/components/PlanDay'
import dogPanel from '@/components/DogPanel'
import ingredients from '@/components/Ingredients'
import recipes from '@/components/Recipes'

export default {
  name: 'plan',
  components: {
    planPanel,
    planDay,
    dogPanel,
    ingredients,
    recipes
  },
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
    },
    dog () {
      return this.$store.state.dogs[0]
    },
    plan () {
      return this.dog.plan
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.plan {
  margin-top: 1em;
}

.meals {
  margin-top: 2em;
}
</style>
