export default {
  ids: {
    dogs: 1,
    ingredients: 4,
    recipes: 2
  },
  settings: {
    useStash: false
  },
  ui: {
    selectedDog: 0,
    activePlanView: 'base',
    categoryColors: {
      'animal': '#E8122B',
      'vegetables': '#42FF3C'
    },
    subCategoryColors: {
      'meat': '#E8122B',
      'entrails': '#FF3826',
      'stomach': '#E84715',
      'bones': '#FF7119',
      'grains': '#4BE80C',
      'fruits': '#3CE869',
      'vegetables': '#42FF3C'
    }
  },
  activities: {
    'unactive': 1,
    'moderate': 1.25,
    'active': 1.5,
    'highly': 2
  },
  newDog: {
    name: '',
    birthday: null,
    sex: 'm',
    castrated: true,
    weight: 25000,
    activity: 'moderate',
    percentOfWeight: 2,
    plan: {
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
  },
  dogs: [],
  categories: {
    animal: ['meat', 'stomach', 'entrails', 'bones'],
    vegetables: ['grains', 'fruits', 'vegetables'],
    additives: ['vitamin']
  },
  units: [
    'g', 'ml'
  ],
  ingredients: [
    {
      id: 1,
      name: 'Beef muscle meat',
      subCategories: [[1, 'meat']],
      unit: 'g',
      defaultAmount: 2000
    },
    {
      id: 2,
      name: 'Gristle meat',
      subCategories: [[0.2, 'bones'], [0.8, 'meat']],
      unit: 'g',
      defaultAmount: 2000
    },
    {
      id: 3,
      name: 'Codfish liver',
      subCategories: [[1, 'vitamin']],
      unit: 'ml',
      defaultAmount: 500
    }
  ],
  stash: [
    {
      ingredient: 1,
      amount: 2000,
      unit: 'g'
    },
    {
      ingredient: 3,
      amount: 500,
      unit: 'ml'
    }
  ]
}
