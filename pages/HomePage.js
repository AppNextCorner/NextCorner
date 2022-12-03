import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
} from 'react-native'
import { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import SearchComponent from '../components/SearchComponent'
import RestaurantCategoryCard from '../Cards/RestaurantCategoryCard'
import RestaurantCard from '../Cards/RestaurantCard'
import RestaurantListComponent from '../components/RestaurantListComponent'
import CategoryScrollBar from '../components/CategoryScrollBar'

export default function HomePage() {
  // test data for the cards and images passed through props and looped through the flatlist -> needs to replace with API soon
  const [categoryList, setCategoryList] = useState([
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
  ])
  const [trendingFood, setTrendingFood] = useState([
    {
      title: 'Trending',
      category: [
        {
          name: "Henry Benry's almighty churros",

          foodImage: require('../assets/foodImages/churro.png'),
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
          key: 2,
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
      category: [
        {
          name: "Henry Benry's almighty churros 2",
          price: '$30.00',
          foodImage: require('../assets/foodImages/churro.png'),
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
          key: 3,
          foodCategoryId: 3,
        },
        {
          name: "Henry Benry's almighty churros 2",
          price: '$30.00',
          foodImage: require('../assets/foodImages/churro.png'),
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
          foodImage: require('../assets/foodImages/churro.png'),
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
      category: [
        {
          name: "Henry Benry's almighty Fruits",
          price: '$10.00',
          foodImage: require('../assets/foodImages/fruit.png'),
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
  ])
  const [dataToRender, setDataToRender] = useState(trendingFood)

  // did we select an item - category
  const [categoryWasSelected, setCategoryWasSelected] = useState(false)
  // what category did we select
  const [itemId, setItemId] = useState(0)

  const [checkForStyleChange, setCheckForStyleChange] = useState(false)

  // the data we want to render is stored in the state variable, so we need to map through the data to pinpoint the category array containing the data of each card
  let findingCategory = dataToRender.map((trendingRestaurants) =>
    trendingRestaurants.category.map((cardData) => cardData),
  )

  // shows item when category is selected and compares the id of the category with the id's of every card in the category list
  function showItem(id) {
    // want to check if the pressed category is the same as the selected category
    // if it is the same then the state of categoryWasSelected should be false because this is the initial state of the category list
    if (itemId === id) {
      setCategoryWasSelected(false)
      setItemId(0)
      setCheckForStyleChange(false)

      // setting to true because the id is already selected when the category is selected -> meaning that the if the id is not selected to a new value and is the same as the current value of itemId, then go back to default because the category was selected twice -> until the new value is selected by the newId / category
      //
    } else {
      setItemId(id)
      setCategoryWasSelected(true)
      setCheckForStyleChange(true)
    }
  }
  // after we have the category selected, we need to set the selected value equal to the value of the selected item with the selected item ID and compare it with the category selected id value
  let filterRestaurantCards = findingCategory
    .flat()
    .filter((i) => i.foodCategoryId === itemId)

  return (
    <View style={styles.container}>
      {/* Top header for the user to be able to display address and access items in their order */}

      <HeaderComponent />
      <SearchComponent />
      {/* If the category has not been selected, show the default restaurants page */}
      {!categoryWasSelected ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <CategoryScrollBar
                categoryList={categoryList}
                itemId={itemId}
                style={styles.margin}
                showItem={showItem}
              />
            }
            data={dataToRender}
            renderItem={({ item }) => (
              // renders the nested data three times -> due to having three objects in the dataToRender array
              // if no category selected, render the default treding

              <RestaurantListComponent
                title={item.title}
                style={styles.list}
                categoryItems={item.category}
              />
            )}
          />
        </>
      ) : (
        // screen for displaying the list of category restaurants after changing the state of the categoryWasSelected
        <>
          <FlatList
            ListHeaderComponent={
              <CategoryScrollBar
                categoryList={categoryList}
                itemId={itemId}
                style={styles.margin}
                showItem={showItem}
              />
            }
            data={filterRestaurantCards}
            renderItem={({ item }) => {
              return (
                <RestaurantCard
                  checkForStyleChange={checkForStyleChange}
                  foodCategory={item}
                />
              )
            }}
          />
        </>
      )}
    </View>
  )
}



const styles = StyleSheet.create({
  selectedCategory: {
    backgroundColor: 'blue',
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
  },
  margin: {
    backgroundColor: '#f2f3f5',
    flex: 1,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  category: {
    paddingVertical: 25,
    flex: 0,
    alignContent: 'center',
  },
  list: {
    alignContent: 'center',
    flex: 0,
  },
})
