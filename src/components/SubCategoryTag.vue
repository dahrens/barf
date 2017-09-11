<template>
  <span class="tag is-dark" :class="size">
    <span v-if="amount !== 1">{{amount * 100 }}%&nbsp;</span>{{ subCategory }}</span>
  </span>
</template>

<script>
export default {
  name: 'subCategoryTag',
  props: {
    subCategory: {
      required: true,
      type: String
    },
    amount: {
      required: false,
      type: Number,
      default: () => (1)
    },
    size: {
      required: false,
      type: String,
      default: () => ('is-small')
    }
  },
  computed: {
    category () {
      return this.$store.getters.subCategories.filter(c => c.subCategory === this.subCategory)[0].category
    }
  }
}
</script>
