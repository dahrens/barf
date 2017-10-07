<template>
  <span class="tag" :class="size" v-bind:style="{
    backgroundColor: subCategoryColor(subCategory),
    color: categoryColor,
    }">
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
  created () {
    console.warn('subCategoryTag is deprecated - just do this inline...')
  },
  computed: {
    category () {
      return this.$store.getters.subCategories.filter(c => c.subCategory === this.subCategory)[0].category
    },
    categoryColor () {
      if (this.category === 'animal') return 'whitesmoke'
    }
  },
  methods: {
    subCategoryColor (subCategory) {
      return this.$store.state.ui.subCategoryColors[subCategory]
    }
  }
}
</script>
