<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">Ingredients</h2>
          <p class="subtitle">
            Create, delete and edit the ingredients that you use in your meals.
          </p>
        </div>
      </div>
    </section>
    <div class="ingredients container">
      <div class="columns">
        <div class="column">
          <nav class="panel ingredient-panel">
            <ingredients></ingredients>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ingredients from '@/components/Ingredients'

export default {
  name: 'Stash',
  components: {
    ingredients
  }
}
</script>

<style lang="sass">
.ingredients
  margin-top: 0.75em
  margin-bottom: 0.5em
</style>
