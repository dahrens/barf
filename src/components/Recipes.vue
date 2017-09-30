<template>
  <nav class="panel market-panel">
    <p class="panel-heading">
      Recipes
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="chevron-down" />
        <fa v-if="collapsed" pack="fas" name="chevron-right" />
      </a>
      <button v-if="showCreate" v-on:click="expandedCreate = !expandedCreate" class="button is-small is-light is-pulled-right">
        <span v-if="!expandedCreate" class="icon">
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
        <span v-if="!expandAll" class="is-size-7">1</span>
        <span v-else>&#8734;</span>
      </button>
    </p>
    <template v-if="expandedCreate">
      <create-recipe></create-recipe>
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
      <template v-for="recipe in recipes">
          <a v-on:click="activate(recipe)" class="panel-block" :class="{'is-active': isActive(recipe)}">
            <p class="panel-icon">
              <fa v-if ="!isActive(recipe)" pack="fas" name="chevron-right" />
              <fa v-if ="isActive(recipe)" pack="fas" name="chevron-down" />
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
  </nav>
</template>

<script>
import StashRecipe from '@/components/StashRecipe'
import RecipeCreate from '@/components/RecipeCreate'

export default {
  name: 'recipes',
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
      expandAll: false,
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
