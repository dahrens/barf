<template>
  <div>
    <stringInputField
      label="Name"
      :value="instance.name"
      @change="(val) => instance.name = val"
      :validate="validateName"
      validateError="Name must be not empty and unique"
      iconLeft="address-card">
    </stringInputField>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Birthday</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <datepicker placeholder="31.05.2009" :config="{ dateFormat: 'd.m.Y', static: true }"></datepicker>
          </p>
        </div>
      </div>
    </div>

    <numberInputField
      label="Weight"
      :min="1000" :max="150000" :step="500"
      :value="instance.currentWeight"
      @change="(val) => instance.currentWeight = val"
      :validate="validateWeight"
      helpText="The weight your dog currently has in gram"
      validateError="Weight in gram must be a positive integer value."
      iconLeft="tachometer-alt">
    </numberInputField>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Activity</label>
      </div>
      <div class="field-body">
        <div class="field is-expanded has-addons">
          <div class="control">
            <a class="button is-static">
              <span class="icon is-left">
                <fa pack="fas" name="futbol" />
              </span>
            </a>
          </div>
          <div class="select is-fullwidth">
            <select v-model="dog.activity">
              <option v-for="option in activities" v-model="dog.activity">{{ option.activity }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field-label">
        <label class="label">Sex</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="radio">
              <input type="radio" name="sex" v-model="dog.sex" value="m">
              <span class="icon">
                <fa pack="fas" name="mars" />
              </span>
            </label>
            <label class="radio">
              <input type="radio" name="sex" v-model="dog.sex" value="f">
              <span class="icon">
                <fa pack="fas" name="venus" />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">
          Castrated
        </label>
      </div>
      <div class="field-body">
        <div class="field">
          <input type="checkbox" v-model="dog.castrated">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stringInputField from '@/components/include/EditString'
import numberInputField from '@/components/include/EditNumber'
import Datepicker from 'vue-bulma-datepicker'

export default {
  name: 'dogEdit',
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
