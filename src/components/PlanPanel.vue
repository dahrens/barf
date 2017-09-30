<template>
  <nav class="panel">
    <p class="panel-heading">
      Plan
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="chevron-down" />
        <fa v-if="collapsed" pack="fas" name="chevron-right" />
      </a>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" pack="fas" name="edit" />
        <fa v-if="edit" pack="fas" name="save" />
      </a>
    </p>
    <p v-if="!collapsed" class="faked-panel-block">
      <template v-if="!collapsed && edit">
        <div class="columns distribution-slider">
          <div class="column is-3">
            <span class="is-pulled-right">tierisch</span>
          </div>
          <div class="column is-6">
            <vue-slider @callback="setPlanCategoryDistribution" v-bind="getPlanCategoryDistribution" v-model="getPlanCategoryDistribution.value"></vue-slider>
          </div>
          <div class="column is-3">
            <span class="is-pulled-left">pflanzlich</span>
          </div>
        </div>
        <categorySliders :dog="dog" :category="'animal'" :sliderConfig="sliderConfig"></categorySliders>
        <categorySliders :dog="dog" :category="'vegetables'" :sliderConfig="sliderConfig"></categorySliders>
      </template>
      <template v-if="!collapsed && !edit">
        need to show plan here - maybe using level?
      </template>
    </p>
  </nav>
</template>

<script>
import vueSlider from 'vue-slider-component'
import subCategorySlider from '@/components/SubCategorySlider'
import categorySliders from '@/components/CategorySliders'
import { UPDATE_PLAN_CATEGORY_DISTRIBUTION } from '@/store/mutation-types'

export default {
  name: 'planPanel',
  props: ['dog'],
  components: {
    vueSlider,
    subCategorySlider,
    categorySliders
  },
  data () {
    return {
      edit: false,
      collapsed: false,
      selectedPlan: 1,
      sliderConfig: {
        value: 0,
        min: 0,
        max: 100,
        speed: 0.5,
        formatter: '{value}%',
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
    plan () {
      return this.dog.plan
    },
    getPlanCategoryDistribution () {
      let slider = JSON.parse(JSON.stringify(this.sliderConfig))
      slider.value = this.plan.animal
      return slider
    }
  },
  methods: {
    setPlanCategoryDistribution (value) {
      this.$store.commit(UPDATE_PLAN_CATEGORY_DISTRIBUTION, {dog: this.dog.id, value: value})
    }
  }
}
</script>

<style scoped>
.distribution-slider {
  margin-top: 2.2em;
}

.faked-panel-block {
  padding: 1em ;
  border-bottom: 1px fas #dbdbdb;
  border-left: 1px fas #dbdbdb;
  border-right: 1px fas #dbdbdb;
}
</style>
