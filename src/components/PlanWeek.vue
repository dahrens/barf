<template>
  <div class="plan-week">
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
        <a v-on:click="clearAllocation()" class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="bomb" />
          </span>
          <span>clear</span>
        </a>
      </p>
      <p class="control is-expanded">
        <a v-on:click="editAll()" class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="edit" />
          </span>
          <span>edit all</span>
        </a>
      </p>
      <p class="control is-expanded">
        <a v-on:click="saveAll()" class="button is-fullwidth is-outlined">
          <span class="icon is-small">
            <fa pack="fas" name="save" />
          </span>
          <span>save all</span>
        </a>
      </p>
    </div>

    <template v-for="(weekday, index) in dog.plan.week">
      <weekDay :ref="weekday" :dog="dog" :weekday="weekday" :day="index"></weekDay>
    </template>

    <planAllocationWizard :dog="dog" :class="{'is-active': wizard}" v-on:close="wizard = !wizard"></planAllocationWizard>
  </div>
</template>

<script>
import weekDay from '@/components/PlanWeekDay'
import planAllocationWizard from '@/components/PlanAllocationWizard'
import { UPDATE_PLAN_ALLOCATION } from '@/store/mutation-types'

export default {
  name: 'planWeek',
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
  },
  methods: {
    editAll () {
      for (let referenceName in this.$refs) {
        this.$refs[referenceName][0].edit = true
      }
    },
    saveAll () {
      for (let referenceName in this.$refs) {
        this.$refs[referenceName][0].edit = false
      }
    },
    clearAllocation () {
      this.$store.commit(UPDATE_PLAN_ALLOCATION, {
        dog: this.dog.id,
        allocation: [[], [], [], [], [], [], []]
      })
    }
  }
}
</script>
