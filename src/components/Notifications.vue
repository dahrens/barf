<template>
  <div class="is-marginless">
    <template v-for="notification in notifications">
      <div class="notification" :class="notification.style">
        <button v-on:click="deleteNotification(notification)" class="delete"></button>
        {{  notification.message }}
      </div>
    </template>
  </div>
</template>

<script>
import { REMOVE_NOTIFICATION } from '@/store/mutation-types'

export default {
  name: 'notifications',
  props: {
    page: {
      required: false,
      default: () => (false)
    }
  },
  computed: {
    notifications () {
      return this.$store.getters.notifications(this.page)
    }
  },
  methods: {
    deleteNotification (notification) {
      this.$store.commit(REMOVE_NOTIFICATION, notification)
    }
  }
}
</script>

<style lang="sass">
.notification
  margin-bottom: 0 !important
</style>
