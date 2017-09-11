<template>
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
        <span class="icon"><i class="fa fa-shopping-cart"></i></span>
      </a>
    </p>
    <p class="control">
      <a v-on:click="remove()" class="button is-danger is-pulled-right" title="Delete from inventory">
        <span class="icon is-small">
          <i class="fa fa-trash"></i>
        </span>
      </a>
    </p>
  </div>
</template>

<script>
export default {
  props: ['ingredient'],
  data () {
    let newOrder = {
      unit: this.ingredient.unit,
      amount: this.ingredient.defaultAmount,
      quantity: 1
    }
    return {
      newOrder,
      newOrderBlueprint: JSON.stringify(newOrder)
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
      this.$emit('close')
      this.$store.commit('REMOVE_INGREDIENT', this.ingredient)
    }
  }
}
</script>
