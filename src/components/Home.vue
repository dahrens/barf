<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4">
        <template v-for="event in events">
          <eventMessage :event="event"></eventMessage>
        </template>
      </div>
      <div class="column is-8">
        <template v-for="dog in dogs">
          <dogPanel :dog="dog"></dogPanel>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import dogPanel from '@/components/DogPanel'
import eventMessage from '@/components/EventMessage'

export default {
  name: 'home',
  components: {
    dogPanel,
    eventMessage
  },
  computed: {
    dogs () {
      return this.$store.state.dogs
    },
    events () {
      return this.$store.state.events
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
