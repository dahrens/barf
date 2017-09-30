<template>
  <nav class="panel market-panel">
    <p class="panel-heading">
      Ingredients
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="chevron-down" />
        <fa v-if="collapsed" pack="fas" name="chevron-right" />
      </a>
      <button v-on:click="showCreate = !showCreate" class="button is-small is-light is-pulled-right">
        <span v-if="!showCreate" class="icon">
          <fa pack="fas" name="eye" />
        </span>
        <span v-else class="icon">
          <fa pack="fas" name="eye-slash" />
        </span>
        <span class="icon is-small">
          <fa pack="fas" name="plus" />
        </span>
      </button>
      <button v-on:click="expandAll = !expandAll" class="button is-small is-light is-pulled-right">
        <span class="icon is-small">
          <fa pack="fas" name="arrows-alt-v" />
        </span>
        <span v-if="!expandAll" >1</span>
        <span v-else>&#8734;</span>
      </button>
    </p>
    <template v-if="showCreate">
      <ingredientCreate></ingredientCreate>
    </template>
    <div v-if="!collapsed" class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="search">
        <span class="icon is-small is-left">
          <fa pack="fas" name="search" />
        </span>
      </p>
    </div>
    <template v-if="!collapsed">
      <template v-for="ingredient in ingredients">
          <a v-on:click="activate(ingredient)" class="panel-block" :class="{'is-active': isActive(ingredient)}">
            <p class="panel-icon has-text-dark">
              <fa v-if ="!isActive(ingredient)" pack="fas" name="chevron-right" />
              <fa v-if ="isActive(ingredient)" pack="fas" name="chevron-down" />
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
  </nav>
</template>

<script>
import ingredientCreate from '@/components/IngredientCreate'
import stashIngredient from '@/components/StashIngredient'
import subCategoryTag from '@/components/SubCategoryTag'

export default {
  name: 'ingredients',
  components: {
    ingredientCreate,
    stashIngredient,
    subCategoryTag
  },
  data () {
    return {
      expandAll: false,
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
        if (!this.expandAll) this.active = []
        this.active.push(record)
      } else {
        if (!this.expandAll) this.active = []
        this.active.splice(this.active.indexOf(record), 1)
      }
    },
    isActive: function (record) {
      return this.active.indexOf(record) !== -1
    }
  }
}
</script>
