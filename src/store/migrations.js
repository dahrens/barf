export default {
  versions: [
    '1.0.0-alpha',
    '1.0.0-alpha.5',
    '1.0.0-alpha.6'
  ],
  migrations: {
    '1.0.0-alpha.5': (state) => {
      state.categories.additives[0] = 'oil'
    },
    '1.0.0-alpha.6': (state) => {
      state.notifications = [
        {
          pages: ['plan'],
          message: 'Notifications arrived in the software',
          style: 'is-info',
          type: 'general',
          data: {}
        }
      ]
    }
  },
  migrate (targetVersion, state) {
    let currentVersion = state.version
    let currentIdx = this.versions.indexOf(currentVersion)
    let targetIdx = this.versions.indexOf(targetVersion)
    if (currentIdx === -1) {
      throw new Error(`Unknown version: ${currentVersion} in state`)
    } else if (targetIdx === -1) {
      throw new Error(`Unknown target version: ${targetVersion}`)
    } else if (currentIdx > targetIdx) {
      throw new Error(`Target version ${targetVersion} lower than current version ${currentVersion}. Migrating backwards is not supported`)
    }
    let steps = this.versions.slice(currentIdx + 1, targetIdx + 1)
    for (let v of steps) {
      this.migrations[v](state)
    }
    state.version = targetVersion
  }
}
