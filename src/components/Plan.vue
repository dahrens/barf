<template>
  <div class="is-marginless">
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <planStats :dog="dog"></planStats>
        </div>
      </div>
    </section>
    <div class="plan container">
      <div class="columns">
        <div class="column is-5">
          <planPanel :dog="dog"></planPanel>
          <nav class="panel">
            <p class="panel-heading">
              Geplante Mahlzeiten
            </p>
          </nav>
        </div>
        <div class="column is-7">
          <div class="columns is-gapless is-multiline">
            <div v-for="(weekday, index) in weekdays" class="column is-4 weekday">
              <planDay :plan="plan" :weekday="weekday" :index="index"></planDay>
            </div>
            <div class="column is-12">
              <div class="columns meals">
                <div class="column is-6">
                  <ingredients></ingredients>
                </div>
                <div class="column is-6">
                  <recipes></recipes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import planPanel from '@/components/PlanPanel'
import planStats from '@/components/PlanStats'
import planDay from '@/components/PlanDay'
import ingredients from '@/components/Ingredients'
import recipes from '@/components/Recipes'

export default {
  name: 'plan',
  components: {
    planPanel,
    planStats,
    planDay,
    ingredients,
    recipes
  },
  data () {
    return {
      weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    }
  },
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
    },
    dog () {
      return this.$store.state.dogs[0]
    },
    plan () {
      console.log('Plans PLAN!', this.dog.plan)
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
