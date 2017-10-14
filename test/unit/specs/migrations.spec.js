import { expect } from 'chai'
import migrations from '@/store/migrations'
import state1Dot0Dot0alpha from '../fixtures/default-state-v1_0_0-alpha'
import state1Dot0Dot0alpha5 from '../fixtures/default-state-v1_0_0-alpha_5'
import { version } from '../../../package.json'

describe('migrations', () => {
  it('the current version is known by migrations', () => {
    expect(migrations.versions.indexOf(version)).to.not.be.equal(-1)
    expect(migrations.migrations[version]).to.be.an('function')
  })
  it('fails if the software version is unknown', () => {
    expect(() => {
      migrations.migrate('unknown version', {version: '1.0.0-alpha.5'})
    }).to.throw()
  })
  it('fails if the states version number is unknown', () => {
    expect(() => {
      migrations.migrate('1.0.0-alpha.5', {version: 'broken'})
    }).to.throw()
  })
  it('can migrate one version', () => {
    migrations.migrate('1.0.0-alpha.5', state1Dot0Dot0alpha)
    expect(
      state1Dot0Dot0alpha.categories.additives[0]
    ).to.be.equal('oil')
    expect(state1Dot0Dot0alpha).to.deep.equal(state1Dot0Dot0alpha5)
  })
})
