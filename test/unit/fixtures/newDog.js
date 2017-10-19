export default {
  name: '',
  birthday: null,
  sex: 'm',
  castrated: true,
  activity: 'moderate',
  image: '',
  plan: {
    calculated: true,
    portionPerDay: 500,  // only used when calculated = false
    idealWeight: 25000,
    currentWeight: 25000,
    percentOfWeight: 2,
    animal: 80,
    vegetables: 20,
    distribution: {
      animal: {
        meat: 40,
        stomach: 30,
        entrails: 20,
        bones: 10
      },
      vegetables: {
        grains: 40,
        vegetables: 40,
        fruits: 20
      }
    },
    week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    allocation: [[], [], [], [], [], [], []],
    mealAllocation: 'manual',
    meals: [
      { morning: [], evening: [] },
      { morning: [], evening: [] },
      { morning: [], evening: [] },
      { morning: [], evening: [] },
      { morning: [], evening: [] },
      { morning: [], evening: [] },
      { morning: [], evening: [] }
    ]
  },
  meals: new Map()
}
