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
          <p class="panel-tabs">
            <template v-for="entity in entities">
              <a v-on:click="activateEntity(entity)" :class="{'is-active': entity === activeEntity}">{{ entity }}</a>
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
          <create-ingredient v-if="activeEntity === 'ingredients'"></create-ingredient>
        </nav>
      </div>
      <div class="column is-half">
        <template v-for="activeIngredient in activeIngredients">
          <detail-ingredient v-if="activeEntity === 'ingredients'" v-on:close="activateRecord(activeIngredient)" :ingredient="activeIngredient"></detail-ingredient>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientCreate from '@/components/IngredientCreate'
import IngredientDetail from '@/components/IngredientDetail'
import CategoryTag from '@/components/CategoryTag'

export default {
  name: 'hello',
  components: {
    'create-ingredient': IngredientCreate,
    'detail-ingredient': IngredientDetail,
    'category-tag': CategoryTag
  },
  data () {
    return {
      activeEntity: 'ingredients',
      activeIngredients: [],
      entities: ['ingredients', 'recipes', 'stash']
    }
  },
  computed: {
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
      }
    },
    isActive: function (record) {
      return this.activeIngredients.indexOf(record) !== -1
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
