<template>
  <div>
    <div class="field has-addons has-addons-right">
      <p class="control">
        <span class="select is-large">
          <select v-model="newOrder.unit" disabled>
            <option v-for="unit in unitOptions" v-bind:value="newOrder.unit">{{unit.name}}</option>
          </select>
        </span>
      </p>
      <p class="control">
        <input v-model="newOrder.amount" class="input is-large" type="number" placeholder="Amount">
      </p>
      <p class="control">
        <input v-model="newOrder.quantity" class="input is-large" type="number" min="1" step="1" placeholder="Quantity">
      </p>
      <p class="control">
        <a v-on:click="order()" class="button is-primary is-large" title="Put into stash">
          <span class="icon"><i class="fa fa-shopping-cart"></i></span>
        </a>
      </p>
      <p class="control">
        <a v-on:click="remove()" class="button is-danger is-pulled-right is-large" title="Delete from inventory">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
        </a>
      </p>
    </div>
    <div v-if="showCascade">
      <div class="notification is-danger">
        <button v-on:click="showCascade = false" class="delete"></button>
        Danger lorem ipsum dolor sit amet, consectetur
        adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
        consectetur adipiscing elit
      </div>
    </div>
  </div>
</template>

<script>
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
      return this.$store.getters.ingredientNeedsCascade(this.ingredient)
    },
    getCascaded () {
      return this.$store.getters.getIngredientsCascaded(this.ingredient)
    }
  },
  methods: {
    order: function () {
      let stashItem = {
        ingredient: this.ingredient.id,
        amount: this.newOrder.amount
      }
      for (let x = 1; x <= this.newOrder.quantity; x++) {
        this.$store.commit('STASH_INGREDIENT', JSON.parse(JSON.stringify(stashItem)))
      }
      this.newOrder = JSON.parse(this.newOrderBlueprint)
    },
    remove: function () {
      if (this.needsCascade && !this.showCascade) {
        this.showCascade = true
      } else if ((this.needsCascade && this.showCascade) || !this.needsCascade) {
        this.$store.commit('REMOVE_INGREDIENT', {
          ingredient: this.ingredient,
          cascade: this.getCascaded
        })
      }
    }
  }
}
</script>
