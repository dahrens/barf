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
      <p class="heading">Nahrung im Plan</p>
      <p class="title">{{ expectedQuantityPlan }}g</p>
    </div>



  </nav>
</template>

<script>
export default {
  name: 'PlanStats',
  props: ['dog'],
  computed: {
    plan () {
      return this.dog.plan
    },
    expectedQuantityPerDay () {
      return this.$store.getters.planRequirements(this.dog)
    },
    expectedQuantityWeek () {
      return this.plan.week.length * this.expectedQuantityPerDay
    },
    expectedQuantityPlan () {
      return '?'
    }
  }
}
</script>
