<template>
  <nav class="panel market-panel">
    <p v-if="showHeading" class="panel-heading">
      Ingredients
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-if="showCreate" v-on:click="expandedCreate = !expandedCreate" class="is-light is-pulled-right">
        <span class="icon has-text-dark">
          <fa v-if="!expandedCreate" pack="fas" name="plus" />
          <fa v-if="expandedCreate" pack="fas" name="times"/>
        </span>
      </a>
      <a v-on:click="expandMany = !expandMany" class="is-light is-pulled-right">
        <span class="icon has-text-dark panel-heading-icon">
          <fa v-if="expandMany" pack="fas" name="arrows-alt-v" size="sm" />
          <fa v-if="!expandMany" pack="fas" name="crosshairs" size="sm" />
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
          <fa pack="fas" name="search" />
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
              <fa v-if ="!isActive(ingredient)" pack="fas" name="caret-right" />
              <fa v-if ="isActive(ingredient)" pack="fas" name="caret-down" />
            </p>
            {{ ingredient.name }}
          </a>
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
                    <fa pack="fas" name="sun" />
                  </span>
                </a>
              </p>
              <p class="control">
                <a v-on:click="scheduleMeal(ingredient.id, 'evening')" class="button" title="Schedule evening">
                  <span class="icon">
                    <fa pack="fas" name="moon" />
                  </span>
                </a>
              </p>
            </div>
            <stashIngredient v-if="settings.useStash" :ingredient="ingredient"></stashIngredient>
          </div>
      </template>
    </template>
  </nav>
</template>

<script>
import ingredientCreate from '@/components/IngredientCreate'
import stashIngredient from '@/components/StashIngredient'
import { SCHEDULE_MEAL } from '@/store/mutation-types'

export default {
  name: 'ingredients',
  components: {
    ingredientCreate,
    stashIngredient
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
      if (this.subCategoryFilter !== 'all') {
        let filter = (i) => i.subCategories.map(e => e[1]).indexOf(this.subCategoryFilter) !== -1
        ingredients = ingredients.filter(filter)
      }
      if (this.search !== '') {
        ingredients = ingredients.filter(i => i.name.indexOf(this.search) !== -1)
      }
      return ingredients
    },
    subCategories () {
      return this.$store.getters.subCategories.map(s => s.subCategory)
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
    }
  }
}
</script>
