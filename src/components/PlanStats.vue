<template>
  <nav class="level">
    <div>
      <p class="heading">Nahrung pro Tag</p>
      <p class="title">{{ expectedQuantityPerDay }}g</p>
    </div>
    <div>
      <p class="heading">Nahrung pro Woche</p>
      <p class="title">{{ expectedQuantityWeek }}g</p>
    </div>
    <div>
      <p class="heading">{{ foo }}</p>
      <p class="title">{{ expectedQuantityPlan }}g</p>
    </div>
    <div>
      <p class="heading">{{ bar }}</p>
      <p class="title">{{ expectedQuantityPlan }}g</p>
    </div>
    <div>
      <p class="heading">Nahrung im Plan</p>
      <p class="title">{{ expectedQuantityPlan }}g</p>
    </div>



  </nav>
</template>

<script>
export default {
  name: 'PlanStats',
  props: ['plan'],
  computed: {
    expectedQuantityPerDay () {
      return this.$store.getters.planRequirements(this.plan)
    },
    expectedQuantityWeek () {
      return this.plan.week.length * this.expectedQuantityPerDay
    },
    expectedQuantityPlan () {
      return '?'
    },
    foo () {
      console.log('meal dist', this.$store.getters.mealsDistribution(this.plan.week.reduce((a, b) => a.concat(b))))
    },
    bar () {
      console.log('plan dist', this.$store.getters.planDistribution(this.plan))
    }
  }
}
</script>
