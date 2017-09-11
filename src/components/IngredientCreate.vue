<template>
  <article class="message">
    <div class="message-body">
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-right">
              <input class="input" type="text" placeholder="Name" v-model="newIngredient.name"
                    :class="{
                      'is-danger': !isNameValid && this.newIngredient.name !== '',
                      'is-success': isNameValid && newIngredient.name !== ''
                    }">
              <span v-if="newIngredient.name" class="icon is-small is-right">
                <i v-if="isNameValid" class="fa fa-check has-text-success"></i>
              </span>
              <span v-if="!isNameValid && newIngredient.name !== ''" class="icon is-small is-right">
                <i v-if="!isNameValid" class="fa fa-times has-text-danger"></i>
              </span>
            </div>
            <p v-if="this.newIngredient.name === ''" class="help is-danger">Pick a name</p>
            <p v-if="!isNameValid && this.newIngredient.name !== ''" class="help is-danger">This ingredient name already exists</p>
          </div>
          <div class="field has-addons">
            <p class="control">
              <span class="select">
                <select v-model="newIngredient.unit">
                  <option v-for="option in unitOptions" v-model="option.value">{{ option.name }}</option>
                </select>
              </span>
            </p>
            <p class="control is-expanded">
              <input class="input" type="number" min="1" max="999999" step="1" v-model="newIngredient.amount">
            </p>
          </div>

        </div>

      </div>
      <div v-for="subcategory in newIngredient.subcategories" v-model="newIngredient.subcategories" class="field has-addons">
        <p class="control">
          <span class="select">
            <select v-model="subcategory[1]">
              <option v-for="option in subcategoryOptions" v-model="subcategory[1]">{{ option.subcategory}}</option>
            </select>
          </span>
        </p>
        <p class="control is-expanded">
          <input class="input" type="number" min="0" max="1" step="0.1" v-model="subcategory[0]"
                :class="{
                  'is-danger': !isSubcategoriesValid
                }">
        </p>
        <p class="control">
          <a v-if="canAddSubcategory" class="button" v-on:click="splitNewSubcategory(subcategory)">
            <span class="icon">
              <i class="fa fa-plus"></i>
            </span>
          </a>
          <a v-if="canDeleteSubcategory" class="button" v-on:click="mergeExistingSubcategory(subcategory)">
            <span class="icon">
              <i class="fa fa-trash"></i>
            </span>
          </a>
        </p>
      </div>
      <p v-if="!isSubcategoriesValid" class="help is-danger">The sum of all subcategories must be 1, not {{subcategoryValue}}</p>
    </div>
    <div class="message-footer">
      <button title="Add ingredient" class="button is-primary is-fullwidth" v-on:click="createNewIngredient()" :disabled="!isValid">
        <span class="icon">
          <i class="fa fa-plus"></i>
        </span>
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'create-ingredient',
  data () {
    let newIngredient = {
      name: '',
      subcategories: [[1, 'Fleisch']],
      unit: 'g',
      defaultAmount: 2000
    }
    return {
      newIngredientBlueprint: JSON.stringify(newIngredient),
      newIngredient: newIngredient
    }
  },
  computed: {
    unitOptions () {
      let options = []
      for (let unit of this.$store.state.units) {
        options.push({
          name: unit,
          value: unit
        })
      }
      return options
    },
    subcategoryOptions () {
      return this.$store.getters.subcategories
    },
    isNameValid () {
      if (this.$store.state.ingredients.map(i => i.name).indexOf(this.newIngredient.name) !== -1 || this.newIngredient.name === '') {
        return false
      }
      return true
    },
    subcategoryValue () {
      return this.newIngredient.subcategories.map(p => p[0]).reduce((a, c) => parseFloat(a) + parseFloat(c))
    },
    isSubcategoriesValid () {
      return this.newIngredient.subcategories.map(p => p[0]).reduce((a, c) => parseFloat(a) + parseFloat(c)) === 1.0
    },
    isValid () {
      return this.isNameValid && this.isSubcategoriesValid
    },
    canDeleteSubcategory () {
      return this.newIngredient.subcategories.length > 1
    },
    canAddSubcategory () {
      return this.newIngredient.subcategories.length < this.subcategoryOptions.length
    }
  },
  methods: {
    splitNewSubcategory: function (subcategory) {
      subcategory[0] = subcategory[0] / 2
      let idx = this.newIngredient.subcategories.indexOf(subcategory)
      let usedValues = this.newIngredient.subcategories.map(e => e[1])
      let possibleValues = this.subcategoryOptions.filter(e => usedValues.indexOf(e.subcategory) === -1)
      if (possibleValues.length) {
        this.newIngredient.subcategories.splice(idx + 1, 0, [subcategory[0], possibleValues[0].subcategory])
      }
    },
    mergeExistingSubcategory: function (subcategory) {
      // split value to all others
      // remove this subcategory
    },
    createNewIngredient: function () {
      if (!this.isValid) {
        return
      }
      this.$store.commit('INSERT_INGREDIENT', this.newIngredient)
      this.newIngredient = JSON.parse(this.newIngredientBlueprint)
    }
  }
}
</script>
