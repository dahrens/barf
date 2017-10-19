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
  computed: {
    notifications () {
      return this.$store.getters.notifications
    }
  },
  methods: {
    deleteNotification (notification) {
      this.$store.commit(REMOVE_NOTIFICATION, notification)
    },
    classes (notification) {
      let classes = []
      classes.push(notification.style)
      if (this.page) classes.push('page-notification')
      return classes.join(' ')
    }
  }
}
</script>
