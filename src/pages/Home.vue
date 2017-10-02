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
          <dogCard :dog="dog"></dogCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import dogCard from '@/components/DogCard'
import eventMessage from '@/components/EventMessage'

export default {
  name: 'home',
  components: {
    dogCard,
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
