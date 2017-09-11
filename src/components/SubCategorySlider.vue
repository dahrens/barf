<template>
  <vue-slider @callback="changed" v-bind="slider" v-bind:value="currentValue()"></vue-slider>
</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  name: 'subCategorySlider',
  props: ['subCategory', 'category', 'value'],
  components: {
    vueSlider
  },
  data () {
    return {
      slider: {
        min: 0,
        max: 100,
        speed: 0,
        bgStyle: {
          'backgroundColor': 'whitesmoke',
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
  methods: {
    changed (v) {
      this.$emit('changed', [v, this.subCategory], this.category)
    },
    currentValue () {
      return this.value
    }
  }
}
</script>
