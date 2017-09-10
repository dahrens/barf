<template>
    <div class="field has-addons has-addons-right has-addons-left">
      <p class="control">
        <span v-if="ingredientsAvailable" class="button is-light">
          <span class="icon has-text-success"><i class="fa fa-check"></i></span>
        </span>
        <span v-else class="button is-danger">
          <span class="icon"><i class="fa fa-exclamation"></i></span>
        </span>
      </p>
      <p class="control is-expanded">
        <input v-model="quantity" class="input" type="number" placeholder="Anzahl">
      </p>
      <p class="control">
        <a :disabled="quantity <= 1" v-on:click="quantity--" class="button is-dark" title="Verringere Anzahl">
          <span class="icon"><i class="fa fa-minus"></i></span>
        </a>
      </p>
      <p class="control">
        <a v-on:click="quantity++" class="button is-dark" title="Erhöhe Anzahl">
          <span class="icon"><i class="fa fa-plus"></i></span>
        </a>
      </p>
      <p class="control">
        <a v-on:click="order()" class="button is-dark" title="Put into stash">
          <span class="icon"><i class="fa fa-cutlery"></i></span>
        </a>
      </p>
    </div>
</template>

<script>
export default {
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
        let stashed = this.$store.getters.stashed_ingredients[ingredient.id]
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
      // let stashItem = {
      //   recipe: this.recipe.id,
      //   amount: this.newOrder.quantity
      // }
      // for (let x = 1; x <= this.newOrder.quantity; x++) {
      //   this.$store.state.stash.push(JSON.parse(JSON.stringify(stashItem)))
      // }
      // this.newOrder = JSON.parse(this.newOrderBlueprint)
    }
  }
}
</script>
