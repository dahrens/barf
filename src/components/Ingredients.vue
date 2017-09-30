<template>
  <nav class="panel market-panel">
    <p class="panel-heading">
      Ingredients
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="chevron-down" />
        <fa v-if="collapsed" pack="fas" name="chevron-right" />
      </a>
      <a v-if="showCreate" v-on:click="expandedCreate = !expandedCreate" class="is-light is-pulled-right">
        <span class="icon has-text-dark panel-heading-icon">
          <span class="fa-layers fa-fw">
            <fa v-if="!expandedCreate" pack="fas" name="eye" />
            <fa v-if="expandedCreate" pack="fas" name="eye-slash"/>
            <span>
              <fa pack="fas" name="plus" size="sm" transform="right-20"/>
            </span>
          </span>
        </span>
      </a>
      <a v-on:click="expandAll = !expandAll" class="is-light is-pulled-right">
        <span class="icon has-text-dark panel-heading-icon">
          <span>
            <fa pack="fas" name="arrows-alt-v" size="sm" transform="right-20"/>
          </span>
          <span v-if="!expandAll">1</span>
          <span v-else>&#8734;</span>
        </span>
      </a>
    </p>
    <template v-if="expandedCreate">
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
            <p class="panel-icon">
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
