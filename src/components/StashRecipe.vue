<template>
    <div class="field has-addons has-addons-right has-addons-left">
      <p class="control">
        <span v-if="ingredientsAvailable" class="button is-light is-large">
          <span class="icon has-text-success">
            <fa pack="solid" name="check" />
          </span>
        </span>
        <span v-else class="button is-warning is-large">
          <span class="icon">
            <fa pack="solid" name="warning" />
          </span>
        </span>
      </p>
      <p class="control is-expanded">
        <input v-model="quantity" class="input is-large" type="number" placeholder="Anzahl">
      </p>
      <p class="control">
        <a :disabled="quantity <= 1" v-on:click="quantity--" class="button is-dark is-large" title="Verringere Anzahl">
          <span class="icon">
            <fa pack="solid" name="minus" />
          </span>
        </a>
      </p>
      <p class="control">
        <a v-on:click="quantity++" class="button is-dark is-large" title="Erhöhe Anzahl">
          <span class="icon">
            <fa pack="solid" name="plus" />
          </span>
        </a>
      </p>
      <p class="control">
        <a v-on:click="order()" class="button is-primary is-large" title="Put into stash">
          <span class="icon">
            <fa pack="solid" name="utensils" />
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
      console.log('order')
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
