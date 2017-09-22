export default {
  ids: {
    dogs: 3,
    ingredients: 4,
    recipes: 2
  },
  event_meta: {
    types: ['meal']
  },
  activities: {
    'unactive': 1,
    'moderate': 1.25,
    'active': 1.5,
    'highly': 2
  },
  dogs: [
    {
      id: 1,
      name: 'Delphi',
      birthday: new Date(2012, 2, 15),
      sex: 'm',
      castrated: true,
      weight: 15000,
      activity: 'moderate',
      plan: {
        animal: 80,
        vegetables: 20,
        distribution: {
          animal: {
            Fleisch: 40,
            Magen: 30,
            Innereien: 20,
            Knochen: 10
          },
          vegetables: {
            Getreide: 40,
            Gemüse: 40,
            Früchte: 20
          }
        },
        week: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
        allocation: [
          [],  // monday
          [],
          [],
          [],
          [],
          [],
          []   // sunday
        ],
        meals: [  // which ingredients / meals are regulary bound to each day
          [{ recipe: 1 }, { ingredient: 2, amount: 250 }],
          [], [], [], [], [], []
        ]
      },
      meals: new Map([  // // dogs meal history if active
        ['20170924', [
          { name: 'Rindermuskelfleisch', amount: 250, unit: 'g', parts: [1, 'Fleisch'] }
        ]]
      ])
    }
  ],
  categories: {
    animal: ['Fleisch', 'Innereien', 'Magen', 'Knochen'],
    vegetables: ['Getreide', 'Früchte', 'Gemüse'],
    additives: ['Vitamine']
  },
  units: [
    'g', 'ml'
  ],
  ingredients: [
    {
      id: 1,
      name: 'Rindermuskelfleisch',
      subCategories: [[1, 'Fleisch']],
      unit: 'g',
      defaultAmount: 2000
    },
    {
      id: 2,
      name: 'Knorpelfleisch',
      subCategories: [[0.2, 'Knochen'], [0.8, 'Fleisch']],
      unit: 'g',
      defaultAmount: 2000
    },
    {
      id: 3,
      name: 'Dorschlebertran',
      subCategories: [[1, 'Vitamine']],
      unit: 'ml',
      defaultAmount: 500
    }
  ],
  recipes: [
    {
      id: 1,
      name: 'Normale Fleisch Mahlzeit',
      ingredients: [
        { ingredient: 1, amount: 250 },
        { ingredient: 3, amount: 10 }
      ]
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
    },
    {
      recipe: 1,
      quantity: 2
    }
  ]
}
