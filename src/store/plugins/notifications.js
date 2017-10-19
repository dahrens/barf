import * as types from '../mutation-types'

export const baseNotification = {
  message: '',
  style: 'is-success',
  data: {}
}

const notifications = {
  [types.WRITE_SETTINGS] (dog) {
    let n = JSON.parse(JSON.stringify(baseNotification))
    n.message = `The settings got saved.`
    return n
  },
  [types.INSERT_DOG] (dog) {
    let n = JSON.parse(JSON.stringify(baseNotification))
    n.message = `You successfully created the dog ${dog.name}`
    return n
  },
  [types.REMOVE_DOG] (dogId) {
    let n = JSON.parse(JSON.stringify(baseNotification))
    n.style = 'is-warning'
    n.message = `You removed a dog all data is lost`
    return n
  },
  [types.UPDATE_DOG] (dog) {
    let n = JSON.parse(JSON.stringify(baseNotification))
    n.message = `You successfully updated the dog ${dog.name}`
    return n
  },
  [types.INSERT_INGREDIENT] (ingredient) {
    let n = JSON.parse(JSON.stringify(baseNotification))
    n.message = `You successfully created the ingredient ${ingredient.name}`
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
        if (settings.autoDelete.indexOf(notification.style) !== -1) {
          setTimeout(() => {
            store.commit(types.REMOVE_NOTIFICATION, notification)
          }, settings.deletionDelay)
        }
      }
    }
  })
}
