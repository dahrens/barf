<template>
  <vue-slider @callback="changed" v-bind="sliderConfig" v-bind:value="currentValue()"></vue-slider>
</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  name: 'subCategorySlider',
  props: ['subCategory', 'value', 'sliderConfig'],
  components: {
    vueSlider
  },
  methods: {
    changed (value) {
      this.$emit('changed', {
        value,
        subCategory: this.subCategory
      })
    },
    currentValue () {
      return this.value
    }
  }
}
</script>
