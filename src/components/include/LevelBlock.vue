<template>
  <div class="faked-panel-block">
    <nav class="level">
      <div v-if="data" v-for="item in data" class="level-item has-text-centered has-text-dark">
        <div>
          <p v-if="item.label && !item.iconLabel" class="heading">{{ item.label }}</p>
          <p v-else>
            <span class="icon">
              <fa size="2x" pack="fas" :name="item.label" />
            </span>
          </p>
          <p v-if="item.value && !item.iconValue" class="subtitle has-text-dark">{{ item.value }}</p>
          <p v-else>
            <span class="icon">
              <fa size="2x" pack="fas" :name="item.value" />
            </span>
          </p>
        </div>
      </div>
    </nav>
    <p class="help is-info has-text-centered">{{ helpText }}</p>
  </div>
</template>

<script>
export default {
  name: 'levelBlock',
  props: {
    data: {
      required: false
    },
    helpText: {
      required: false
    },
    helpTextClass: {
      required: false,
      default: () => 'is-info'
    }
  }
}
</script>

<style lang="sass" scoped>
.level
  margin: 0.5em
</style>
