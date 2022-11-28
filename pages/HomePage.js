import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
} from 'react-native'
import { useState, } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import SearchComponent from '../components/SearchComponent'
import FoodCategoryCard from '../Cards/FoodCategoryCard'
import FoodsCard from '../Cards/FoodsCard'
import FoodListComponent from '../components/FoodListComponent'

export default function HomePage() {
  const [shouldShow, setShouldShow] = useState(true)
  // test data for the cards and images passed through props and looped through the flatlist -> needs to replace with API soon
  const [categoryList, setCategoryList] = useState([
    {
      text: 'sweet',
      foodType: require('../assets/foodImages/sweet.png'),
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
          price: '$150.00',
          foodImage: require('../assets/foodImages/churro.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 1,
          foodCategoryId: 1,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 2,
          foodCategoryId: 2,
        },
        {
          name: 'churros',
          price: '$3.00',
          foodImage: require('../assets/foodImages/churro.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 3,
          foodCategoryId: 2,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 4,
          foodCategoryId: 4,
        },
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
          key: 1,
          foodCategoryId: 3,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 2,
          foodCategoryId: 4,
        },
        {
          name: 'churros',
          price: '$3.00',
          foodImage: require('../assets/foodImages/churro.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 3,
          foodCategoryId: 2,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 4,
          foodCategoryId: 2,
        },
      ],
    },
    {
      title: 'Best for Budged',
      category: [
        {
          name: "Henry Benry's almighty Fruits",
          price: '$10.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 1,
          foodCategoryId: 1,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 2,
          foodCategoryId: 1,
        },
        {
          name: 'churros',
          price: '$3.00',
          foodImage: require('../assets/foodImages/churro.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 3,
          foodCategoryId: 2,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 4,
          foodCategoryId: 3,
        },
      ],
    },
  ])

  const [itemId, setItemId] = useState(0)

  let lol = trendingFood.map((person) =>
    person.category.map((comment) => comment),
  )
  let findingFilter = trendingFood.map((person) =>
    person.category.map((comment) => comment.foodCategoryId),
  )
  let lol3 = lol.flat().filter((i) => i.foodCategoryId === 2)

  var person = findingFilter.filter((person) => person !== 2)

  let myTitle = categoryList.map((title) => title)
  console.log(
    'Among us: ' + lol3, //use the argument here.
  )

  function showItem(id) {
    setItemId(id)
    console.log(id)

    if (itemId === id) {
      setShouldShow(!shouldShow)
    }

    if (itemId !== id) {
      setShouldShow(shouldShow)
    }
  }

  

  return (
    <View style={styles.container}>
      {/* Top header for the user to be able to display address and access items in their order */}

      <HeaderComponent />
      <SearchComponent />
      <ScrollView>
        {/* Category items -> wrapped in scroll view to be able to scroll horizontal and flat list to manage performance issues with data */}
        <View style={styles.content}>
          <View style={styles.category}>
            <Text style={styles.title}>Category</Text>

            <View style={styles.list}>
              {/* Scroll View used to be able to quickly scroll horizontally with properties allowing it to do */}
              <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {/* Gets data from the category list above to filter the food "menu" */}
                <FlatList
                  numColumns={categoryList.length}
                  data={categoryList}
                  renderItem={({ item }) => (
                    <FoodCategoryCard
                      handlePress={showItem}
                      foodCategory={item}
                    />
                  )}
                />
              </ScrollView>
            </View>
          </View>

          <Text style={styles.margin}></Text>

          {/* Restaurant trending */}
          {shouldShow ? (
            <FlatList
              data={trendingFood}
              renderItem={({ item }) => {
                console.log('LOOk at the categories home: ' + item.category)
                return (
                  <FoodListComponent
                    title={item.title}
                    style={styles.list}
                    categoryItems={item.category}
                  />
                )
              }}
            />
          ) : (
            // stack lists because we don't want to only render 3 items being 3 category on the state, rather we want to render every item individually
            <FlatList
              data={lol}
              renderItem={({ item }) => {
                let lol2 = item
                  .flat()
                  .filter((i) => i.foodCategoryId === itemId)
                console.log(
                  'really' +
                    item.flat().filter((i) => i.foodCategoryId === itemId),
                )

                return (
                  <FlatList
                    data={lol2}
                    renderItem={({ item }) => <FoodsCard foodCategory={item} />}
                  />
                )
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
