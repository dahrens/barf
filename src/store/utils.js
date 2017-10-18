import defaultState from './default-state'
import migrations from './migrations'

export const round = (value, roundSettings) => {
  if (!roundSettings.enabled) return value
  let mod = parseInt(roundSettings.value)
  let diff = value % mod
  if (diff === 0) return value
  else if (diff > (mod / 2)) return value + mod - diff
  else return value - diff
}

export const tryMigrate = (state, version) => {
  let oldState = JSON.parse(JSON.stringify(state))
  try {
    migrations.migrate(version, state)
    state.notifications.push({
      pages: ['settings'],
      message: `Migrated your state from version ${oldState.version} to ${version}`,
      style: 'is-info',
      type: 'general',
      data: {}
    })
    localStorage.setItem('barf', JSON.stringify(state))
  } catch (e) {
    console.error(e)
    state = defaultState
    state.version = version
    state.notifications.push({
      pages: ['settings'],
      message: `Migrating your state from version ${oldState.version} to ${version} failed.`,
      style: 'is-danger',
      type: 'general',
      data: oldState
    })
  }
  return state
}
