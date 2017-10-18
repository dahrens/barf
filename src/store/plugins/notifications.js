import * as types from '../mutation-types'

const baseNotification = {
  pages: [],
  message: '',
  style: 'is-info',
  data: {}
}

const notifications = {
  [types.INSERT_DOG] (dog) {
    let n = JSON.parse(JSON.stringify(baseNotification))
    n.style = 'is-success'
    n.pages.push('plan')
    n.pages.push('meals')
    n.message = `You successfully created the dog ${dog.name}`
    return n
  },
  [types.REMOVE_DOG] (dogId) {
    let n = JSON.parse(JSON.stringify(baseNotification))
    n.style = 'is-warning'
    n.pages.push('plan')
    n.pages.push('meals')
    n.message = `You removed a dog all data is lost`
    return n
  }
}

export default (store) => {
  store.subscribe((mutation, state) => {
    let settings = state.settings.notifications
    if (notifications[mutation.type]) {
      let notification = notifications[mutation.type](mutation.payload)
      let severity = settings.severities.indexOf(notification.style)
      if (notification && severity >= settings.severity) {
        state.notifications.push(notification)
      }
    }
  })
}
