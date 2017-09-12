<template>
  <div class="is-marginless">
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <planStats :plan="plan"></planStats>
        </div>
      </div>
    </section>
    <div class="plan container">
      <div class="columns">
        <div class="column is-5">
          <kitchen :collapsed="true"></kitchen>
          <planPanel :plan="plan"></planPanel>
          <nav class="panel">
            <p class="panel-heading">
              Geplante Mahlzeiten
            </p>
          </nav>
        </div>
        <div class="columns column is-7 is-multiline">
          <div v-for="(weekday, index) in weekdays" class="column is-4">
            <planDay :plan="plan" :weekday="weekday" :index="index"></planDay>
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
import kitchen from '@/components/Kitchen'

export default {
  name: 'plan',
  components: {
    planPanel,
    planStats,
    planDay,
    kitchen
  },
  data () {
    return {
      weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      selectedPlan: 1
    }
  },
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
    },
    plan () {
      return this.$store.state.plans.filter(p => p.id === this.selectedPlan)[0]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.plan {
  margin-top: 1em;
}
</style>
