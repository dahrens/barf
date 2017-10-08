import { expect } from 'chai'
import mutations from '@/store/mutations'
import defaultState from '@/store/default-state'

describe('SET_VERSION', () => {
  it('writes the version into the state.', () => {
    mutations.SET_VERSION(defaultState, '1.2.3')
    expect(defaultState.version).to.equal('1.2.3')
  })
})

describe('WRITE_SETTINGS', () => {
  it('just overrides the settings with new ones.', () => {
    mutations.WRITE_SETTINGS(defaultState, '1.2.3')
    expect(defaultState.settings).to.equal('1.2.3')
    mutations.WRITE_SETTINGS(defaultState, {foo: '1.2.3'})
    expect(defaultState.settings.foo).to.equal('1.2.3')
  })
})
