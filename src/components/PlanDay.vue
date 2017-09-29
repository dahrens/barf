<template>
  <nav class="panel">
    <p class="panel-heading">
      {{weekday}}
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="solid" name="caret-down" />
        <fa v-if="collapsed" pack="solid" name="caret-right" />
      </a>
      <a class="is-pulled-right has-text-dark">
        <fa v-on:click="expandedCreate = !expandedCreate" pack="solid" name="plus" />
      </a>
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
      return this.plan.week[this.index]
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
