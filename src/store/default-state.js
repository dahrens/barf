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
      subCategories: [{ portion: 100, subCategory: 'meat' }],
      unit: 'g',
      defaultAmount: 1000,
      price: 0.0
    },
    {
      id: 2,
      name: 'Beef heart',
      subCategories: [{ portion: 100, subCategory: 'entrails' }],
      unit: 'g',
      defaultAmount: 500,
      price: 0.0
    },
    {
      id: 3,
      name: 'Beef kidney',
      subCategories: [{ portion: 100, subCategory: 'entrails' }],
      unit: 'g',
      defaultAmount: 500,
      price: 0.0
    },
    {
      id: 4,
      name: 'Beef liver',
      subCategories: [{ portion: 100, subCategory: 'entrails' }],
      unit: 'g',
      defaultAmount: 500,
      price: 0.0
    },
    {
      id: 5,
      name: 'Gristle meat',
      subCategories: [
        { portion: 20, subCategory: 'bones' },
        { portion: 80, subCategory: 'meat' }
      ],
      unit: 'g',
      defaultAmount: 1000,
      price: 0.0
    },
    {
      id: 6,
      name: 'Omasum',
      subCategories: [{ portion: 100, subCategory: 'stomach' }],
      unit: 'g',
      defaultAmount: 1000,
      price: 0.0
    },
    {
      id: 7,
      name: 'Rumen',
      subCategories: [{ portion: 100, subCategory: 'stomach' }],
      unit: 'g',
      defaultAmount: 1000,
      price: 0.0
    },
    {
      id: 8,
      name: 'Chicken neck',
      subCategories: [
        { portion: 50, subCategory: 'meat' },
        { portion: 50, subCategory: 'bones' }
      ],
      unit: 'g',
      defaultAmount: 500,
      price: 0.0
    },
    {
      id: 9,
      name: 'Rice',
      subCategories: [{ portion: 100, subCategory: 'grains' }],
      unit: 'g',
      defaultAmount: 500,
      price: 0.0
    },
    {
      id: 10,
      name: 'Noodles',
      subCategories: [{ portion: 100, subCategory: 'grains' }],
      unit: 'g',
      defaultAmount: 1000,
      price: 0.0
    },
    {
      id: 11,
      name: 'Zucchine',
      subCategories: [{ portion: 100, subCategory: 'vegetables' }],
      unit: 'g',
      defaultAmount: 500,
      price: 0.0
    },
    {
      id: 12,
      name: 'Pumpkin',
      subCategories: [{ portion: 100, subCategory: 'vegetables' }],
      unit: 'g',
      defaultAmount: 1000,
      price: 0.0
    },
    {
      id: 13,
      name: 'Apple',
      subCategories: [{ portion: 100, subCategory: 'fruits' }],
      unit: 'g',
      defaultAmount: 250,
      price: 0.0
    },
    {
      id: 14,
      name: 'Banana',
      subCategories: [{ portion: 100, subCategory: 'fruits' }],
      unit: 'g',
      defaultAmount: 200,
      price: 0.0
    }
  ],
  stash: []
}
