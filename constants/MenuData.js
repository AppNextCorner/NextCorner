import { faker } from '@faker-js/faker'

const OPTIONS = []
const SINGLE_OPTION = []
const MENU_ITEM = []
const ALL_RESTAURANTS = []
const TRENDING_RESTAURANTS = []
const TRENDING_TITLE = []

const singleOption = () => {
  return {
    label: faker.lorem.word(),
    id: faker.datatype.number(),
  }
}

export const restaurant = () => {
  const id = faker.datatype.number({ min: 1, max: 7 })
  const hourTime = faker.datatype.number({ min: 1, max: 12 })
  const minuteTime = faker.datatype.number({ min: 10, max: 59 })
  const stars = faker.datatype.number({ min: 0, max: 5, precision: 0.1 })
 
  return {
    // RESTAURANT WORKED
    name: faker.company.name(),
    storeType: "business",
    image: {
      uri: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
    },
    logo: {
      uri: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
    },
    // describes the business
    announcementCards: [
      {
        
        backgroundColor: faker.internet.color(100, 100, 100),
        header: faker.internet.domainWord(),
        text: faker.lorem.sentence(),
        image: require('../assets/CategoryIcons/burrito.png'),
      },
      {
       
        backgroundColor: faker.internet.color(100, 100, 100),
        header: faker.internet.domainWord(),
        text: faker.lorem.sentence(),
        image: require('../assets/CategoryIcons/pizza.png'),
      },
      {
        
        backgroundColor: faker.internet.color(100, 100, 100),
        header: faker.internet.domainWord(),
        text: faker.lorem.sentence(),
        image: require('../assets/CategoryIcons/bread.png'),
      },
    ],
    //accepts an array of two values 
    location: faker.address.nearbyGPSCoordinate(
      [34.050446895827484, -118.28171222546905],
      1,
      false,
    ),
    // change later with accurate times and whether it is AM or PM
    open: `${hourTime}:${minuteTime} am`,
    close: `${hourTime}:${minuteTime} pm`,
    description: faker.lorem.paragraph(),
    menuTypes: [
      {
        type: faker.music.genre(),
      },
      {
        type: 'Burger',
        //faker.music.genre()
      },
      {
        type: faker.music.genre(),
      },
      {
        type: faker.music.genre(),
      },
    ],
    menu: [
      {
        name: faker.commerce.productName(),
        itemId: faker.datatype.number(),
        timeToMake: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        image: {
          uri: `${faker.image.food()}?random=${Math.round(
            Math.random() * 1000,
          )}`,
        },
        price: faker.datatype.float({ min: 5, max: 15, precision: 0.01 }),
        description: faker.lorem.sentence(),
        options: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'multiple',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
        ],
        amountInCart: 1,
        // food type means that it could be sauce, burger, taco, etc
        type: 'Burger',
        rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
        reviews: [],
        //faker.music.genre(),
        // featured on top of the details page and checks if it is featured with the boolean value
        featured: faker.datatype.boolean(),
      },
      {
        name: faker.commerce.productName(),
        itemId: faker.datatype.number(),
        timeToMake: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        image: {
          uri: `${faker.image.food()}?random=${Math.round(
            Math.random() * 1000,
          )}`,
        },
        price: faker.datatype.float({ min: 5, max: 15, precision: 0.01 }),
        description: faker.lorem.sentence(),
        options: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'multiple',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
        ],
        amountInCart: 1,
        // food type means that it could be sauce, burger, taco, etc
        type: 'Burger',
        rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
        reviews: [],
        //faker.music.genre(),
        // featured on top of the details page and checks if it is featured with the boolean value
        featured: faker.datatype.boolean(),
      },
      {
        name: faker.commerce.productName(),
        itemId: faker.datatype.number(),
        timeToMake: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        image: {
          uri: `${faker.image.food()}?random=${Math.round(
            Math.random() * 1000,
          )}`,
        },
        price: faker.datatype.float({ min: 5, max: 15, precision: 0.01 }),
        description: faker.lorem.sentence(),
        options: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'multiple',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
        ],
        amountInCart: 1,
        // food type means that it could be sauce, burger, taco, etc
        type: 'Burger',
        rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
        reviews: [],
        //faker.music.genre(),
        // featured on top of the details page and checks if it is featured with the boolean value
        featured: faker.datatype.boolean(),
      },
      {
        name: faker.commerce.productName(),
        itemId: faker.datatype.number(),
        timeToMake: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        image: {
          uri: `${faker.image.food()}?random=${Math.round(
            Math.random() * 1000,
          )}`,
        },
        price: faker.datatype.float({ min: 5, max: 15, precision: 0.01 }),
        description: faker.lorem.sentence(),
        options: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'multiple',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
        ],
        amountInCart: 1,
        // food type means that it could be sauce, burger, taco, etc
        type: 'Burger',
        rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
        reviews: [],
        //faker.music.genre(),
        // featured on top of the details page and checks if it is featured with the boolean value
        featured: faker.datatype.boolean(),
      },
      {
        name: faker.commerce.productName(),
        itemId: faker.datatype.number(),
        timeToMake: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        image: {
          uri: `${faker.image.food()}?random=${Math.round(
            Math.random() * 1000,
          )}`,
        },
        price: faker.datatype.float({ min: 5, max: 15, precision: 0.01 }),
        description: faker.lorem.sentence(),
        options: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'multiple',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
        ],
        amountInCart: 1,
        // food type means that it could be sauce, burger, taco, etc
        type: 'Burger',
        rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
        reviews: [],
        //faker.music.genre(),
        // featured on top of the details page and checks if it is featured with the boolean value
        featured: faker.datatype.boolean(),
      },
      {
        name: faker.commerce.productName(),
        itemId: faker.datatype.number(),
        timeToMake: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        image: {
          uri: `${faker.image.food()}?random=${Math.round(
            Math.random() * 1000,
          )}`,
        },
        price: faker.datatype.float({ min: 5, max: 15, precision: 0.01 }),
        description: faker.lorem.sentence(),
        options: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'multiple',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
        ],
        amountInCart: 1,
        // food type means that it could be sauce, burger, taco, etc
        type: 'Burger',
        rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
        reviews: [],
        //faker.music.genre(),
        // featured on top of the details page and checks if it is featured with the boolean value
        featured: faker.datatype.boolean(),
      },
      {
        name: faker.commerce.productName(),
        itemId: faker.datatype.number(),
        timeToMake: faker.datatype.number({ min: 1, max: 3, precision: 1 }),
        image: {
          uri: `${faker.image.food()}?random=${Math.round(
            Math.random() * 1000,
          )}`,
        },
        price: faker.datatype.float({ min: 5, max: 15, precision: 0.01 }),
        description: faker.lorem.sentence(),
        options: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'single',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            type: 'multiple',
            itemId: 0,
            customizations: [
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
              {
                label: faker.lorem.word(),
                id: faker.datatype.number(),
                selected: false,
              },
            ],
          },
        ],
        amountInCart: 1,
        // food type means that it could be sauce, burger, taco, etc
        type: 'Burger',
        rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
        reviews: [],
        //faker.music.genre(),
        // featured on top of the details page and checks if it is featured with the boolean value
        featured: faker.datatype.boolean(),
      },
    ],
    id: faker.datatype.uuid(),
    categoryId: id,
    rating: stars,
    category: faker.commerce.department(),
  }
}
const trendingTitle = () => {
  return {
    category: faker.commerce.department(),
  }
}
export const trendingRestaurants = () => {
  // category list - iterate over all categories and return a list of all items that match the category
  let restaurantsWithCategories = []
  // Category Title List - values that are returned by the matching category
  let list = TRENDING_TITLE

  // compare every of all restaurants if they have a category title -> if it does, then push it onto the restaurantWithCategories array
  for (let j = 0; j < list.length; j++) {
    // check if the category property matches with the list of trending titles
    const filterRestaurantCard = ALL_RESTAURANTS.filter(
      (allRestaurants) => allRestaurants.category === list[j].category,
    )
    // after filtering all the items and comparing them with one of the trending titles list, then push all the items into the restaurantsWithCategory list
    restaurantsWithCategories.push({
      name: list[j].category,
      categorizedRestaurants: filterRestaurantCard,
    })
  }
  // containing the list of items with a name and a categorizedRestaurant property
  return {
    restaurantsWithCategories,
  }
}
// for items that have a category
export function CREATE_TRENDING_RESTAURANTS() {
  return TRENDING_RESTAURANTS
}
// items that do not have a category / all restaurants
export function CREATE_DEFAULT_RESTAURANTS() {
  return ALL_RESTAURANTS
}
/**
 * Populate all arrays with dummy data
 */
Array.from({ length: 10 }).forEach(() => {
  ALL_RESTAURANTS.push(restaurant())
})
Array.from({ length: 10 }).forEach(() => {
  TRENDING_TITLE.push(trendingTitle())
})
// Array.from({ length: 3 }).forEach(() => {
//   OPTIONS.push(option())
// })
// Array.from({ length: 3 }).forEach(() => {
//   SINGLE_OPTION.push(singleOption())
// })
// Array.from({ length: 5 }).forEach(() => {
//   MENU_ITEM.push(menuItem())
// })
Array.from({ length: 1 }).forEach(() => {
  TRENDING_RESTAURANTS.push(trendingRestaurants()) // {name: asdasd, resutrant: []}
})

export const DEFAULT_CATEGORY_DATA = [
  {
    text: 'Grains',
    foodType: require('../assets/CategoryIcons/bread.png'),
    key: 1,
  },
  {
    text: 'Burger',
    foodType: require('../assets/CategoryIcons/burger.png'),
    key: 2,
  },
  {
    text: 'Burrito',
    foodType: require('../assets/CategoryIcons/burrito.png'),
    key: 3,
  },
  {
    text: 'Hot Dog',
    foodType: require('../assets/CategoryIcons/corndog.png'),
    key: 4,
  },
  {
    text: 'Wings',
    foodType: require('../assets/CategoryIcons/chicken-leg.png'),
    key: 5,
  },
  {
    text: 'Fries',
    foodType: require('../assets/CategoryIcons/fries.png'),
    key: 6,
  },
  {
    text: 'Pizza',
    foodType: require('../assets/CategoryIcons/pizza.png'),
    key: 7,
  },
]