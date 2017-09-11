<template>
  <span class="tag is-dark" :class="size">
    <span v-if="amount !== 1">{{amount * 100 }}%&nbsp;</span>{{ subcategory }}</span>
  </span>
</template>

<script>
export default {
  props: {
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
  computed: {
    category () {
      return this.$store.getters.subcategories.filter(c => c.subcategory === this.subcategory)[0].category
    }
  }
}
</script>
