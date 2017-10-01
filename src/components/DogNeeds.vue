<template>
  <table class="table is-fullwidth dog-needs">
    <tbody>
      <tr v-for="category in subCategories">
        <td>
          <span class="icon has-text-danger">
            <fa pack="fas" name="caret-down" />
          </span>
        </td>
        <td>
          <subCategoryTag :subCategory="category.subCategory" :size="''"></subCategoryTag>
        </td>
        <td>
          <progress class="progress is-medium is-success" :value="0.6 * 100" max="100"></progress>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import subCategoryTag from '@/components/SubCategoryTag'

export default {
  name: 'dogNeeds',
  props: ['dog'],
  components: {
    subCategoryTag
  },
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
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
