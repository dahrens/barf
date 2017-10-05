<template>
  <div class="columns is-gapless">
    <div v-for="(day, idx) in dog.plan.week" class="column">
      <strong>{{ day.toUpperCase() }}</strong>
      <nav class="panel">
        <p class="panel-heading">
          morning
        </p>
        <p v-for="meal in dog.plan.meals[idx]['morning']">

        </p>
      </nav>
      <nav class="panel">
        <p class="panel-heading">
          evening
        </p>
        <p v-for="meal in dog.plan.meals[idx]['evening']">

        </p>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'planMeal',
  props: ['dog']
}
</script>

<style lang="sass">
@charset "utf-8"
@import "../assets/sass/variables"
@import "../../node_modules/bulma/bulma"

.weekday-block
  border: 1px solid $border
  padding: 0.5em
</style>
