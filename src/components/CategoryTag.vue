<template>
  <span class="tag is-dark" :class="size">
    <span v-if="amount !== 1">{{amount * 100 }}%</span>&nbsp;{{ category }}</span>
  </span>
</template>

<script>
export default {
  props: {
    category: {
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
  }
}
</script>
