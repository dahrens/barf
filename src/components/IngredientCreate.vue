<template>
  <div class="ingredient-create">
    <div class="panel-block">
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
                <fa v-if="isNameValid" pack="fas" name="check" />
              </span>
              <span v-if="!isNameValid && newIngredient.name !== ''" class="icon is-small is-right has-text-danger">
                <fa v-if="!isNameValid" pack="fas" name="times" />
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
              <input class="input" type="number" min="1" max="999999" step="1" v-model="newIngredient.defaultAmount">
            </p>
          </div>
        </div>
      </div>
    </div>
    <template v-for="subCategory in newIngredient.subCategories">
      <div class="panel-block">
        <div v-model="newIngredient.subCategories" class="field has-addons">
          <p class="control">
            <span class="select">
              <select v-model="subCategory[1]">
                <option v-for="option in subCategoryOptions" v-model="subCategory[1]">{{ option.subCategory}}</option>
              </select>
            </span>
          </p>
          <p class="control is-expanded">
            <input class="input" type="number" min="0" max="1" step="0.1" v-model="subCategory[0]"
                  :class="{
                    'is-danger': !isSubcategoriesValid
                  }">
          </p>
          <p class="control">
            <a v-if="canAddSubcategory" class="button" v-on:click="splitNewSubcategory(subCategory)">
              <span class="icon">
                <fa pack="fas" name="plus" />
              </span>
            </a>
            <a v-if="canDeleteSubcategory" class="button" v-on:click="mergeExistingSubcategory(subCategory)">
              <span class="icon">
                <fa pack="fas" name="trash" />
              </span>
            </a>
          </p>
        </div>
        <p v-if="!isSubcategoriesValid" class="help is-danger">The sum of all subCategories must be 1, not {{subCategoryValue}}</p>
      </div>
    </template>
    <div class="panel-block">
      <button title="Add ingredient" class="button is-primary is-fullwidth" v-on:click="createNewIngredient()" :disabled="!isValid">
        <span class="icon">
          <fa pack="fas" name="save" />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { INSERT_INGREDIENT } from '@/store/mutation-types'

export default {
  name: 'createIngredient',
  data () {
    let newIngredient = {
      name: '',
      subCategories: [[1, 'meat']],
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
    subCategoryOptions () {
      return this.$store.getters.subCategories
    },
    isNameValid () {
      if (this.$store.state.ingredients.map(i => i.name).indexOf(this.newIngredient.name) !== -1 || this.newIngredient.name === '') {
        return false
      }
      return true
    },
    subCategoryValue () {
      return this.newIngredient.subCategories.map(p => p[0]).reduce((a, c) => parseFloat(a) + parseFloat(c))
    },
    isSubcategoriesValid () {
      return this.newIngredient.subCategories.map(p => p[0]).reduce((a, c) => parseFloat(a) + parseFloat(c)) === 1.0
    },
    isValid () {
      return this.isNameValid && this.isSubcategoriesValid
    },
    canDeleteSubcategory () {
      return this.newIngredient.subCategories.length > 1
    },
    canAddSubcategory () {
      return this.newIngredient.subCategories.length < this.subCategoryOptions.length
    }
  },
  methods: {
    splitNewSubcategory: function (subCategory) {
      subCategory[0] = subCategory[0] / 2
      let idx = this.newIngredient.subCategories.indexOf(subCategory)
      let usedValues = this.newIngredient.subCategories.map(e => e[1])
      let possibleValues = this.subCategoryOptions.filter(e => usedValues.indexOf(e.subCategory) === -1)
      if (possibleValues.length) {
        this.newIngredient.subCategories.splice(idx + 1, 0, [subCategory[0], possibleValues[0].subCategory])
      }
    },
    mergeExistingSubcategory: function (subCategory) {
      // split value to all others
      // remove this subCategory
    },
    createNewIngredient: function () {
      if (!this.isValid) {
        return
      }
      this.$store.commit(INSERT_INGREDIENT, this.newIngredient)
      this.newIngredient = JSON.parse(this.newIngredientBlueprint)
    }
  }
}
</script>
