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
          </div>
          <template v-for="item in stash">
            <a class="panel-block is-active">
              stash item
            </a>
          </template>
        </nav>
      </div>
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
          <p class="panel-tabs">
            <template v-for="entity in entities">
              <a v-on:click="activateEntity(entity)" class="is-size-5" :class="{'is-active': entity === activeEntity}">{{ entity }}</a>
            </template>
          </p>
          <template v-for="element in elements">
            <a v-on:click="activateRecord(element)" class="panel-block is-active">
              <span class="panel-icon">
                <i v-if="isActive(element)" class="fa fa-eye"></i>
              </span>
              {{ element.name }}&nbsp;
              <span v-if="activeEntity === 'stash'"></span>
              <template v-if="activeEntity === 'ingredients'" v-for="part in element.parts">
                <category-tag :amount="part[0]" :category="part[1]"></category-tag>&nbsp;
              </template>
            </a>
          </template>
          <template v-if="showCreate">
            <create-ingredient v-if="activeEntity === 'ingredients'"></create-ingredient>
            <create-recipe v-if="activeEntity === 'recipes'"></create-recipe>
          </template>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientCreate from '@/components/IngredientCreate'
import IngredientDetail from '@/components/IngredientDetail'
import RecipeCreate from '@/components/RecipeCreate'
import CategoryTag from '@/components/CategoryTag'

export default {
  name: 'Stash',
  components: {
    'create-ingredient': IngredientCreate,
    'detail-ingredient': IngredientDetail,
    'create-recipe': RecipeCreate,
    'category-tag': CategoryTag
  },
  data () {
    return {
      showCreate: false,
      activeEntity: 'ingredients',
      activeIngredients: [],
      activeRecipes: [],
      entities: ['ingredients', 'recipes']
    }
  },
  computed: {
    stash () {
      return this.$store.state.stash
    },
    elements () {
      return this.$store.state[this.activeEntity]
    }
  },
  methods: {
    activateEntity: function (entity) {
      this.activeEntity = entity
    },
    activateRecord: function (record) {
      if (this.activeEntity === 'ingredients') {
        if (this.activeIngredients.indexOf(record) === -1) {
          this.activeIngredients.push(record)
        } else {
          this.activeIngredients.splice(this.activeIngredients.indexOf(record), 1)
        }
      } else if (this.activeEntity === 'recipes') {
        if (this.activeRecipes.indexOf(record) === -1) {
          this.activeRecipes.push(record)
        } else {
          this.activeRecipes.splice(this.activeRecipes.indexOf(record), 1)
        }
      }
    },
    isActive: function (record) {
      if (this.activeEntity === 'ingredients') {
        return this.activeIngredients.indexOf(record) !== -1
      } else if (this.activeEntity === 'recipes') {
        return this.activeRecipes.indexOf(record) !== -1
      }
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
