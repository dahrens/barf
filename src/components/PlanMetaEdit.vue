<template>
  <div>
    <numberInputField
      label="Weight"
      :min="1000" :max="150000" :step="500"
      :value="instance.plan.idealWeight"
      @change="(val) => instance.plan.idealWeight = val"
      :validate="validateWeight"
      helpText="This is the ideal weight based on which we calculate the amount per day"
      validateError="Weight in gram must be a positive integer value."
      iconLeft="tachometer-alt">
    </numberInputField>
  </div>
</template>

<script>
import stringInputField from '@/components/include/EditString'
import numberInputField from '@/components/include/EditNumber'
import Datepicker from 'vue-bulma-datepicker'

export default {
  name: 'planMetaEdit',
  props: ['dog'],
  data () {
    return {
      instance: null
    }
  },
  components: {
    stringInputField,
    numberInputField,
    Datepicker
  },
  created () {
    this.instance = this.dog
  },
  computed: {
    activities () {
      let options = []
      for (let activity in this.$store.state.activities) {
        let value = this.$store.state.activities[activity]
        options.push({
          activity,
          value
        })
      }
      return options
    }
  },
  methods: {
    validate () {
      let results = [
        this.validateName(this.instance.name),
        this.validateWeight(this.instance.weight)
      ]
      return results.every(r => r)
    },
    validateName (name) {
      if (name === '') {
        return false
      }
      let dogs = this.$store.state.dogs
      if (this.instance.hasOwnProperty('id')) {
        dogs = dogs.filter(d => d.id !== this.instance.id)
      }
      if (dogs.some(d => d.name === name)) {
        return false
      }
      return true
    },
    validateWeight () {
      return true
    }
  }
}
</script>
