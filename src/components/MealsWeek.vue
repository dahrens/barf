<template>
  <div class="week">
    <div class="columns is-gapless">
      <div v-for="(weekday, index) in dog.plan.week" class="column">
        <weekDay :dog="dog" :weekday="weekday" :day="index"></weekDay>
      </div>
    </div>
  </div>
</template>

<script>
import weekDay from '@/components/MealsWeekDay'
import planAllocationWizard from '@/components/PlanAllocationWizard'

export default {
  name: 'mealsWeek',
  props: {
    dog: {
      required: true
    }
  },
  components: {
    planAllocationWizard,
    weekDay
  }
}
</script>
