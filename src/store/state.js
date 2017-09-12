export default {
  ids: {
    dogs: 3,
    ingredients: 4,
    recipes: 2,
    plans: 2
  },
  event_meta: {
    types: ['meal']
  },
  dogs: [
    {
      id: 1,
      name: 'Delphi',
      birthday: new Date(2012, 2, 15),
      sex: 'm',
      weight: 15000,
      plan: 1,
      meals: new Map([
        [new Date(), [
          { name: 'Rindermuskelfleisch', amount: 250, unit: 'g', parts: [1, 'Fleisch'] }
        ]]
      ])
    }
    // {
    //   id: 2,
    //   name: 'Loni',
    //   birthday: new Date(2014, 6, 25),
    //   sex: 'f',
    //   weight: 18000,
    //   plan: null
    // }
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
  ],
  plans: [
    {
      id: 1,
      name: 'Delphi\'s Plan',
      dog: 1,
      animal: 80,
      vegetables: 20,
      distribution: {
        animal: {
          Fleisch: 40,
          Innereien: 20,
          Magen: 30,
          Knochen: 10
        },
        vegetables: {
          Getreide: 40,
          Früchte: 20,
          Gemüse: 40
        }
      },
      week: [
        [{ recipe: 1 }],
        [], [], [], [], [], []
      ]
    }
  ]
}
