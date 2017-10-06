<template>
  <div class="panel-block">
    <div class="field-label is-normal">
      <label class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control" :class="{'has-icons-left': iconLeft}">
          <input type="text"
            class="input"
            :class="{'is-danger': !validate(val), 'is-success': validate(val)}"
            v-model="val"
            v-on:keyup="$emit('change', val)"
            :placeholder="placeholder">
          <span v-if="iconLeft" class="icon is-left">
            <fa :pack="iconLeftPack" :name="iconLeft" />
          </span>
        </p>
        <p v-if="!validate(val)" class="help is-danger">{{ validateError }}</p>
        <p v-if="validate(val)" class="help" :class="helpTextClass">{{ helpText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editString',
  props: {
    value: {
      required: true
    },
    label: {
      required: false
    },
    placeholder: {
      required: false
    },
    helpText: {
      required: false
    },
    helpTextClass: {
      required: false,
      default: () => 'is-info'
    },
    validate: {
      required: false,
      default: () => (value) => (true)
    },
    validateError: {
      required: false
    },
    iconLeft: {
      required: false,
      default: () => (false)
    },
    iconLeftPack: {
      required: false,
      default: () => ('fas')
    }
  },
  data () {
    return {
      val: null
    }
  },
  created () {
    this.val = this.value
  }
}
</script>

<styles lang="sass">

</styles>
