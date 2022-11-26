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

export default function HomePage() {
    // test data for the cards and images passed through props and looped through the flatlist
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
  ]);
  const [trendingFood, setTrendingFood] = useState([
    {
        name: 'churros',
        price: '$3.00',
        foodImage: require('../assets/foodImages/churro.png'),
        key: 1,
    },
    {
        name: 'churros',
        price: '$3.00',
        foodImage: require('../assets/foodImages/fruit.png'),
        key: 2,
    },
    {
        name: 'churros',
        price: '$3.00',
        foodImage: require('../assets/foodImages/churro.png'),
        key: 3,
    },
    {
        name: 'churros',
        price: '$3.00',
        foodImage: require('../assets/foodImages/fruit.png'),
        key: 4,
    }
  ]);


  return (
    <View style={styles.container}>
      {/* Top header for the user to be able to display address and access items in their order */}

      <HeaderComponent />
      <SearchComponent />

       {/* Category items -> wrapped in scroll view to be able to scroll horizontal and flat list to manage performance issues with data */}
      <View style={styles.content}>
        <Text>Category</Text>
        <View style={styles.list}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <FlatList
              numColumns={categoryList.length}
              data={categoryList}
              renderItem={({ item }) => (
                <FoodCategoryCard foodCategory={item} />
              )}
            />
          </ScrollView>
        </View>
        {/* Restaurant trending */}
        <Text>Trending</Text>
        <View style={styles.list}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <FlatList
              numColumns={trendingFood.length}
              data={trendingFood}
              renderItem={({ item }) => (
                <FoodsCard foodCategory={item} />
              )}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    
  },

})
