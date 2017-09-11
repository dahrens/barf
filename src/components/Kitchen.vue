<template>
  <nav class="panel market-panel">
    <p class="panel-heading">
      Küche
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <i v-if="!collapsed" class="fa fa-caret-down"></i>
        <i v-if="collapsed" class="fa fa-caret-right"></i>
      </a>
      <button v-if="showCreate" v-on:click="expandedCreate = !expandedCreate" class="button is-small is-light is-pulled-right">
        <span v-if="!expandedCreate" class="icon">
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
      <template v-for="recipe in recipes">
          <a v-on:click="activate(recipe)" class="panel-block" :class="{'is-active': isActive(recipe)}">
            <p class="panel-icon">
              <i v-if ="!isActive(recipe)" class="fa fa-caret-right"></i>
              <i v-if ="isActive(recipe)" class="fa fa-caret-down"></i>
            </p>
            {{ recipe.name }}&nbsp;
            <template v-for="part in recipe.subcategories">
              <category-tag :amount="part[0]" :category="part[1]"></category-tag>&nbsp;
            </template>
          </a>
          <span v-if="isActive(recipe)" class="panel-block">
            <stash-recipe :recipe="recipe"></stash-recipe>
          </span>
      </template>
    </template>
    <template v-if="expandedCreate">
      <create-recipe></create-recipe>
    </template>
  </nav>
</template>

<script>
import StashRecipe from '@/components/StashRecipe'
import RecipeCreate from '@/components/RecipeCreate'

export default {
  name: 'kitchen',
  components: {
    'stash-recipe': StashRecipe,
    'create-recipe': RecipeCreate
  },
  props: {
    showCreate: {
      required: false,
      default: () => (true)
    }
  },
  data () {
    return {
      collapsed: false,
      expandedCreate: false,
      active: []
    }
  },
  computed: {
    recipes () {
      return this.$store.state.recipes
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
