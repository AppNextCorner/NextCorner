export const DATA = [
  {
    categoryName: 'Trending',
    restaurantList: [
      {
        name: 'Taco Truck',
        image:  require('../assets/restaurantImages/redFoodCart.png'),
        description:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        menu: [
          {
          name: 'Churro',
          id: 1,
          quantity: 1,
          image: require('../assets/foodImages/churro.png'),
          price: '$150.00',
        }
        ]
      }
    ]
  }
]

/* Placeholder data  */
export const DEFAULT_TENDING_DATA = [
  {
    trendingCategoryTitle: 'Trending',
    restaurantList: [
      {
        restaurantName: 'space churros',
        restaurantImage: require('../assets/restaurantImages/redFoodCart.png'),
        restaurantDescription:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        restaurantMenu: [
          {
            menuItemName: 'Churro',
            menuItemId: 1,
            menuItemCartAmount: 1,
            menuItemImage: require('../assets/foodImages/churro.png'),
            menuItemPrice: '$150.00',
            multipleOptionSelectionList: [
              {
                optionTitle: 'spice',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
                options: [
                  {
                    label: 'Mild',
                    label: 'amogus',
                  },
                ],
              },
            ],
            singularOptionSelectionList: [
              {
                optionTitle: 'Type of churros',
              },
              {
                options: [
                  // label is a prop from RadioButtonRN
                  {
                    label: 'Mild?',
                    id: 0,
                    status: false,
                  },
                  {
                    label: 'amogus',
                    id: 1,
                  },
                ],
              },
              {
                selectedOption: '',
              },

              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                    id: 2,
                  },
                  {
                    label: 'WOW',
                    id: 3,
                  },
                ],
              },
              {
                selectedOption: '',
              },
            ],
          },
          {
            menuItemName: 'Fruit',
            menuItemId: 2,
            menuItemCartAmount: 1,
            menuItemImage: require('../assets/foodImages/fruit.png'),
            menuItemPrice: '$150.00',
            multipleOptionSelectionList: [
              {
                optionTitle: 'spice',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
                options: [
                  {
                    label: 'Mild',
                    label: 'amogus',
                  },
                ],
              },
            ],
            singularOptionSelectionList: [
              {
                optionTitle: 'Type of churros',
              },
              {
                options: [
                  // label is a prop from RadioButtonRN
                  {
                    label: 'Mild?',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogusAgain',
                  },
                ],
              },
            ],
          },
        ],
        key: 1,
        restaurantCategoryId: 4,
      },
      {
        restaurantName: 'Super Churros',
        restaurantImage: require('../assets/restaurantImages/redFoodCart.png'),
        restaurantDescription:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        restaurantMenu: [
          {
            menuItemName: 'Churro',
            menuItemId: 3,
            menuItemCartAmount: 1,
            menuItemImage: require('../assets/foodImages/churro.png'),
            menuItemPrice: '$150.00',
            multipleOptionSelectionList: [
              {
                optionTitle: 'spice',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
                options: [
                  {
                    label: 'Mild',
                    label: 'amogus',
                  },
                ],
              },
            ],
            singularOptionSelectionList: [
              {
                optionTitle: 'Size of churros',
              },
              {
                options: [
                  // label is a prop from RadioButtonRN
                  {
                    label: 'Small',
                  },
                  {
                    label: 'Medium',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogusAgain',
                  },
                ],
              },
            ],
          },
          {
            menuItemName: 'Fruit',
            menuItemId: 4,
            menuItemCartAmount: 1,
            menuItemImage: require('../assets/foodImages/fruit.png'),
            menuItemPrice: '$150.00',
            multipleOptionSelectionList: [
              {
                optionTitle: 'spice',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
                options: [
                  {
                    label: 'Mild',
                    label: 'amogus',
                  },
                ],
              },
            ],
            singularOptionSelectionList: [
              {
                optionTitle: 'Type of churros',
              },
              {
                options: [
                  // label is a prop from RadioButtonRN
                  {
                    label: 'Mild?',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogusAgain',
                  },
                ],
              },
            ],
          },
        ],
        key: 2,
        restaurantCategoryId: 4,
      },
    ],
  },
  {
    trendingCategoryTitle: 'Holiday Sale',
    restaurantList: [
      {
        restaurantName: 'Holiday sweets',
        restaurantImage: require('../assets/restaurantImages/redFoodCart.png'),
        restaurantDescription:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        restaurantMenu: [
          {
            menuItemName: 'Churro',
            menuItemId: 5,
            menuItemCartAmount: 1,
            menuItemImage: require('../assets/foodImages/churro.png'),
            menuItemPrice: '$150.00',
            multipleOptionSelectionList: [
              {
                optionTitle: 'spice',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
                options: [
                  {
                    label: 'Mild',
                    label: 'amogus',
                  },
                ],
              },
            ],
            singularOptionSelectionList: [
              {
                optionTitle: 'Type of churros',
              },
              {
                options: [
                  // label is a prop from RadioButtonRN
                  {
                    label: 'Mild?',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogusAgain',
                  },
                ],
              },
            ],
          },
          {
            menuItemName: 'Fruit',
            menuItemId: 6,
            menuItemCartAmount: 1,
            menuItemImage: require('../assets/foodImages/fruit.png'),
            menuItemPrice: '$150.00',
            multipleOptionSelectionList: [
              {
                optionTitle: 'spice',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
                options: [
                  {
                    label: 'Mild',
                    label: 'amogus',
                  },
                ],
              },
            ],
            singularOptionSelectionList: [
              {
                optionTitle: 'Type of churros',
              },
              {
                options: [
                  // label is a prop from RadioButtonRN
                  {
                    label: 'Mild?',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogusAgain',
                  },
                ],
              },
            ],
          },
        ],
        key: 3,
        restaurantCategoryId: 1,
      },
      {
        restaurantName: 'Super Churros',
        restaurantImage: require('../assets/restaurantImages/redFoodCart.png'),
        restaurantDescription:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        restaurantMenu: [
          {
            menuItemName: 'Churro',
            menuItemId: 7,
            menuItemCartAmount: 1,
            menuItemImage: require('../assets/foodImages/churro.png'),
            menuItemPrice: '$1.00',
            multipleOptionSelectionList: [
              {
                optionTitle: 'spice',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
                options: [
                  {
                    label: 'Mild',
                    label: 'amogus',
                  },
                ],
              },
            ],
            singularOptionSelectionList: [
              {
                optionTitle: 'Type of churros',
              },
              {
                options: [
                  // label is a prop from RadioButtonRN
                  {
                    label: 'Mild?',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogusAgain',
                  },
                ],
              },
            ],
          },
          {
            menuItemName: 'Fruit',
            menuItemId: 8,
            menuItemCartAmount: 1,
            menuItemImage: require('../assets/foodImages/fruit.png'),
            menuItemPrice: '$1.00',
            multipleOptionSelectionList: [
              {
                optionTitle: 'spice',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'Mild',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
                options: [
                  {
                    label: 'Mild',
                    label: 'amogus',
                  },
                ],
              },
            ],
            singularOptionSelectionList: [
              {
                optionTitle: 'Type of churros',
              },
              {
                options: [
                  // label is a prop from RadioButtonRN
                  {
                    label: 'Mild?',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogus',
                  },
                ],
              },
              {
                optionTitle: 'Extra',
              },
              {
                options: [
                  {
                    label: 'Mild',
                  },
                  {
                    label: 'amogusAgain',
                  },
                ],
              },
            ],
          },
        ],
        key: 4,
        restaurantCategoryId: 3,
      },
    ],
  },
]

export const DEFAULT_CATEGORY_DATA = [
  {
    text: 'sweet',
    foodType: require('../assets/foodImages/sweet.png'),
    color: 'blue',
    key: 1,
  },
  {
    text: 'burger',
    foodType: require('../assets/foodImages/burger.png'),
    key: 2,
  },
  {
    text: 'sushi',
    foodType: require('../assets/foodImages/sushi.png'),
    key: 3,
  },
  {
    text: 'healthy',
    foodType: require('../assets/foodImages/healthy.png'),
    key: 4,
  },
]
