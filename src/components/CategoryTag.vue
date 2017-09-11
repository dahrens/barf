<template>
  <span class="tag is-dark" :class="size">
    <span v-if="amount !== 1">{{amount * 100 }}%&nbsp;</span>{{ subcategory }}</span>
  </span>
</template>

<script>
export default {
  props: {
    category: {
      required: false,
      type: String
    },
    subcategory: {
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
  created () {
    if (!this.category) {
      this.$store.getters.subcategories.filter(c => c.subcategory === this.subcategory).category
    }
  }
}
</script>
