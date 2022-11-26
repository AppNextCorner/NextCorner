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
import FoodCategoryCard from '../Cards/FoodCategoryCard'
import FoodsCard from '../Cards/FoodsCard'
import FoodListComponent from '../components/FoodListComponent'

export default function HomePage() {
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
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 2,
        },
        {
          name: 'churros',
          price: '$3.00',
          foodImage: require('../assets/foodImages/churro.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 3,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 4,
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
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 2,
        },
        {
          name: 'churros',
          price: '$3.00',
          foodImage: require('../assets/foodImages/churro.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 3,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 4,
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
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 2,
        },
        {
          name: 'churros',
          price: '$3.00',
          foodImage: require('../assets/foodImages/churro.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 3,
        },
        {
          name: 'fruit',
          price: '$3.00',
          foodImage: require('../assets/foodImages/fruit.png'),
          description:
            "Henry benry's churros are one of the best in town. With precise use of homemade ingredients and love to bring you the best churros",
          key: 4,
        },
      ],
    },
  ])

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
                    <FoodCategoryCard title={item.title} foodCategory={item} />
                  )}
                />
              </ScrollView>
            </View>
          </View>

          <Text style={styles.margin}></Text>

          {/* Restaurant trending */}
          <FlatList
            data={trendingFood}
            renderItem={({ item }) => (
              <FoodListComponent
                title={item.title}
                style={styles.list}
                categoryItems={item.category}
              />
            )}
          />
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
