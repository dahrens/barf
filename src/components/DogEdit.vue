<template>
  <div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Name</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control has-icons-left">
            <input type="text"
              class="input"
              :class="{'is-danger': !validateName(), 'is-success': validateName()}"
              v-model="dog.name"
              placeholder="Dogs Name">
            <span class="icon is-left">
              <fa pack="fas" name="address-card" />
            </span>
          </p>
          <p v-if="!validateName()" class="help is-danger">Dogs name must be not empty and unique</p>
        </div>
      </div>
    </div>

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
        <label class="label">Castrated</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <a class="button" v-on:click="dog.castrated = !dog.castrated">
              <span class="icon" :class="{'has-text-success': dog.castrated, 'has-text-danger': !dog.castrated}">
                <fa v-if="dog.castrated" pack="fas" name="check-circle" />
                <fa v-else pack="fas" name="times-circle" />
              </span>
            </a>
          </p>
          <p class="help is-info">Is you dog castrated? Click me to switch</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'

export default {
  name: 'dogEdit',
  props: ['dog'],
  components: {
    Datepicker
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
        this.validateName()
      ]
      return results.every(r => r)
    },
    validateName () {
      let name = this.dog.name
      if (name === '') {
        return false
      }
      let dogs = this.$store.state.dogs
      if (this.dog.hasOwnProperty('id')) {
        dogs = dogs.filter(d => d.id !== this.dog.id)
      }
      if (dogs.some(d => d.name === name)) {
        return false
      }
      return true
    }
  }
}
</script>
