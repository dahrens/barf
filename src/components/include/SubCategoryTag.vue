<template>
  <div class="tags has-addons">
    <slot name="prefix"></slot>
    <span class="tag is-dark is-medium">{{ amount }}{{ unit }}</span>
    <span class="tag is-light is-medium" v-bind:style="{
      backgroundColor: subCategoryColor(subCategory),
      color: pickColor(subCategory)
    }">{{ subCategory }}</span>
    <slot name="suffix"></slot>
  </div>
</template>

<script>
export default {
  name: 'subCategoryTag',
  props: {
    subCategory: {
      required: true
    },
    amount: {
      required: true
    },
    unit: {
      required: false,
      default: () => ('g')
    }
  },
  methods: {
    subCategoryColor (subCategory) {
      return this.$store.getters.subCategoryColor(subCategory)
    },
    pickColor (subCategory) {
      let hex = this.subCategoryColor(subCategory)
      let red = parseInt(hex.slice(1, 3), 16)
      let green = parseInt(hex.slice(3, 5), 16)
      let blue = parseInt(hex.slice(5, 7), 16)
      let L = (red * 0.299 + green * 0.587 + blue * 0.114)
      if (L > 186) {
        return '#000000'
      } else {
        return '#ffffff'
      }
    }
  }
}
</script>
