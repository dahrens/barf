<template>
  <table class="table is-fullwidth dog-needs">
    <tbody>
      <tr v-for="category in categories">
        <td>
          <span class="icon has-text-danger">
            <i class="fa fa-caret-down"></i>
          </span>
        </td>
        <td>
          <category-tag :category="category.part" :size="''"></category-tag>
        </td>
        <td class="subcategories-progress">
          <progress class="progress is-medium is-success" :value="0.6 * 100" max="100"></progress>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CategoryTag from '@/components/CategoryTag'

export default {
  props: ['dog'],
  components: {
    'category-tag': CategoryTag
  },
  computed: {
    categories () {
      return this.$store.getters.categories
    }
  }
}
</script>

<style scoped>
.dog-needs td:nth-child(1) {
  width: 10%;
}
.dog-needs td:nth-child(2) {
  width: 20%;
}
.dog-needs td:nth-child(3) {
  width: 70%;
}
</style>
