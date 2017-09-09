<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4">
        <template v-for="event in events">
          <event-message :event="event"></event-message>
        </template>
      </div>
      <div class="column is-8">
        <template v-for="dog in dogs">
          <dog-panel :dog="dog"></dog-panel>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import DogPanel from '@/components/DogPanel'
import EventMessage from '@/components/EventMessage'

export default {
  name: 'home',
  components: {
    'dog-panel': DogPanel,
    'event-message': EventMessage
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
