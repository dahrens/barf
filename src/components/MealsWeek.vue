<template>
  <div class="week columns is-gapless">
    <div v-for="(weekday, index) in dog.plan.week" class="column">
      <weekDay :dog="dog" :weekday="weekday" :day="index"></weekDay>
    </div>

    <planAllocationWizard :dog="dog" :class="{'is-active': wizard}" v-on:close="wizard = !wizard"></planAllocationWizard>
  </div>
</template>

<script>
import weekDay from '@/components/MealsWeekDay'
import planAllocationWizard from '@/components/PlanAllocationWizard'
import ingredients from '@/components/Ingredients'

export default {
  name: 'week',
  props: {
    dog: {
      required: true
    }
  },
  components: {
    planAllocationWizard,
    weekDay,
    ingredients
  }
}
</script>
