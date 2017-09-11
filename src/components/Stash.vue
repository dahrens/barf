<template>
  <div class="data container">
    <div class="columns">
      <div class="column is-half">
        <nav class="panel">
          <p class="panel-heading">
            Vorräte
          </p>
          <div class="panel-block">
            <p class="control has-icons-left">
              <input class="input is-small" type="text" placeholder="search">
              <span class="icon is-small is-left">
                <i class="fa fa-search"></i>
              </span>
            </p>
          </div>
          <template v-for="ingredientMeta in ingredientStash">
            <a v-on:click="activateStashItem(ingredientMeta.item)" class="panel-block" :class="{'is-active': isActiveStashItem(ingredientMeta.item)}">
              <p class="panel-icon">
                <i v-if ="!isActiveStashItem(ingredientMeta.item)" class="fa fa-caret-right"></i>
                <i v-if ="isActiveStashItem(ingredientMeta.item)" class="fa fa-caret-down"></i>
              </p>
              {{ ingredientMeta.ingredient.name }}&nbsp;
              <template v-for="amountMeta in ingredientMeta.amounts">
                <span class="tag is-dark">
                  <span class="is-size-6">{{amountMeta[0]}}{{ingredientMeta.unit}}</span>&nbsp;&nbsp;&nbsp;
                  <span class="is-size-7">x{{amountMeta[1]}}</span>
                </span>&nbsp;
              </template>
            </a>
            <span v-if="isActiveStashItem(ingredientMeta.item)"class="panel-block">
              hi there
            </span>
          </template>
        </nav>
      </div>
      <div class="column is-half">
        <kitchen></kitchen>
        <market></market>
      </div>
    </div>
  </div>
</template>

<script>
import market from '@/components/Market'
import kitchen from '@/components/Kitchen'

export default {
  name: 'Stash',
  components: {
    market,
    kitchen
  },
  data () {
    return {
      collapsedKitchen: false,
      activeStashItems: []
    }
  },
  computed: {
    stash () {
      return this.$store.state.stash
    },
    ingredientStash () {
      return this.$store.getters.stashed_ingredients
    }
  },
  methods: {
    activateRecipe: function (record) {
      if (this.activeRecipes.indexOf(record) === -1) {
        this.activeRecipes.push(record)
      } else {
        this.activeRecipes.splice(this.activeRecipes.indexOf(record), 1)
      }
    },
    isActiveStashItem (record) {
      return this.activeStashItems.indexOf(record) !== -1
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.panel-block.is-active {
  background-color: whitesmoke
}
</style>
