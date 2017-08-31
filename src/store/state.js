export default {
  ids: {
    dogs: 3,
    ingredients: 4,
    recipes: 2,
    plans: 2
  },
  dogs: [
    {
      id: 1,
      name: 'Delphi',
      birthday: new Date(2012, 2, 15),
      sex: 'm',
      weight: 15000
    },
    {
      id: 2,
      name: 'Loni',
      birthday: new Date(2014, 6, 25),
      sex: 'f',
      weight: 18000
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
      parts: [[1, 'Fleisch']]
    },
    {
      id: 2,
      name: 'Knorpelfleisch',
      parts: [[0.2, 'Knochen'], [0.8, 'Fleisch']]
    },
    {
      id: 3,
      name: 'Dorschlebertran',
      parts: [[1, 'Vitamine']]
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
  ],
  recipes: [
    {
      id: 1,
      name: 'Normale Fleisch Malzeit',
      ingredients: [
        { ingredient: 1, amount: 250, unit: 'g' },
        { ingredient: 3, amount: 10, unit: 'ml' }
      ]
    }
  ],
  plans: [
    {
      id: 1,
      dog: 1,
      animal: 0.8,
      vegetables: 0.2,
      subcategories: [
        [0.4, 'Fleisch'], [0.2, 'Innereien'], [0.3, 'Magen'], [0.1, 'Bones'],
        [0.4, 'Getreide'], [0.2, 'Früchte'], [0.4, 'Gemüse']
      ],
      week: [
        [{ recipe: 1 }],
        [], [], [], [], [], [], []
      ]
    }
  ]
}

