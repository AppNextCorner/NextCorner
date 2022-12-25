/* Placeholder data  */
export const DEFAULT_TENDING_DATA = [
  {
    title: 'Trending',
    restaurantList: [
      {
        name: 'space churros',

        foodImage: require('../assets/restaurantImages/redFoodCart.png'),
        description:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        menu: [
          {
            title: 'Churro',
            itemId: 1,
            image: require('../assets/foodImages/churro.png'),
            price: '$150.00',
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
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
            itemId: 2,
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
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
          },
          {
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
          },
          {
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
          },
        ],
        key: 1,
        foodCategoryId: 1,
      },
      // {
      //   name: "fruit",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/fruit.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 2,
      //   foodCategoryId: 2,
      // },
      // {
      //   name: "churros",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/churro.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 3,
      //   foodCategoryId: 2,
      // },
      // {
      //   name: "fruit",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/fruit.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 4,
      //   foodCategoryId: 4,
      // },
    ],
  },
  {
    title: 'Hot Foods',
    restaurantList: [
      {
        name: "Henry Benry's almighty churros 2",
        price: '$30.00',
        foodImage: require('../assets/restaurantImages/redFoodCart.png'),
        description:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        menu: [
          {
            title: 'Churro',
            image: require('../assets/foodImages/churro.png'),
            price: '$150.00',
          },
          {
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
          },
          {
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
          },
        ],
        key: 3,
        foodCategoryId: 3,
      },
      {
        name: "Henry Benry's almighty churros 2",
        price: '$30.00',
        foodImage: require('../assets/restaurantImages/redFoodCart.png'),
        description:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        menu: [
          {
            title: 'Churro',
            image: require('../assets/foodImages/churro.png'),
            price: '$150.00',
          },
          {
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
          },
        ],
        key: 4,
        foodCategoryId: 3,
      },
      {
        name: "Henry Benry's almighty churros 2",
        price: '$30.00',
        foodImage: require('../assets/restaurantImages/redFoodCart.png'),
        description:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        menu: [
          {
            title: 'Churro',
            image: require('../assets/foodImages/churro.png'),
            price: '$150.00',
          },
          {
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
          },
        ],
        key: 5,
        foodCategoryId: 3,
      },
      // {
      //   name: "fruit",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/fruit.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 2,
      //   foodCategoryId: 4,
      // },
      // {
      //   name: "churros",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/churro.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 3,
      //   foodCategoryId: 2,
      // },
      // {
      //   name: "fruit",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/fruit.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 4,
      //   foodCategoryId: 2,
      // },
    ],
  },
  {
    title: 'Best for Budget',
    restaurantList: [
      {
        name: "Henry Benry's almighty Fruits",
        price: '$10.00',
        foodImage: require('../assets/restaurantImages/redFoodCart.png'),
        description:
          "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
        menu: [
          {
            title: 'Churro',
            image: require('../assets/foodImages/churro.png'),
            price: '$150.00',
          },
          {
            title: 'Chicken',
            image: require('../assets/foodImages/fruit.png'),
            price: '$150.00',
          },
        ],
        key: 6,
        foodCategoryId: 1,
      },
      // {
      //   name: "fruit",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/fruit.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 2,
      //   foodCategoryId: 1,
      // },
      // {
      //   name: "churros",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/churro.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 3,
      //   foodCategoryId: 2,
      // },
      // {
      //   name: "fruit",
      //   price: "$3.00",
      //   foodImage: require("../assets/foodImages/fruit.png"),
      //   description:
      //     "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
      //   key: 4,
      //   foodCategoryId: 3,
      // },
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