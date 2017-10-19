import defaultState from './default-state'

export const versions = [
  '1.0.0-alpha',
  '1.0.0-alpha.5',
  '1.0.0-alpha.6',
  '1.0.0-alpha.7'
]

export const migrations = {
  '1.0.0-alpha.5': (state) => {
    state.categories.additives[0] = 'oil'
  },
  '1.0.0-alpha.6': (state) => {
    state.notifications = []
    state.settings.notifications = {
      severities: ['is-success', 'is-info', 'is-warning', 'is-danger'],
      severity: 0,
      autoDelete: false
    }
  },
  '1.0.0-alpha.7': (state) => {
    delete state.newDog
    state.notifications = []
    state.settings.notifications = {
      severities: ['is-success', 'is-info', 'is-warning', 'is-danger'],
      severity: 0,
      autoDelete: ['is-success', 'is-info'],
      deletionDelay: 2000
    }
  }
}

export const migrate = (targetVersion, state) => {
  let currentVersion = state.version
  let currentIdx = versions.indexOf(currentVersion)
  let targetIdx = versions.indexOf(targetVersion)
  if (currentIdx === -1) {
    throw new Error(`Unknown version: ${currentVersion} in state`)
  } else if (targetIdx === -1) {
    throw new Error(`Unknown target version: ${targetVersion}`)
  } else if (currentIdx > targetIdx) {
    throw new Error(`Target version ${targetVersion} lower than current version ${currentVersion}. Migrating backwards is not supported`)
  }
  let steps = versions.slice(currentIdx + 1, targetIdx + 1)
  for (let v of steps) {
    migrations[v](state)
  }
  state.version = targetVersion
}

export const safeMigrate = (state, version) => {
  let oldState = JSON.parse(JSON.stringify(state))
  try {
    migrate(version, state)
    state.notifications.push({
      pages: [],
      message: `Migrated your state from version ${oldState.version} to ${version}`,
      style: 'is-info',
      data: null
    })
    localStorage.setItem('barf', JSON.stringify(state))
  } catch (e) {
    state = defaultState
    state.version = version
    state.notifications.push({
      pages: [],
      message: `Migrating your state from version ${oldState.version} to ${version} failed: ${e}`,
      style: 'is-danger',
      data: oldState
    })
  }
  return state
}

export default {
  versions,
  migrations,
  migrate,
  safeMigrate
}
