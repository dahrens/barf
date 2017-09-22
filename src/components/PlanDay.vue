<template>
  <nav class="panel">
    <p class="panel-heading">
      {{weekday}}
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <i v-if="!collapsed" class="fa fa-caret-down"></i>
        <i v-if="collapsed" class="fa fa-caret-right"></i>
      </a>
      <button v-on:click="expandedCreate = !expandedCreate" class="button is-small is-light is-pulled-right">
        <span v-if="!expandedCreate" class="icon">
          <i class="fa fa-eye"></i>
        </span>
        <span v-else class="icon">
          <i class="fa fa-eye-slash"></i>
        </span>
        <span class="icon is-small">
          <i class="fa fa-plus"></i>
        </span>
      </button>
      <button v-on:click="expandAll = !expandAll" class="button is-small is-light is-pulled-right">
        <span class="icon is-small">
          <i class="fa fa-expand"></i>
        </span>
        <span v-if="!expandAll" class="is-size-7">1</span>
        <span v-else>&#8734;</span>
      </button>
    </p>
    <a v-if="!collapsed" class="panel-block" v-for="meal in meals">
      {{getMealName(meal)}}
    </a>
    <div class="panel-block">
      {{ meals.length }} M
      {{ Object.values(mealsValues.animal).reduce((a, c) => a + c) }}g F
      {{ Object.values(mealsValues.vegetables).reduce((a, c) => a + c) }}g V
    </div>
    </div>
  </nav>
</template>

<script>
import subCategoryTag from '@/components/SubCategoryTag'

export default {
  name: 'planDay',
  props: ['plan', 'weekday', 'index'],
  components: {
    subCategoryTag
  },
  data () {
    return {
      expandedCreate: true,
      expandAll: false,
      collapsed: true
    }
  },
  computed: {
    meals () {
      return this.plan.meals[this.index]
    },
    mealsValues () {
      // create one big list of ingredients (cut recipe based meals into pieces)
      let distribution = this.$store.getters.mealsDistribution(this.meals)
      return distribution
    }
  },
  methods: {
    getMealName (item) {
      if (item.hasOwnProperty('ingredient')) {
        return this.$store.state.ingredients.filter(i => i.id === item.ingredient)[0].name
      } else if (item.hasOwnProperty('recipe')) {
        return this.$store.state.recipes.filter(r => r.id === item.recipe)[0].name
      }
    }
  }
}
</script>
