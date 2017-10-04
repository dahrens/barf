import { UPDATE_PLAN_ALLOCATION } from './mutation-types'

function calcPortion (occurency, total, dayAverage) {
  return Math.min(
    parseInt(
      total / occurency
    ),
    parseInt(dayAverage)
  )
}

function randomDays (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
  allocate ({ getters, commit }, payload) {
    let totalDays = payload.dog.plan.week.length
    let average = getters.dogFoodQuantityPerDay(payload.dog)
    let dist = getters.planDistribution(payload.dog)
    let vegDayCount = payload.vegetarianDays.length
    let meatCount = Math.ceil((totalDays - vegDayCount) / 2)
    let meatPortion = calcPortion(meatCount, dist['animal']['meat'], average)
    let stomachCount = totalDays - vegDayCount - meatCount
    let stomachPortion = calcPortion(stomachCount, dist['animal']['stomach'], average)
    let entrailsCount = randomDays(stomachCount + meatCount, meatCount)
    let entrailsPortion = calcPortion(entrailsCount, dist['animal']['entrails'], average)
    let bonesCount = randomDays(stomachCount + meatCount, meatCount)
    let bonesPortion = calcPortion(bonesCount, dist['animal']['bones'], average)
    let fruitsCount = randomDays(stomachCount + meatCount, stomachCount)
    let fruitsPortion = calcPortion(fruitsCount, dist['vegetables']['fruits'], average)
    let vegetablesCount = randomDays(stomachCount + meatCount, meatCount)
    let vegetablesPortion = calcPortion(vegetablesCount, dist['vegetables']['vegetables'], average)
    let grainsCount = randomDays(stomachCount + meatCount, meatCount)
    let grainsPortion = calcPortion(grainsCount, dist['vegetables']['grains'], average)
    let todo = []
    let allocation = []
    for (let day in payload.dog.plan.week) {
      todo.push(parseInt(day))
      allocation.push([])
    }
    if (payload.fastenDays.length) {
      for (let day of payload.fastenDays) {
        let idx = todo.indexOf(day)
        if (idx) {
          todo.splice(idx, 1)
        }
      }
    }
    if (vegDayCount) {
      let vegPortion = calcPortion(
        vegDayCount, dist['vegetables']['vegetables'], average / 2
      )
      let grainsPortion = calcPortion(
        vegDayCount, dist['vegetables']['grains'], average / 2
      )
      for (let day of payload.vegetarianDays) {
        allocation[day].push({ subCategory: 'vegetables', amount: vegPortion })
        allocation[day].push({ subCategory: 'grains', amount: grainsPortion })
        let idx = todo.indexOf(day)
        if (idx) {
          todo.splice(idx, 1)
        }
      }
    }
    for (let idx in todo) {
      let daysLeft = todo.length - idx
      let day = todo[idx]
      if (idx % 2) {
        allocation[day].push({ subCategory: 'stomach', amount: stomachPortion })
      } else {
        allocation[day].push({ subCategory: 'meat', amount: meatPortion })
      }
      if ((entrailsCount < daysLeft && randomDays(0, 1)) || entrailsCount === daysLeft) {
        allocation[day].push({ subCategory: 'entrails', amount: entrailsPortion })
        entrailsCount--
      }
      if ((bonesCount < daysLeft && randomDays(0, 1)) || bonesCount === daysLeft) {
        allocation[day].push({ subCategory: 'bones', amount: bonesPortion })
        bonesCount--
      }
      if ((fruitsCount < daysLeft && randomDays(0, 1)) || fruitsCount === daysLeft) {
        allocation[day].push({ subCategory: 'fruits', amount: fruitsPortion })
        fruitsCount--
      }
      if (!vegDayCount) {
        if ((vegetablesCount < daysLeft && randomDays(0, 1)) || vegetablesCount === daysLeft) {
          allocation[day].push({ subCategory: 'vegetables', amount: vegetablesPortion })
          vegetablesCount--
        }
        if ((grainsCount < daysLeft && randomDays(0, 1)) || grainsCount === daysLeft) {
          allocation[day].push({ subCategory: 'grains', amount: grainsPortion })
          grainsCount--
        }
      }
    }
    console.log('dist', dist)
    console.log('allocation', allocation)
    commit(UPDATE_PLAN_ALLOCATION, {
      dog: payload.dog.id,
      allocation
    })
  }
}
