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
            <span class="is-pulled-right">{{animalCategory.subCategory}}</span>
          </div>
          <div class="column is-8">
            <subCategorySlider v-on:changed="onCategoryChange" :subCategory="animalCategory.subCategory"
            :category="animalCategory.category"
            :value="plan.subCategories.filter(sc => sc[1] === animalCategory.subCategory)[0][0]"></subCategorySlider>
          </div>
          <div class="column is-2">
            <a v-on:click="toggleLockCategory(animalCategory.subCategory)" class="button is-primary has-icon">
              <span class="icon">
                <i v-if="locks.indexOf(animalCategory.subCategory) === -1" class="fa fa-unlock"></i>
                <i v-else class="fa fa-lock"></i>
              </span>
            </a>
          </div>
        </div>
      </template>
      <hr>
      <template v-for="vegetablesCategory in vegetablesCategories">
        <div class="columns">
          <div class="column is-2">
            <span class="is-pulled-right">{{vegetablesCategory.subCategory}}</span>
          </div>
          <div class="column is-8">
            <subCategorySlider
              v-on:changed="onCategoryChange"
              :subCategory="vegetablesCategory.subCategory"
              :category="vegetablesCategory.category"
              :value="plan.subCategories.filter(sc => sc[1] === vegetablesCategory.subCategory)[0][0]"></subCategorySlider>
          </div>
          <div class="column is-2">
            <a v-on:click="toggleLockCategory(vegetablesCategory.subCategory)" class="button is-primary has-icon">
              <span class="icon">
                <i v-if="locks.indexOf(vegetablesCategory.subCategory) === -1" class="fa fa-unlock"></i>
                <i v-else class="fa fa-lock"></i>
              </span>
            </a>
          </div>
        </div>
      </template>
    </template>
  </nav>
</template>

<script>
import vueSlider from 'vue-slider-component'
import subCategorySlider from '@/components/SubCategorySlider'

export default {
  name: 'planPanel',
  props: ['plan'],
  components: {
    vueSlider,
    subCategorySlider
  },
  data () {
    return {
      locks: [],
      collapsed: false,
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
          { 'backgroundColor': 'green' }
        ],
        processStyle: { 'backgroundColor': '#363636' },
        tooltipStyle: [
          { 'backgroundColor': 'green', 'borderColor': 'green' },
          { 'backgroundColor': 'green', 'borderColor': 'green' }
        ]
      }
    }
  },
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
    },
    animalCategories () {
      return this.$store.getters.subCategories.filter(c => c.category === 'animal')
    },
    vegetablesCategories () {
      return this.$store.getters.subCategories.filter(c => c.category === 'vegetables')
    }
  },
  methods: {
    toggleLockCategory (category) {
      let idx = this.locks.indexOf(category)
      console.log('toggleLockCategory', category)
      if (idx === -1) {
        this.locks.push(category)
      } else {
        this.locks.splice(idx, 1)
      }
    },
    onCategoryChange (category, cls) {
      let diff = 0
      let untouched = []
      for (let subCategory of this.plan.subCategories) {
        if (subCategory[1] === category[1]) {
          diff = category[0] - subCategory[0]
        } else {
          untouched.push(subCategory)
        }
      }
      if (!diff) return
      let increase = diff > 0
      let decrease = diff < 0
      let adjust = []
      for (let c of this.subCategories) {
        if (c.category === cls && c.subCategory !== category[1] && this.locks.indexOf(c.subCategory) === -1) {
          adjust.push(untouched.filter(u => u[1] === c.subCategory)[0])
        }
      }
      if (!adjust.length) {
        this.$forceUpdate()
        return
      }
      let touched = []
      let diffPerCategory = Math.floor(Math.abs(diff) / adjust.length)
      let rest = Math.abs(diff) % adjust.length
      for (let subCategory of adjust.sort((a, b) => a[0] - b[0])) {
        if (increase) {
          let n = (subCategory[0] - diffPerCategory - rest)
          if (n >= 0) {
            touched.push([n, subCategory[1]])
            rest = 0
          } else {
            rest = Math.abs(n)
            touched.push([0, subCategory[1]])
          }
        }
        if (decrease) {
          let n = (subCategory[0] + diffPerCategory + rest)
          if (n <= 100) {
            touched.push([n, subCategory[1]])
            rest = 0
          } else {
            rest = (n - 100)
            touched.push([100, subCategory[1]])
          }
        }
      }
      touched.push(category)
      this.$store.commit('UPDATE_PLAN_CATEGORIES', {
        plan: this.plan.id,
        subCategories: touched
      })
      this.$forceUpdate()
    },
    getCategorySliderData (category) {
      let slider = JSON.parse(JSON.stringify(this.slider))
      slider.value = (parseFloat(this.plan.subCategories.filter(sub => sub[1] === category)[0]))
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
