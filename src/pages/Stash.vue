<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">Stash</h2>
          <p class="subtitle">
            You might want to fill your stash. This enables B.A.R.F. to create plans for your dog based on whats available.
          </p>
        </div>
      </div>
    </section>
    <div class="stash">
      <div class="columns">
        <div class="column is-half">
          <nav class="panel">
            <p class="panel-heading">
              Stash
            </p>
            <div class="panel-block">
              <p class="control has-icons-left">
                <input class="input is-small" type="text" placeholder="search">
                <span class="icon is-small is-left">
                  <fa icon="search"/>
                </span>
              </p>
            </div>
            <template v-for="ingredientMeta in ingredientStash">
              <a v-on:click="activateStashItem(ingredientMeta.item)" class="panel-block" :class="{'is-active': isActiveStashItem(ingredientMeta.item)}">
                <p class="panel-icon">
                  <fa v-if ="!isActiveStashItem(ingredientMeta.item)" icon="caret-right" />
                  <fa v-if ="isActiveStashItem(ingredientMeta.item)" icon="caret-down" />
                </p>
                {{ ingredientMeta.ingredient.name }}&nbsp;
                <template v-for="amountMeta in ingredientMeta.amounts">
                  <span class="tag is-dark">
                    <span class="is-size-6">{{amountMeta[0]}}{{ingredientMeta.unit}}</span>&nbsp;&nbsp;&nbsp;
                    <span class="is-size-7">x{{amountMeta[1]}}</span>
                  </span>&nbsp;
                </template>
              </a>
              <span v-if="isActiveStashItem(ingredientMeta.item)"class="panel-block">
                stash not implemented
              </span>
            </template>
            <template v-for="recipeMeta of recipeStash">
              <a v-on:click="activateStashItem(recipeMeta.recipe)" class="panel-block" :class="{'is-active': isActiveStashItem(recipeMeta.recipe)}">
                <p class="panel-icon">
                  <fa v-if ="!isActiveStashItem(recipeMeta.recipe)" icon="caret-right" />
                  <fa v-if ="isActiveStashItem(recipeMeta.recipe)" icon="caret-down" />
                </p>
                {{ recipeMeta.recipe.name }}&nbsp;
                <span class="tag is-dark">
                  <span class="is-size-7">x{{ recipeMeta.quantity }}</span>
                </span>
              </a>
              <span v-if="isActiveStashItem(recipeMeta.recipe)"class="panel-block">
                stash not implemented
              </span>
            </template>
          </nav>
        </div>
        <div class="column is-half">
          <ingredients></ingredients>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ingredients from '@/components/Ingredients'

export default {
  name: 'Stash',
  components: {
    ingredients
  },
  data () {
    return {
      activeStashItems: []
    }
  },
  computed: {
    stash () {
      return this.$store.state.stash
    },
    ingredientStash () {
      return this.$store.getters.stashedIngredients
    },
    recipeStash () {
      return this.$store.getters.stashedRecipes
    }
  },
  methods: {
    activateStashItem: function (record) {
      if (this.activeStashItems.indexOf(record) === -1) {
        this.activeStashItems.push(record)
      } else {
        this.activeStashItems.splice(this.activeStashItems.indexOf(record), 1)
      }
    },
    isActiveStashItem (record) {
      return this.activeStashItems.indexOf(record) !== -1
    }
  }
}
</script>

<style lang="sass">
.stash
  margin-top: 0.75em
  margin-bottom: 0.5em
</style>
