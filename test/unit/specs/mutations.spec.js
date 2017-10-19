import { expect } from 'chai'
import * as types from '@/store/mutation-types'
import mutations from '@/store/mutations'
import defaultState from '@/store/default-state'
import newDog from '../fixtures/newDog'

describe(types.SET_VERSION, () => {
  const state = JSON.parse(JSON.stringify(defaultState))
  it('writes the version into the state.', () => {
    mutations.SET_VERSION(state, '1.2.3')
    expect(state.version).to.equal('1.2.3')
  })
})

describe(types.WRITE_SETTINGS, () => {
  const state = JSON.parse(JSON.stringify(defaultState))
  it('just overrides the settings with new ones.', () => {
    mutations.WRITE_SETTINGS(state, '1.2.3')
    expect(state.settings).to.equal('1.2.3')
    mutations.WRITE_SETTINGS(state, {foo: '1.2.3'})
    expect(state.settings.foo).to.equal('1.2.3')
  })
})

describe(types.INSERT_DOG, () => {
  const state = JSON.parse(JSON.stringify(defaultState))
  const dog1 = JSON.parse(JSON.stringify(newDog))
  dog1.name = 'Dog 1'
  const dog2 = JSON.parse(JSON.stringify(newDog))
  dog2.name = 'Dog 2'
  it('inserts a new dog properly and provides IDs', () => {
    mutations.INSERT_DOG(state, dog1)
    expect(state.dogs.length).to.equal(1)
    expect(state.dogs[0].name).to.equal('Dog 1')
    expect(state.dogs[0].id).to.equal(1)
    mutations.INSERT_DOG(state, dog2)
    expect(state.dogs.length).to.equal(2)
    expect(state.dogs[1].name).to.equal('Dog 2')
    expect(state.dogs[1].id).to.equal(2)
  })
})

describe(types.UPDATE_DOG, () => {
  const state = JSON.parse(JSON.stringify(defaultState))
  let dog = JSON.parse(JSON.stringify(newDog))
  dog.name = 'Foobar'
  state.dogs.push(dog)
  it('updates name properly', () => {
    expect(state.dogs[0].name).to.equal('Foobar')
    dog.name = 'Updated'
    mutations.UPDATE_DOG(state, dog)
    expect(state.dogs[0].name).to.equal('Updated')
  })
  it('throws an error, when dog is unknown', () => {
    expect(
      mutations.UPDATE_DOG.bind(mutations, state, { id: 10 })
    ).to.throw('Unknown Dog for update')
  })
})

describe(types.REMOVE_DOG, () => {
  const state = JSON.parse(JSON.stringify(defaultState))
  let dog = JSON.parse(JSON.stringify(newDog))
  dog.id = 1
  dog.name = 'Foobar'
  state.dogs.push(dog)
  let dog2 = JSON.parse(JSON.stringify(newDog))
  dog2.id = 2
  dog2.name = 'Foobar2'
  state.dogs.push(dog2)
  it('properly removes the dog by ID', () => {
    mutations.REMOVE_DOG(state, 1)
    expect(state.dogs.length).to.equal(1)
  })
  it('throws an error, when dog is unknown', () => {
    expect(
      mutations.REMOVE_DOG.bind(mutations, state, 10)
    ).to.throw('Remove dog: Unknown DogId ' + 10)
  })
})

describe(types.SELECT_DOG, () => {
  const state = JSON.parse(JSON.stringify(defaultState))
  let dog = JSON.parse(JSON.stringify(newDog))
  dog.id = 1
  dog.name = 'Foobar'
  state.dogs.push(dog)
  it('only accepts valid dog IDs', () => {
    mutations.SELECT_DOG(state, 1)
    expect(state.selectedDogId).to.equal(1)
    expect(
      mutations.SELECT_DOG.bind(mutations, state, 10)
    ).to.throw('Unknown DogId ' + 10)
  })
})

describe(types.INSERT_INGREDIENT, () => {
  const state = JSON.parse(JSON.stringify(defaultState))
  let nextId = state.ids.ingredients
  let initialCount = state.ingredients.length
  let ingredient = {
    name: 'foobar',
    subCategories: [[1, 'fruits']],
    unit: 'g',
    defaultAmount: 500
  }
  it('writes id into state', () => {
    mutations.INSERT_INGREDIENT(state, ingredient)
    expect(state.ingredients.length).to.equal(initialCount + 1)
    expect(ingredient.id).to.equal(nextId)
  })
})
