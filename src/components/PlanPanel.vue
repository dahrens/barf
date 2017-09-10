<template>
  <nav class="panel">
    <p class="panel-heading">
      Plan
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <i v-if="!collapsed" class="fa fa-caret-down"></i>
        <i v-if="collapsed" class="fa fa-caret-right"></i>
      </a>
    </p>
    <template v-if="!collapsed">
      <div class="field has-addons">
        <div class="control">
          <button type="submit" class="button is-primary">
            <span class="icon">
              <i class="fa fa-plus"></i>
            </span>
          </button>
        </div>
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select name="country">
              <option value="Argentina">Delphi's Plan</option>
            </select>
          </div>
        </div>
        <div class="control">
          <button type="submit" class="button is-primary">
            <span class="icon">
              <i class="fa fa-save"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="field has-addons">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select name="country">
              <option value="1">Delphi</option>
              <option value="2">Loni</option>
            </select>
          </div>
        </div>
        <div class="control">
          <button type="submit" class="button is-primary">
            <span class="icon">
              <i class="fa fa-save"></i>
            </span>
          </button>
        </div>
      </div>
      <hr>
      <div class="columns">
        <div class="column is-2">
          <span class="is-pulled-right">tierisch</span>
        </div>
        <div class="column is-8">
          <vue-slider ref="slider-main-category" @callback="setBaseCategory" v-bind="getBaseCategorySliderData()" v-model="getBaseCategorySliderData().value"></vue-slider>
        </div>
        <div class="column is-2">
          <span class="is-pulled-left">pflanzlich</span>
        </div>
      </div>
      <hr>
      <template v-for="animalCategory in animalCategories">
        <div class="columns">
          <div class="column is-2">
            <span class="is-pulled-right">{{animalCategory.part}}</span>
          </div>
          <div class="column is-10">
            <categorySlider v-on:changed="onCategoryChange" :category="animalCategory.part" :cls="animalCategory.category" :value="plan.subcategories.filter(sc => sc[1] === animalCategory.part)[0][0]"></categorySlider>
          </div>
        </div>
      </template>
      <hr>
      <template v-for="vegetablesCategory in vegetablesCategories">
        <div class="columns">
          <div class="column is-2">
            <span class="is-pulled-right">{{vegetablesCategory.part}}</span>
          </div>
          <div class="column is-8">
            <categorySlider v-on:changed="onCategoryChange" :category="vegetablesCategory.part" :cls="vegetablesCategory.category" :value="plan.subcategories.filter(sc => sc[1] === vegetablesCategory.part)[0][0]"></categorySlider>
          </div>
          <div class="column is-2">
            <a class="icon">
              <i class="fa fa-unlock"></i>
            </a>
          </div>
        </div>
      </template>
    </template>
  </nav>
</template>

<script>
import vueSlider from 'vue-slider-component'
import categorySlider from '@/components/CategorySlider'

export default {
  name: 'planPanel',
  props: ['plan'],
  components: {
    vueSlider,
    categorySlider
  },
  data () {
    return {
      collapsed: false,
      locked: {
        'Fleisch': false
      },
      selectedPlan: 1,
      slider: {
        value: 0,
        min: 1,
        max: 100,
        speed: 0.5,
        bgStyle: {
          'backgroundColor': '#whitesmoke',
          'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        },
        sliderStyle: [
          { 'backgroundColor': '#363636' },
          { 'backgroundColor': 'orange' }
        ],
        processStyle: { 'backgroundColor': '#363636' },
        tooltipStyle: [
          { 'backgroundColor': 'orange', 'borderColor': 'orange' },
          { 'backgroundColor': 'orange', 'borderColor': 'orange' }
        ]
      }
    }
  },
  computed: {
    categories () {
      return this.$store.getters.categories
    },
    animalCategories () {
      return this.$store.getters.categories.filter(c => c.category === 'animal')
    },
    vegetablesCategories () {
      return this.$store.getters.categories.filter(c => c.category === 'vegetables')
    }
  },
  methods: {
    onCategoryChange (category, cls) {
      let diff = 0
      let untouched = []
      for (let subcategory of this.plan.subcategories) {
        if (subcategory[1] === category[1]) {
          diff = category[0] - subcategory[0]
        } else {
          untouched.push(subcategory)
        }
      }
      if (!diff) return
      let increase = diff > 0
      let decrease = diff < 0
      let adjust = []
      for (let c of this.categories) {
        if (c.category === cls && c.part !== category[1]) {
          adjust.push(untouched.filter(u => u[1] === c.part)[0])
        }
      }
      let touched = []
      let diffPerCategory = Math.floor(Math.abs(diff) / adjust.length)
      let rest = Math.abs(diff) % adjust.length
      for (let subcategory of adjust.sort((a, b) => a[0] - b[0])) {
        if (increase) {
          let n = (subcategory[0] - diffPerCategory - rest)
          if (n >= 0) {
            touched.push([n, subcategory[1]])
            rest = 0
          } else {
            rest = Math.abs(n)
            touched.push([0, subcategory[1]])
          }
        }
        if (decrease) {
          let n = (subcategory[0] + diffPerCategory + rest)
          if (n <= 100) {
            touched.push([n, subcategory[1]])
            rest = 0
          } else {
            rest = (n - 100)
            touched.push([100, subcategory[1]])
          }
        }
      }

      touched.push(category)
      this.$store.commit('UPDATE_PLAN_CATEGORIES', {
        plan: this.plan.id,
        subcategories: touched
      })
      this.$forceUpdate()
    },
    getCategorySliderData (category) {
      let slider = JSON.parse(JSON.stringify(this.slider))
      slider.value = (parseFloat(this.plan.subcategories.filter(sub => sub[1] === category)[0]))
      return slider
    },
    getBaseCategorySliderData (baseCategory) {
      let slider = JSON.parse(JSON.stringify(this.slider))
      slider.value = this.plan.animal
      return slider
    },
    setBaseCategory (val) {
      console.log('set', val)
    }
  }
}
</script>

<style scoped>
.vue-slider-component {
  margin-bottom: 0.7em;
}
</style>
