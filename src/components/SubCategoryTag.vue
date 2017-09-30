<template>
  <span class="tag is-dark" :class="size">
    <span v-if="amount !== 1">{{amount * 100 }}%&nbsp;</span>
    {{ textBefore }} {{ subCategory }} {{ textAfter }}
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
    },
    textAfter: {
      required: false,
      type: String
    },
    textBefore: {
      required: false,
      type: String
    }
  },
  computed: {
    category () {
      return this.$store.getters.subCategories.filter(c => c.subCategory === this.subCategory)[0].category
    }
  }
}
</script>
