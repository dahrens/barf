<template>
  <div class="is-marginless">
    <div class="plan container">
      <div class="columns">
        <div class="column is-4">
          <dogPanel :dog="dog"></dogPanel>
        </div>
        <div class="column is-4">
          <div v-for="(weekday, index) in dog.plan.week" class="weekday">
            <planDay :dog="dog" :weekday="weekday" :index="index"></planDay>
          </div>
        </div>
        <div class="column is-4">
          <planPanel :dog="dog"></planPanel>
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
