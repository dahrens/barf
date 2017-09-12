<template>
  <nav class="level">
    <div v-for="category in subCategories" class="level-item has-text-centered">
      <div>
        <p class="heading">{{category.subCategory}}</p>
        <p class="title">0</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PlanStats',
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
    }
  }
}
</script>
