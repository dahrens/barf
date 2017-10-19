<template>
  <div class="ingredient-create">
    <div class="faked-panel-block">
      <div class="field has-addons has-addons-right">
        <div class="field-body">
          <div class="field">
            <div class="control is-expanded">
              <input class="input" type="text" placeholder="Name" v-model="newIngredient.name"
                    :class="{
                      'is-danger': !isNameValid && this.newIngredient.name !== '',
                      'is-success': isNameValid && newIngredient.name !== ''
                    }">
              <span v-if="newIngredient.name" class="icon is-small is-right">
                <fa v-if="isNameValid" icon="check"/>
              </span>
              <span v-if="!isNameValid && newIngredient.name !== ''" class="icon is-small is-right has-text-danger">
                <fa v-if="!isNameValid" icon="times"/>
              </span>
            </div>
            <p v-if="this.newIngredient.name === ''" class="help is-danger">Pick a name</p>
            <p v-if="!isNameValid && this.newIngredient.name !== ''" class="help is-danger">This ingredient name already exists</p>
          </div>
          <div class="field">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="number" min="0" max="100000" step="500" v-model="newIngredient.defaultAmount">
              </p>
              <p class="control">
                <span class="select">
                  <select v-model="newIngredient.unit">
                    <option v-for="option in unitOptions" v-model="option.value">{{ option.name }}</option>
                  </select>
                </span>
              </p>
            </div>
            <p class="help is-info">The quantity in which you usually achieve this ingredient.</p>
          </div>
          <div class="field">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="number" min="0" max="100ß" step="1" v-model="newIngredient.price">
              </p>
              <p class="control">
                <a class="button is-static">
                  €
                </a>
              </p>
            </div>
            <p class="help is-info">The price of this ingredient.</p>
          </div>
        </div>
      </div>
    </div>
    <template v-for="meta in newIngredient.subCategories">
      <div class="faked-panel-block">
        <div class="field has-addons">
          <a class="button is-static">
            <span class="icon is-medium" v-bind:style="{ color: subCategoryColor(meta.subCategory) }">
              <fa size="2x" icon="square"/>
            </span>
          </a>
          <p class="control is-expanded">
            <span class="select is-fullwidth">
              <select v-model="meta.subCategory">
                <option v-for="option in subCategoryOptions">{{ option.subCategory}}</option>
              </select>
            </span>
          </p>
          <p class="control is-expanded">
            <input class="input" type="number" min="0" max="100" step="10" v-model="meta.portion"
                  :class="{
                    'is-danger': !isSubcategoriesValid
                  }">
          </p>
          <p class="control is-expanded">
            <a v-if="canAddSubcategory" class="button" v-on:click="splitNewSubcategory(meta)">
              <span class="icon">
                <fa icon="plus"/>
              </span>
            </a>
            <a v-if="canDeleteSubcategory" class="button" v-on:click="mergeExistingSubcategory(meta)">
              <span class="icon">
                <fa icon="trash"/>
              </span>
            </a>
          </p>
        </div>
        <p v-if="!isSubcategoriesValid" class="help is-danger">The sum of all subCategories portions must be 100, not {{ subCategoryValue }}</p>
      </div>
    </template>
    <div class="panel-block">
      <button title="Add ingredient" class="button is-primary is-fullwidth" v-on:click="createNewIngredient()" :disabled="!isValid">
        <span class="icon">
          <fa icon="save"/>
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
      subCategories: [{ portion: 100, subCategory: 'meat' }],
      unit: 'g',
      defaultAmount: 2000,
      price: 0.0
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
      return this.newIngredient.subCategories.map(p => p.portion).reduce((a, c) => parseFloat(a) + parseFloat(c))
    },
    isSubcategoriesValid () {
      return this.newIngredient.subCategories.map(p => p.portion).reduce((a, c) => parseFloat(a) + parseFloat(c)) === 100
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
    subCategoryColor (subCategory) {
      return this.$store.getters.subCategoryColor(subCategory)
    },
    splitNewSubcategory: function (meta) {
      meta.portion = meta.portion / 2
      let idx = this.newIngredient.subCategories.indexOf(meta)
      let usedValues = this.newIngredient.subCategories.map(e => e.subCategory)
      let possibleValues = this.subCategoryOptions.filter(e => usedValues.indexOf(e.subCategory) === -1)
      if (possibleValues.length) {
        this.newIngredient.subCategories.splice(idx + 1, 0, {
          portion: meta.portion,
          subCategory: possibleValues[0].subCategory
        })
      }
    },
    mergeExistingSubcategory: function (meta) {
      let idx = this.newIngredient.subCategories.indexOf(meta)
      if (idx !== -1) {
        this.newIngredient.subCategories.splice(idx, 1)
        this.newIngredient.subCategories[0].portion += meta.portion
      }
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
