<template>
  <div class="is-marginless">
    <div class="container">
      <div class="columns is-mobile is-multiline">
        <div class="column is-12-mobile is-half-tablet is-half-desktop is-one-third-widescreen">
          <dogPanel :dog="dog"></dogPanel>
        </div>
        <div class="column is-12-mobile is-half-tablet is-half-desktop is-one-third-widescreen">
          <planPanel :dog="dog"></planPanel>
        </div>
        <div class="column is-12-mobile is-12-tablet is-half-desktop is-one-third-widescreen">

          <div v-for="(weekday, index) in dog.plan.week" class="weekday">
            <planDay :dog="dog" :weekday="weekday" :index="index"></planDay>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import planDay from '@/components/PlanDay'
import dogPanel from '@/components/DogPanel'
import planPanel from '@/components/PlanPanel'

export default {
  name: 'plan',
  components: {
    planDay,
    dogPanel,
    planPanel
  },
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
    },
    dog () {
      return this.$store.state.dogs[0]
    }
  }
}
</script>

<style lang="sass">
.weekday
  margin-bottom: 0.75em
</style>
