import { expect } from 'chai'
import getters from '@/store/getters'
import defaultState from '@/store/default-state'
import newDog from '../fixtures/newDog'

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const splitNumberIntoParts = (number, partCount) => {
  if (partCount < 1) throw new Error('can not split in negative amount of subParts')
  if (partCount === 1) return [number]
  let rest = number
  let parts = []
  while (true) {
    let d = randomNumber(1, rest - partCount)
    parts.push(d)
    rest -= d
    partCount--
    if (partCount === 1) break
  }
  parts.push(rest)
  return parts
}

describe('getters.planDistribution(dog)', () => {
  let dog = JSON.parse(JSON.stringify(newDog))
  dog.plan.animal = 80
  dog.plan.vegetables = 20
  dog.plan.distribution = {
    animal: {
      meat: 40,  // 1008
      stomach: 30,  // 756
      entrails: 20,  // 504
      bones: 10  // 252
    },
    vegetables: {
      fruits: 20,  // 126
      grains: 40, // 252
      vegetables: 40 // 252
    }
  }
  it('does not round, when turned off', () => {
    const state = JSON.parse(JSON.stringify(defaultState))
    state.settings.rounding.enabled = false
    // stub depending getters.
    getters.dogFoodQuantityPerDay = (d) => 450
    getters.emptyDistribution = {
      animal: { meat: 0, stomach: 0, entrails: 0, bones: 0 },
      vegetables: { fruits: 0, grains: 0, vegetables: 0 }
    }
    let dist = getters.planDistribution(state, getters)(dog)
    expect(dist.animal.meat).to.equal(1008)
    expect(dist.animal.stomach).to.equal(756)
    expect(dist.animal.entrails).to.equal(504)
    expect(dist.animal.bones).to.equal(252)
    expect(dist.vegetables.fruits).to.equal(126)
    expect(dist.vegetables.grains).to.equal(252)
    expect(dist.vegetables.vegetables).to.equal(252)
  })
  it('works with default settings', () => {
    const state = JSON.parse(JSON.stringify(defaultState))
    // stub depending getters.
    getters.dogFoodQuantityPerDay = (d) => 450
    getters.emptyDistribution = {
      animal: { meat: 0, stomach: 0, entrails: 0, bones: 0 },
      vegetables: { fruits: 0, grains: 0, vegetables: 0 }
    }
    let dist = getters.planDistribution(state, getters)(dog)
    expect(dist.animal.meat).to.equal(1000)
    expect(dist.animal.stomach).to.equal(750)
    expect(dist.animal.entrails).to.equal(500)
    expect(dist.animal.bones).to.equal(250)
    expect(dist.vegetables.fruits).to.equal(125)
    expect(dist.vegetables.grains).to.equal(250)
    expect(dist.vegetables.vegetables).to.equal(250)
  })
  it('works with 100 randomly generated distributions and amountsPerDay', () => {
    getters.emptyDistribution = {
      animal: { meat: 0, stomach: 0, entrails: 0, bones: 0 },
      vegetables: { fruits: 0, grains: 0, vegetables: 0 }
    }
    for (let run = 0; run <= 100; run++) {
      let amountPerDay = randomNumber(200, 2500)
      getters.dogFoodQuantityPerDay = (d) => amountPerDay
      let dog = JSON.parse(JSON.stringify(newDog))
      dog.plan.animal = randomNumber(10, 90)
      dog.plan.vegetables = 100 - dog.plan.animal
      let a = splitNumberIntoParts(100, 4)
      let v = splitNumberIntoParts(100, 3)
      dog.plan.distribution = {
        animal: { meat: a[0], stomach: a[1], entrails: a[2], bones: a[3] },
        vegetables: { fruits: v[0], grains: v[1], vegetables: v[2] }
      }
      const state = JSON.parse(JSON.stringify(defaultState))
      let roundedDist = getters.planDistribution(state, getters)(dog)
      state.settings.rounding.enabled = false
      let dist = getters.planDistribution(state, getters)(dog)
      let maxVariance = Math.floor(state.settings.rounding.value / 2)
      expect(
        Math.abs(dist.animal.meat - roundedDist.animal.meat)
      ).to.be.within(0, maxVariance)
      expect(
        Math.abs(dist.animal.stomach - roundedDist.animal.stomach)
      ).to.be.within(0, maxVariance)
      expect(
        Math.abs(dist.animal.entrails - roundedDist.animal.entrails)
      ).to.be.within(0, maxVariance)
      expect(
        Math.abs(dist.animal.bones - roundedDist.animal.bones)
      ).to.be.within(0, maxVariance)
      expect(
        Math.abs(dist.vegetables.fruits - roundedDist.vegetables.fruits)
      ).to.be.within(0, maxVariance)
      expect(
        Math.abs(dist.vegetables.grains - roundedDist.vegetables.grains)
      ).to.be.within(0, maxVariance)
      expect(
        Math.abs(dist.vegetables.vegetables - roundedDist.vegetables.vegetables)
      ).to.be.within(0, maxVariance)
    }
  })
})
