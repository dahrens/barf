<template>
    <div class="field has-addons has-addons-right has-addons-left">
      <p class="control">
        <span v-if="ingredientsAvailable" class="button is-light">
          <span class="icon has-text-success">
            <fa pack="fas" name="check" />
          </span>
        </span>
        <span v-else class="button is-warning">
          <span class="icon">
            <fa pack="fas" name="info" />
          </span>
        </span>
      </p>
      <p class="control">
        <input v-model="quantity" class="input" type="number" placeholder="Anzahl">
      </p>
      <p class="control">
        <a :disabled="quantity <= 1" v-on:click="quantity--" class="button is-dark" title="Verringere Anzahl">
          <span class="icon">
            <fa pack="fas" name="minus" />
          </span>
        </a>
      </p>
      <p class="control">
        <a v-on:click="quantity++" class="button is-dark" title="Erhöhe Anzahl">
          <span class="icon">
            <fa pack="fas" name="plus" />
          </span>
        </a>
      </p>
      <p class="control">
        <a v-on:click="order()" class="button is-primary" title="Put into stash">
          <span class="icon">
            <fa pack="fas" name="utensils" />
          </span>
        </a>
      </p>
    </div>
</template>

<script>
import { STASH_RECIPE } from '@/store/mutation-types'

export default {
  name: 'stashRecipe',
  props: ['recipe'],
  data () {
    return {
      quantity: 1
    }
  },
  computed: {
    ingredientsAvailable () {
      let available = true
      let capacities = {}
      for (let ingredient of this.$store.state.ingredients) {
        let stashed = this.$store.getters.stashedIngredients[ingredient.id]
        let capacity = 0
        if (stashed) {
          capacity = stashed.amounts.map(
            meta => meta[0] * meta[1]
          ).reduce(
            (left, right) => left + right
          )
        }
        capacities[ingredient.id] = capacity
      }
      for (let x = 1; x <= this.quantity; x++) {
        for (let recipeIngredient of this.recipe.ingredients) {
          let capacity = capacities[recipeIngredient.ingredient]
          available = available && capacity >= recipeIngredient.amount
          if (available) {
            capacities[recipeIngredient.ingredient] = capacity - recipeIngredient.amount
          }
        }
      }
      return available
    }
  },
  methods: {
    order: function () {
      let stashItem = {
        recipe: this.recipe.id,
        quantity: this.quantity
      }
      this.$store.commit(STASH_RECIPE, stashItem)
      this.quantity = 1
    }
  }
}
</script>
