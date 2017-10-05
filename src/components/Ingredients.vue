<template>
  <nav class="panel market-panel">
    <p class="panel-heading">
      Ingredients
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-if="showCreate" v-on:click="expandedCreate = !expandedCreate" class="is-light is-pulled-right">
        <span class="icon has-text-dark">
          <fa v-if="!expandedCreate" pack="fas" name="plus" />
          <fa v-if="expandedCreate" pack="fas" name="times"/>
        </span>
      </a>
      <a v-on:click="expandAll = !expandAll" class="is-light is-pulled-right">
        <span class="icon has-text-dark panel-heading-icon">
          <fa v-if="expandAll" pack="fas" name="arrows-alt-v" size="sm" />
          <fa v-if="!expandAll" pack="fas" name="crosshairs" size="sm" />
        </span>
      </a>
    </p>
    <template v-if="expandedCreate">
      <ingredientCreate></ingredientCreate>
    </template>
    <div v-if="!collapsed" class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="search" v-model="search">
        <span class="icon is-small is-left">
          <fa pack="fas" name="search" />
        </span>
      </p>
    </div>
    <p v-if="!collapsed" class="panel-tabs">
      <a v-on:click="subCategoryFilter = 'all'"
        :class="{'is-active': subCategoryFilter === 'all'}">all</a>
      <a v-for="subCategory in subCategories"
        v-on:click="subCategoryFilter = subCategory"
        :class="{'is-active': subCategoryFilter === subCategory}">{{ subCategory }}</a>
    </p>
    <template v-if="!collapsed">
      <template v-for="ingredient in ingredients">
          <a v-on:click="activate(ingredient)" class="panel-block" :class="{'is-active': isActive(ingredient)}">
            <p class="panel-icon">
              <fa v-if ="!isActive(ingredient)" pack="fas" name="caret-right" />
              <fa v-if ="isActive(ingredient)" pack="fas" name="caret-down" />
            </p>
            {{ ingredient.name }}&nbsp;
            <template v-for="part in ingredient.subcategories">
              <subCategoryTag :amount="part[0]" :subCategory="part[1]"></subCategoryTag>&nbsp;
            </template>
          </a>
          <span v-if="isActive(ingredient)" class="panel-block">
            <stashIngredient v-if="settings.useStash" :ingredient="ingredient"></stashIngredient>
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
  props: {
    showCreate: {
      required: false,
      default: () => (true)
    }
  },
  data () {
    return {
      expandAll: false,
      expandedCreate: false,
      collapsed: false,
      active: [],
      subCategoryFilter: 'all',
      search: ''
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    },
    ingredients () {
      let ingredients = this.$store.state.ingredients
      if (this.subCategoryFilter !== 'all') {
        let filter = (i) => i.subCategories.map(e => e[1]).indexOf(this.subCategoryFilter) !== -1
        ingredients = ingredients.filter(filter)
      }
      if (this.search !== '') {
        ingredients = ingredients.filter(i => i.name.indexOf(this.search) !== -1)
      }
      return ingredients
    },
    subCategories () {
      return this.$store.getters.subCategories.map(s => s.subCategory)
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
    },
    setCategoryFilter (filter) {

    }
  }
}
</script>
