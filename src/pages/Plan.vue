<template>
  <div class="is-marginless">
    <div class="plan container">
      <div class="columns">
        <div class="column is-4">
          <dogPanel :dog="dog"></dogPanel>
        </div>
        <div class="column is-8">
          <planPanel :dog="dog"></planPanel>
          <div class="columns is-gapless is-multiline">
            <div v-for="(weekday, index) in plan.week" class="column is-4 weekday">
              <planDay :plan="plan" :weekday="weekday" :index="index"></planDay>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import planPanel from '@/components/PlanPanel'
import planDay from '@/components/PlanDay'
import dogPanel from '@/components/DogPanel'

export default {
  name: 'plan',
  components: {
    planPanel,
    planDay,
    dogPanel
  },
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
    },
    dogs () {
      return this.$store.state.dogs
    },
    dog () {
      return this.$store.state.dogs[0]
    },
    plan () {
      return this.dog.plan
    }
  }
}
</script>
