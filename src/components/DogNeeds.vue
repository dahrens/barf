<template>
  <table class="table is-fullwidth dog-needs">
    <tbody>
      <tr v-for="category in subcategories">
        <td>
          <span class="icon has-text-danger">
            <i class="fa fa-caret-down"></i>
          </span>
        </td>
        <td>
          <category-tag :subcategory="category.subcategory" :size="''"></category-tag>
        </td>
        <td>
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
    subcategories () {
      return this.$store.getters.subcategories
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
