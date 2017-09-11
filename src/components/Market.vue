<template>
  <nav class="panel market-panel">
    <p class="panel-heading">
      Markt
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <i v-if="!collapsed" class="fa fa-caret-down"></i>
        <i v-if="collapsed" class="fa fa-caret-right"></i>
      </a>
      <button v-on:click="showCreate = !showCreate" class="button is-small is-light is-pulled-right">
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
    </p>
    <div v-if="!collapsed" class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="search">
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>

    </div>
    <template v-if="!collapsed">
      <template v-for="ingredient in ingredients">
          <a v-on:click="activate(ingredient)" class="panel-block" :class="{'is-active': isActive(ingredient)}">
            <p class="panel-icon">
              <i v-if ="!isActive(ingredient)" class="fa fa-caret-right"></i>
              <i v-if ="isActive(ingredient)" class="fa fa-caret-down"></i>
            </p>
            {{ ingredient.name }}&nbsp;
            <template v-for="part in ingredient.subcategories">
              <subCategoryTag :amount="part[0]" :subCategory="part[1]"></subCategoryTag>&nbsp;
            </template>
          </a>
          <span v-if="isActive(ingredient)" class="panel-block">
            <stashIngredient :ingredient="ingredient"></stashIngredient>
          </span>
      </template>
    </template>
    <template v-if="showCreate">
      <ingredientCreate></ingredientCreate>
    </template>
  </nav>
</template>

<script>
import ingredientCreate from '@/components/IngredientCreate'
import stashIngredient from '@/components/StashIngredient'
import subCategoryTag from '@/components/SubCategoryTag'

export default {
  name: 'market',
  components: {
    ingredientCreate,
    stashIngredient,
    subCategoryTag
  },
  data () {
    return {
      collapsed: false,
      showCreate: false,
      active: []
    }
  },
  computed: {
    ingredients () {
      return this.$store.state.ingredients
    }
  },
  methods: {
    activate: function (record) {
      if (this.active.indexOf(record) === -1) {
        this.active.push(record)
      } else {
        this.active.splice(this.active.indexOf(record), 1)
      }
    },
    isActive: function (record) {
      return this.active.indexOf(record) !== -1
    }
  }
}
</script>
