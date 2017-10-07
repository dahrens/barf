<template>
  <div class="week">
    <div class="field has-addons">
      <p class="control is-expanded">
        <a v-on:click="wizard = !wizard" class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="magic" />
          </span>
          <span>wizard</span>
        </a>
      </p>
      <p class="control is-expanded">
        <a class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="print" />
          </span>
          <span>print</span>
        </a>
      </p>
    </div>

    <template v-for="(weekday, index) in dog.plan.week">
      <weekDay :dog="dog" :weekday="weekday" :day="index"></weekDay>
    </template>

    <planAllocationWizard :dog="dog" :class="{'is-active': wizard}" v-on:close="wizard = !wizard"></planAllocationWizard>
  </div>
</template>

<script>
import weekDay from '@/components/PlanWeekDay'
import planAllocationWizard from '@/components/PlanAllocationWizard'

export default {
  name: 'week',
  props: {
    dog: {
      required: true
    }
  },
  components: {
    planAllocationWizard,
    weekDay
  },
  data () {
    return {
      wizard: false
    }
  }
}
</script>
