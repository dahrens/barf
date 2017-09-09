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
          <template v-for="recipe in recipes">
            <a v-on:click="activateRecipe(recipe)" class="panel-block is-active">
              <span class="panel-icon">
                <i v-if="isActive(recipe)" class="fa fa-eye"></i>
              </span>
              {{ recipe.name }}
            </a>
          </template>
        </nav>
      </div>
      <div class="column is-half">
        <template v-if="showCreate">
          <create-recipe></create-recipe>
        </template>
        <template v-for="activeRecipe in activeRecipes">
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCreate from '@/components/RecipeCreate'

export default {
  name: 'Recipes',
  components: {
    'create-recipe': RecipeCreate
  },
  data () {
    return {
      showCreate: true,
      activeRecipes: []
    }
  },
  computed: {
    recipes () {
      return this.$store.state.recipes
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
    isActive: function (record) {
      return this.activeRecipes.indexOf(record) !== -1
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
