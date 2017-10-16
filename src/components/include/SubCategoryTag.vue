<template>
  <div class="tags has-addons">
    <slot name="prefix"></slot>
    <span class="tag is-dark is-medium">{{ amount }}{{ unit }}</span>
    <span class="tag is-light is-medium" v-bind:style="{
      backgroundColor: subCategoryColor(subCategory)
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
    }
  }
}
</script>
