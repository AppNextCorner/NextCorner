import {
  StyleSheet,
  View,
  FlatList,

} from 'react-native'
import { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import SearchComponent from '../components/SearchComponent'
import RestaurantCard from '../Cards/RestaurantCard'
import RestaurantListComponent from '../components/RestaurantListComponent'
import CategoryScrollBar from '../components/CategoryScrollBar'

import useFoodItemData from '../data/useFoodItemData'

export default function HomePage() {

  const {categoryList,  trendingFood,  } = useFoodItemData();
  // test data for the cards and images passed through props and looped through the flatlist -> needs to replace with API soon
  
  const [dataToRender, setDataToRender] = useState(trendingFood)

  // did we select an item - category
  const [categoryWasSelected, setCategoryWasSelected] = useState(false)
  // what category did we select
  const [itemId, setItemId] = useState(0)

  const [checkForStyleChange, setCheckForStyleChange] = useState(false)

  // the data we want to render is stored in the state variable, so we need to map through the data to pinpoint the category array containing the data of each card
  let findingCategory = dataToRender.map((trendingRestaurants) =>
    trendingRestaurants.restaurantList.map((restaurantData) => restaurantData),
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
                restaurants={item.restaurantList}
              />
            )}
          />
        </>
      ) : (
        // screen for displaying the list of category restaurants after changing the state of the categoryWasSelected
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
            data={filterRestaurantCards}
            renderItem={({ item }) => {
              return (
                <RestaurantCard
                  checkForStyleChange={checkForStyleChange}
                  restaurantItem={item}
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
