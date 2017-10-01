<template>
  <nav class="panel market-panel">
    <p class="panel-heading">
      Recipes
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
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
              <fa v-if ="!isActive(recipe)" pack="fas" name="caret-right" />
              <fa v-if ="isActive(recipe)" pack="fas" name="caret-down" />
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

<style>
.panel-heading-icon {
  margin-right: 24px;
}
</style>
