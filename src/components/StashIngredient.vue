<template>
  <div>
    <div class="field has-addons has-addons-right">
      <p class="control">
        <span class="select">
          <select v-model="newOrder.unit" disabled>
            <option v-for="unit in unitOptions" v-bind:value="newOrder.unit">{{unit.name}}</option>
          </select>
        </span>
      </p>
      <p class="control">
        <input v-model="newOrder.amount" class="input" type="number" placeholder="Amount">
      </p>
      <p class="control">
        <input v-model="newOrder.quantity" class="input" type="number" min="1" step="1" placeholder="Quantity">
      </p>
      <p class="control">
        <a v-on:click="order()" class="button is-primary" title="Put into stash">
          <span class="icon">
            <fa icon="shopping-cart" />
          </span>
        </a>
      </p>
      <p class="control">
        <a v-on:click="remove()" class="button is-danger is-pulled-right" title="Delete from inventory">
          <span class="icon is-small">
            <fa icon="trash"/>
          </span>
        </a>
      </p>
    </div>
    <div v-if="showCascade">
      <div class="notification is-danger">
        <button v-on:click="showCascade = false" class="delete"></button>
        Are you sure that you want to delete? This ingredient is used...
        (TODO: show where)
      </div>
    </div>
  </div>
</template>

<script>
import { STASH_INGREDIENT, REMOVE_INGREDIENT } from '@/store/mutation-types'

export default {
  name: 'stashIngredient',
  props: ['ingredient'],
  data () {
    let newOrder = {
      unit: this.ingredient.unit,
      amount: this.ingredient.defaultAmount,
      quantity: 1
    }
    return {
      newOrder,
      newOrderBlueprint: JSON.stringify(newOrder),
      showCascade: false
    }
  },
  computed: {
    unitOptions () {
      let options = []
      for (let unit of this.$store.state.units) {
        options.push({
          name: unit,
          value: unit
        })
      }
      return options
    },
    needsCascade () {
      return this.$store.getters.ingredientHasRelations(this.ingredient)
    },
    getCascaded () {
      return this.$store.getters.ingredientRelations(this.ingredient)
    }
  },
  methods: {
    order: function () {
      let stashItem = {
        ingredient: this.ingredient.id,
        amount: this.newOrder.amount
      }
      for (let x = 1; x <= this.newOrder.quantity; x++) {
        this.$store.commit(STASH_INGREDIENT, JSON.parse(JSON.stringify(stashItem)))
      }
      this.newOrder = JSON.parse(this.newOrderBlueprint)
    },
    remove: function () {
      if (this.needsCascade && !this.showCascade) {
        this.showCascade = true
      } else if ((this.needsCascade && this.showCascade) || !this.needsCascade) {
        this.$store.commit(REMOVE_INGREDIENT, {
          ingredient: this.ingredient,
          cascade: this.getCascaded
        })
      }
    }
  }
}
</script>
