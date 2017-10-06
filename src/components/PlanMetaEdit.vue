<template>
  <div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Weight</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control has-icons-left">
            <input type="number"
              :min="1000" :max="150000" :step="500"
              class="input"
              :class="{'is-danger': !validateWeight(), 'is-success': validateWeight()}"
              v-model="dog.currentWeight">
            <span class="icon is-left">
              <fa pack="fas" name="tachometer-alt" />
            </span>
          </p>
          <p v-if="!validateWeight()" class="help is-danger">Weight in gram must be a positive integer value.</p>
          <p v-if="validateWeight()" class="help is-info">The weight in gram your dog has right now.</p>
        </div>
      </div>
    </div>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Calculated</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <a class="button"
            v-on:click="dog.plan.calculated = !dog.plan.calculated">
            <span class="icon" :class="{'has-text-success': dog.plan.calculated, 'has-text-danger': !dog.plan.calculated}">
              <fa v-if="dog.plan.calculated" pack="fas" name="check-circle" />
              <fa v-else pack="fas" name="times-circle" />
            </span>
          </a>
          <p class="help is-info">Should B.A.R.F. calculate the daily portion for you?</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'planMetaEdit',
  props: ['dog'],
  methods: {
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
