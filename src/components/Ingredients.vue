<template>
  <div class="data container">
    <div class="columns">
      <div class="column is-half">
        <nav class="panel">
          <div class="panel-block">
            <p class="control has-icons-left">
              <input class="input is-small" type="text" placeholder="search">
              <span class="icon is-small is-left">
                <i class="fa fa-search"></i>
              </span>
            </p>
            <button v-on:click="toggleCreate()" class="button is-small is-light">
              <span v-if="!showCreate" class="icon">
                <i class="fa fa-eye"></i>
              </span>
              <span v-else class="icon">
                <i class="fa fa-eye-slash"></i>
              </span>
              <span class="icon is-small">
                <i class="fa fa-plus"></i>
              </span>
            </button>

          </div>
          <template v-for="ingredient in ingredients">
            <a v-on:click="activateIngredient(ingredient)" class="panel-block is-active">
              <span class="panel-icon">
                <i v-if="isActive(ingredient)" class="fa fa-eye"></i>
              </span>
              {{ ingredient.name }}&nbsp;
              <template v-for="part in ingredient.parts">
                <category-tag :amount="part[0]" :category="part[1]"></category-tag>&nbsp;
              </template>
            </a>
          </template>
        </nav>
      </div>
      <div class="column is-half">
        <template v-if="showCreate">
          <create-ingredient></create-ingredient>
        </template>
        <template v-for="activeIngredient in activeIngredients">
          <detail-ingredient v-on:close="activateIngredient(activeIngredient)" :ingredient="activeIngredient"></detail-ingredient>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientCreate from '@/components/IngredientCreate'
import IngredientDetail from '@/components/IngredientDetail'
import CategoryTag from '@/components/CategoryTag'

export default {
  name: 'Ingredients',
  components: {
    'create-ingredient': IngredientCreate,
    'detail-ingredient': IngredientDetail,
    'category-tag': CategoryTag
  },
  data () {
    return {
      showCreate: true,
      activeIngredients: []
    }
  },
  computed: {
    ingredients () {
      return this.$store.state.ingredients
    }
  },
  methods: {
    activateIngredient: function (record) {
      if (this.activeIngredients.indexOf(record) === -1) {
        this.activeIngredients.push(record)
      } else {
        this.activeIngredients.splice(this.activeIngredients.indexOf(record), 1)
      }
    },
    isActive: function (record) {
      return this.activeIngredients.indexOf(record) !== -1
    },
    toggleCreate: function () {
      this.showCreate = !this.showCreate
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
