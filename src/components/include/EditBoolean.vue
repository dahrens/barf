<template>
  <div class="panel-block">
    <div class="field-label is-normal">
      <label class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <a class="button"
          :class="buttonClass"
          v-on:click="val = !val; $emit('change', val)">
          <span class="icon" :class="{'has-text-success': val, 'has-text-danger': !val}">
            <fa v-if="val" pack="fas" name="check-circle" />
            <fa v-else pack="fas" name="times-circle" />
          </span>
        </a>
        <p class="help" :class="helpTextClass">{{ helpText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editBoolean',
  props: {
    value: {
      required: true
    },
    label: {
      required: false
    },
    buttonClass: {
      required: false,
      default: () => ('')
    },
    helpText: {
      required: false
    },
    helpTextClass: {
      required: false,
      default: () => 'is-info'
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
