<template>
  <article class="message">
    <div class="message-header">
      <p>
        <span class="icon">
          <i class="fa fa-eye"></i>
        </span>
        {{ ingredient.name }}
      </p>
      <button v-on:click="close()" class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      <div class="field has-addons has-addons-right">
        <p class="control is-fullwidth">
          <span class="select">
            <select v-model="newOrder.unit">
              <option v-for="unit in unitOptions" v-bind:value="unit.value">{{unit.name}}</option>
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
          <a class="button is-primary" title="Put into stash">
            <span class="icon"><i class="fa fa-shopping-cart"></i></span>
          </a>
        </p>
      </div>
      <div class="is-clearfix">
        <span class="is-pulled-left">
          <template v-for="part in ingredient.parts">
            <category-tag :amount="part[0]" :category="part[1]" :size="'is-medium'"></category-tag>&nbsp;
          </template>
        </span>
        <a v-on:click="remove()" class="button is-danger is-pulled-right" title="Delete from inventory">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
        </a>
      </div>
    </div>
  </article>
</template>


<script>
import CategoryTag from '@/components/CategoryTag'

export default {
  name: 'modal-ingredient',
  props: ['ingredient'],
  components: {
    'category-tag': CategoryTag
  },
  data () {
    return {
      newOrder: {
        unit: this.ingredient.unit,
        amount: this.ingredient.amount,
        quantity: 1
      }
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
    close: function () {
      this.$emit('close')
    },
    remove: function () {
      this.$emit('close')
      this.$store.commit('REMOVE_RECIPE', this.recipe)
    },
    order: function () {

    }
  }
}
</script>
