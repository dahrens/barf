<template>
  <div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Ration</label>
      </div>
      <div class="field-body">
        <div>
          <div class="field has-addons has-addons-left">
            <p class="control">
              <a class="button" v-on:click="toggleCalculated()">
                <span class="icon" :class="{'has-text-success': dog.plan.calculated, 'has-text-danger': !dog.plan.calculated}">
                  <fa v-if="dog.plan.calculated" icon="check-circle" />
                  <fa v-else icon="times-circle" />
                </span>
              </a>
            </p>
            <p v-if="!dog.plan.calculated" class="control is-expanded has-icons-left">
              <input type="number"
                class="input"
                :min="100" :max="10000" :step="50"
                v-model="dog.plan.portionPerDay">
              <span class="icon is-left">
                <fa icon="hand-paper" />
              </span>
            </p>
            <p v-else class="control is-expanded has-icons-left">
              <input type="number"
                class="input" disabled
                v-model="calculatedPerDay">
              <span class="icon is-left">
                <fa icon="hand-paper" />
              </span>
            </p>
          </div>
          <p class="help is-info">Should B.A.R.F. calculate the daily portion for you?</p>
        </div>
      </div>
    </div>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Weight</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control has-icons-left">
            <input type="number"
              :min="1" :max="150" :step="0.1"
              class="input"
              v-model="currentWeight"
              @change="dog.plan.currentWeight = currentWeight * 1000">
            <span class="icon is-left">
              <fa icon="tachometer-alt" />
            </span>
          </p>
          <p v-if="!validateWeight()" class="help is-danger">Weight in kilogram must be a positive integer value.</p>
          <p v-if="validateWeight()" class="help is-info">The weight in kilogram your dog has right now.</p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input type="number"
              :min="1" :max="150" :step="0.1"
              class="input"
              v-model="idealWeight"
              @change="dog.plan.idealWeight = idealWeight * 1000">
            <span class="icon is-left">
              <fa icon="tachometer-alt" />
            </span>
          </p>
          <p v-if="!validateWeight()" class="help is-danger">Weight in kilogram must be a positive integer value.</p>
          <p v-if="validateWeight()" class="help is-info">The weight in kilogram your dog should have.</p>
        </div>
      </div>
    </div>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Ratio</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control has-icons-left">
            <input type="number"
              :min="1" :max="10" :step="0.1"
              class="input"
              v-model="dog.plan.percentOfWeight">
            <span class="icon is-left">
              <fa icon="percent"/>
            </span>
          </p>
          <p class="help is-info">The base value for weight calculation. How many percent of dogs weight.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'planMetaEdit',
  props: ['dog'],
  data () {
    return {
      idealWeight: 0,
      currentWeight: 0
    }
  },
  created () {
    this.idealWeight = this.dog.plan.idealWeight / 1000
    this.currentWeight = this.dog.plan.currentWeight / 1000
  },
  computed: {
    calculatedPerDay () {
      return this.$store.getters.dogFoodQuantityPerDay(this.dog)
    }
  },
  methods: {
    toggleCalculated () {
      this.dog.plan.portionPerDay = this.calculatedPerDay
      this.dog.plan.calculated = !this.dog.plan.calculated
    },
    validate () {
      let results = [
        this.validateWeight()
      ]
      return results.every(r => r)
    },
    validateWeight () {
      return true
    }
  }
}
</script>
