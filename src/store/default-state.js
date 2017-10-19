export default {
  ids: {
    dogs: 1,
    ingredients: 15
  },
  settings: {
    useMeals: true,
    useStash: false,
    subCategoryColors: {
      'meat': '#E8122B',
      'entrails': '#FF3826',
      'stomach': '#E84715',
      'bones': '#FF7119',
      'grains': '#4BE80C',
      'fruits': '#3CE869',
      'vegetables': '#42FF3C'
    },
    rounding: {
      enabled: true,
      value: 25
    },
    notifications: {
      severities: ['is-success', 'is-info', 'is-warning', 'is-danger'],
      severity: 0,
      autoDelete: ['is-success', 'is-info'],
      deletionDelay: 2000
    }
  },
  notifications: [],
  selectedDogId: 0,
  activities: {
    'unactive': 1,
    'moderate': 1.25,
    'active': 1.5,
    'highly': 2
  },
  dogs: [],
  categories: {
    animal: ['meat', 'stomach', 'entrails', 'bones'],
    vegetables: ['grains', 'fruits', 'vegetables'],
    additives: ['oil']
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
      defaultAmount: 1000
    },
    {
      id: 2,
      name: 'Beef heart',
      subCategories: [[1, 'entrails']],
      unit: 'g',
      defaultAmount: 500
    },
    {
      id: 3,
      name: 'Beef kidney',
      subCategories: [[1, 'entrails']],
      unit: 'g',
      defaultAmount: 500
    },
    {
      id: 4,
      name: 'Beef liver',
      subCategories: [[1, 'entrails']],
      unit: 'g',
      defaultAmount: 500
    },
    {
      id: 5,
      name: 'Gristle meat',
      subCategories: [[0.2, 'bones'], [0.8, 'meat']],
      unit: 'g',
      defaultAmount: 1000
    },
    {
      id: 6,
      name: 'Omasum',
      subCategories: [[1, 'stomach']],
      unit: 'g',
      defaultAmount: 1000
    },
    {
      id: 7,
      name: 'Rumen',
      subCategories: [[1, 'stomach']],
      unit: 'g',
      defaultAmount: 1000
    },
    {
      id: 8,
      name: 'Chicken neck',
      subCategories: [[0.5, 'meat'], [0.5, 'bones']],
      unit: 'g',
      defaultAmount: 500
    },
    {
      id: 9,
      name: 'Rice',
      subCategories: [[1, 'grains']],
      unit: 'g',
      defaultAmount: 500
    },
    {
      id: 10,
      name: 'Noodles',
      subCategories: [[0.5, 'grains']],
      unit: 'g',
      defaultAmount: 1000
    },
    {
      id: 11,
      name: 'Zucchine',
      subCategories: [[1, 'vegetables']],
      unit: 'g',
      defaultAmount: 500
    },
    {
      id: 12,
      name: 'Pumpkin',
      subCategories: [[1, 'vegetables']],
      unit: 'g',
      defaultAmount: 1000
    },
    {
      id: 13,
      name: 'Apple',
      subCategories: [[1, 'fruits']],
      unit: 'g',
      defaultAmount: 250
    },
    {
      id: 14,
      name: 'Banana',
      subCategories: [[1, 'fruits']],
      unit: 'g',
      defaultAmount: 200
    }
  ],
  stash: [
    {
      ingredient: 1,
      amount: 2000
    },
    {
      ingredient: 2,
      amount: 500
    }
  ]
}
