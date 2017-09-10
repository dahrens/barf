<template>
  <article class="message">
    <div class="message-body">
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-right">
              <input class="input" type="text" placeholder="Name" v-model="newRecipe.name"
                    :class="{
                      'is-danger': !isNameValid && this.newRecipe.name !== '',
                      'is-success': isNameValid && newRecipe.name !== ''
                    }">
              <span v-if="newRecipe.name" class="icon is-small is-right">
                <i v-if="isNameValid" class="fa fa-check has-text-success"></i>
              </span>
              <span v-if="!isNameValid && newRecipe.name !== ''" class="icon is-small is-right">
                <i v-if="!isNameValid" class="fa fa-times has-text-danger"></i>
              </span>
            </div>
            <p v-if="this.newRecipe.name === ''" class="help is-danger">Wähle einen Namen für das neue Rezept</p>
            <p v-if="!isNameValid && this.newRecipe.name !== ''" class="help is-danger">Ein Rezept mit diesem Namen gibt es schon</p>
          </div>
        </div>
      </div>
      <div v-for="ingredient in newRecipe.ingredients" class="field has-addons">
        <p class="control">
          <span class="select">
            <select v-model="ingredient.ingredient">
              <option v-for="option in ingredientOptions" v-model="ingredient.ingredient">{{ option.name }}</option>
            </select>
          </span>
        </p>
        <p class="control">
          <input class="input" type="number" min="0" max="99999" step="1" v-model="ingredient.amount">
        </p>
        <p class="control">
          <a class="button" v-on:click="addIngredient()">
            <span class="icon">
              <i class="fa fa-plus"></i>
            </span>
          </a>
          <a v-on:click="removeIngredient(ingredient)" v-if="newRecipe.ingredients.length !== 1" class="button">
            <span class="icon">
              <i class="fa fa-trash"></i>
            </span>
          </a>
        </p>
      </div>
    </div>
    <div class="message-footer">
      <button title="Add ingredient" class="button is-primary is-fullwidth" v-on:click="createNewRecipe()" :disabled="!isValid">
        <span class="icon">
          <i class="fa fa-plus"></i>
        </span>
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'create-recipe',
  data () {
    let newRecipe = {
      name: '',
      ingredients: [
        { ingredient: 1, amount: 100 }
      ]
    }
    return {
      newRecipeBlueprint: JSON.stringify(newRecipe),
      newRecipe: newRecipe
    }
  },
  computed: {
    ingredientOptions () {
      let options = []
      for (let ingredient of this.$store.state.ingredients) {
        options.push({
          name: ingredient.name,
          value: ingredient.id
        })
      }
      return options
    },
    isNameValid () {
      if (this.$store.state.recipes.map(i => i.name).indexOf(this.newRecipe.name) !== -1 || this.newRecipe.name === '') {
        return false
      }
      return true
    },
    isValid () {
      return this.isNameValid
    }
  },
  methods: {
    addIngredient: function () {
      this.newRecipe.ingredients.push({ ingredient: 1, amount: 100 })
    },
    removeIngredient: function (ingredient) {
      let idx = this.newRecipe.ingredients.indexOf(ingredient)
      if (idx !== -1) {
        this.newRecipe.ingredients.splice(idx, 1)
      }
    },
    createNewRecipe: function () {
      if (!this.isValid) {
        return
      }
      this.$store.commit('INSERT_RECIPE', this.newRecipe)
      this.newRecipe = JSON.parse(this.newRecipeBlueprint)
    }
  }
}
</script>
