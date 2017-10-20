<template>
  <span>
    <p v-if="showHeading" class="panel-heading">
      Ingredients
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" icon="caret-down" />
        <fa v-if="collapsed" icon="caret-right" />
      </a>
      <a v-if="showCreate" v-on:click="expandedCreate = !expandedCreate" class="is-light is-pulled-right">
        <span class="icon has-text-dark">
          <fa v-if="!expandedCreate" icon="plus"/>
          <fa v-if="expandedCreate" icon="times"/>
        </span>
      </a>
      <a v-on:click="expandMany = !expandMany" class="is-light is-pulled-right">
        <span class="icon has-text-dark panel-heading-icon">
          <fa v-if="expandMany" icon="arrows-alt-v" size="sm" />
          <fa v-if="!expandMany" icon="crosshairs"size="sm" />
        </span>
      </a>
    </p>
    <template v-if="expandedCreate">
      <ingredientCreate></ingredientCreate>
    </template>
    <div v-if="!collapsed" class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="search" v-model="search">
        <span class="icon is-small is-left">
          <fa icon="search"/>
        </span>
      </p>
    </div>
    <p v-if="!collapsed" class="panel-tabs">
      <a v-on:click="subCategoryFilter = 'all'"
        :class="{'is-active': subCategoryFilter === 'all'}">all</a>
      <a v-for="subCategory in subCategories"
        v-on:click="subCategoryFilter = subCategory"
        :class="{'is-active': subCategoryFilter === subCategory}">{{ subCategory }}</a>
    </p>
    <template v-if="!collapsed">
      <template v-for="ingredient in ingredients">
          <a v-on:click="activate(ingredient)" class="panel-block" :class="{'is-active': isActive(ingredient)}">
            <p class="panel-icon">
              <fa v-if ="!isActive(ingredient)" icon="caret-right" />
              <fa v-if ="isActive(ingredient)" icon="caret-down" />
            </p>
            {{ ingredient.name }}
          </a>
          <div v-if="isActive(ingredient)" class="faked-panel-block">
            <div class="field is-grouped is-grouped-multiline">
              <span v-if="!dog" class="control">composition</span>
              <template v-for="meta in ingredient.subCategories">
                <div class="control">
                  <subCategoryTag
                    :subCategory="meta.subCategory"
                    :amount="meta.portion"
                    unit="%">
                  </subCategoryTag>
                </div>
              </template>
              <span v-if="!dog" class="control">
                default amount
                <strong>{{ ingredient.defaultAmount }}</strong>
              </span>
              <span v-if="!dog" class="control">
                unit <strong>{{ ingredient.unit }}</strong>
              </span>
              <a v-if="!dog" v-on:click="removeIngredient(ingredient)" class="control button is-danger">
                <span class="icon">
                  <fa icon="trash" />
                </span>
              </a>
            </div>
          </div>
          <div v-if="isActive(ingredient) && dog" class="faked-panel-block">
            <div class="field has-addons has-addons-right">
              <p class="control is-expanded">
                <input v-model="mealAmounts[ingredient.id]" class="input" type="number" placeholder="Amount" min="0" max="100000" step="25">
              </p>
              <p class="control">
                <a class="button is-static">
                  <span class="">
                    {{ ingredient.unit }}
                  </span>
                </a>
              </p>
              <p class="control">
                <a v-on:click="scheduleMeal(ingredient.id, 'morning')" class="button" title="Schedule morning">
                  <span class="icon">
                    <fa icon="sun"/>
                  </span>
                </a>
              </p>
              <p class="control">
                <a v-on:click="scheduleMeal(ingredient.id, 'evening')" class="button" title="Schedule evening">
                  <span class="icon">
                    <fa icon="moon"/>
                  </span>
                </a>
              </p>
            </div>
            <stashIngredient v-if="settings.useStash" :ingredient="ingredient"></stashIngredient>
          </div>
      </template>
    </template>
  </span>
</template>

<script>
import subCategoryTag from '@/components/include/SubCategoryTag'
import ingredientCreate from '@/components/IngredientCreate'
import stashIngredient from '@/components/StashIngredient'
import { SCHEDULE_MEAL, REMOVE_INGREDIENT } from '@/store/mutation-types'

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
    },
    showHeading: {
      required: false,
      default: () => true
    },
    dog: {
      required: false,
      default: () => (false)
    },
    day: {
      required: false,
      default: () => (false)
    },
    availableSubCategories: {
      required: false,
      default: () => ([])
    }
  },
  data () {
    return {
      expandMany: false,
      expandedCreate: false,
      collapsed: false,
      active: [],
      subCategoryFilter: 'all',
      search: '',
      mealAmounts: {}
    }
  },
  created () {
    for (let ingredient of this.ingredients) {
      this.mealAmounts[ingredient.id] = 100
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    },
    ingredients () {
      let ingredients = this.$store.state.ingredients
      let filter = (i) => (true)
      if (this.subCategoryFilter === 'all') {
        if (this.availableSubCategories.length !== 0) {
          filter = (i) => {
            for (let subCategory of i.subCategories.map(e => e.subCategory)) {
              if (this.availableSubCategories.indexOf(subCategory) !== -1) return true
            }
            return false
          }
        }
      } else {
        filter = (i) => i.subCategories.map(e => e.subCategory).indexOf(this.subCategoryFilter) !== -1
      }

      ingredients = ingredients.filter(filter)

      if (this.search !== '') {
        ingredients = ingredients.filter(i => i.name.indexOf(this.search) !== -1)
      }
      return ingredients
    },
    subCategories () {
      if (this.availableSubCategories.length === 0) {
        return this.$store.getters.subCategories.map(s => s.subCategory)
      } else {
        return this.$store.getters.subCategories.map(s => s.subCategory).filter(
          (subCategory) => this.availableSubCategories.indexOf(subCategory) !== -1
        )
      }
    }
  },
  methods: {
    activate: function (record) {
      if (this.active.indexOf(record) === -1) {
        if (!this.expandMany) this.active = []
        this.active.push(record)
      } else {
        if (!this.expandMany) this.active = []
        this.active.splice(this.active.indexOf(record), 1)
      }
    },
    isActive: function (record) {
      return this.active.indexOf(record) !== -1
    },
    scheduleMeal (ingredientId, timeOfDay) {
      this.$store.commit(SCHEDULE_MEAL, {
        dog: this.dog.id,
        day: this.day,
        timeOfDay,
        meal: {
          ingredient: ingredientId,
          amount: this.mealAmounts[ingredientId]
        }
      })
    },
    removeIngredient: function (ingredient) {
      this.$store.commit(REMOVE_INGREDIENT, {
        ingredient: ingredient,
        cascade: this.$store.getters.ingredientRelations(ingredient)
      })
    }
  }
}
</script>
