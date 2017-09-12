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
      <div class="columns distribution-slider">
        <div class="column is-2">
          <span class="is-pulled-right">tierisch</span>
        </div>
        <div class="column is-8">
          <vue-slider @callback="setPlanCategoryDistribution" v-bind="getPlanCategoryDistribution" v-model="getPlanCategoryDistribution.value"></vue-slider>
        </div>
        <div class="column is-2">
          <span class="is-pulled-left">pflanzlich</span>
        </div>
      </div>
      <categorySliders :plan="plan" :category="'animal'" :sliderConfig="sliderConfig"></categorySliders>
      <categorySliders :plan="plan" :category="'vegetables'" :sliderConfig="sliderConfig"></categorySliders>
    </template>
  </nav>
</template>

<script>
import vueSlider from 'vue-slider-component'
import subCategorySlider from '@/components/SubCategorySlider'
import categorySliders from '@/components/CategorySliders'

export default {
  name: 'planPanel',
  props: ['plan'],
  components: {
    vueSlider,
    subCategorySlider,
    categorySliders
  },
  data () {
    return {
      locks: [],
      collapsed: false,
      selectedPlan: 1,
      sliderConfig: {
        value: 0,
        min: 1,
        max: 100,
        speed: 0.5,
        bgStyle: {
          'backgroundColor': 'whitesmoke',
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
    getPlanCategoryDistribution () {
      let slider = JSON.parse(JSON.stringify(this.sliderConfig))
      slider.value = this.plan.animal
      return slider
    }
  },
  methods: {
    setPlanCategoryDistribution (value) {
      console.log('setPlanCategoryDistribution')
      this.$store.commit('UPDATE_PLAN_CATEGORY_DISTRIBUTION', {plan: this.plan.id, value: value})
    }
  }
}
</script>

<style scoped>
.distribution-slider {
  margin-top: 2.2em;
}
</style>
