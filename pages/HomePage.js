/**
 * Purpose of the file: It is used to be the first page the user has access to after opening the app / login in through the app
 * - Displays restaurants based on location or depending on the section from either the category or default sections
 */
import { StyleSheet, View, FlatList, Text } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { StatusBar } from 'expo-status-bar'
import SearchComponent from '../components/SearchComponent'
import RestaurantCard from '../Cards/RestaurantCard'
import RestaurantListComponent from '../components/RestaurantListComponent'
import CategoryScrollBar from '../components/CategoryScrollBar'
import OrderButton from '../components/OrderButton'
import { useAppSelector } from '../store/hook'
import { getButton} from '../store/slices/addToCart'
import useCategoryList from '../hooks/useCategoryList'
import useRestaurants from '../hooks/useRestaurants'

export default function HomePage() {
  /**
   * Hook for our category cards to filter through businesses that have a matching id to that category card
   */
  const {
    categoryWasSelected,
    categoryId,
    categoryList,
    checkForStyleChange,
    onSelectCategory,
  } = useCategoryList()

  const { trendingRestaurants, restaurants } = useRestaurants()
  // access the restaurant data
  const getRestaurants = trendingRestaurants
    .map((val) => val.restaurantsWithCategories)
    .flat()

  const isClicked = useAppSelector(getButton)
  // Copy of the restaurants 
  let list = []

  // filter out restaraunts from every category - get restrautns from every category
  const getRestaurant = restaurants.forEach((r) => {
    // list join up with the restaurnt list
    list = list.concat(r)
  })

  // filter out restaurants that have matching category id
  const filterRestaurantCards = restaurants.filter((i) => {
    return i.categoryId === categoryId
  })
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {/* Top header for the user to be able to display address and access items in their order */}

        <HeaderComponent />
        {/* If the category has not been selected, show the default restaurants page */}
        {!categoryWasSelected ? (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <>
                  <SearchComponent />

                  <CategoryScrollBar
                    categoryList={categoryList}
                    itemId={categoryId}
                    style={styles.margin}
                    showItem={onSelectCategory}
                  />
                </>
              }
              data={getRestaurants}
              ListFooterComponent={
                <FlatList
                  ListHeaderComponent={
                    <>
                      <View style={styles.businessHeaderContainer}>
                        <Text style={styles.businessHeader}>
                          All Businesses
                        </Text>
                      </View>
                    </>
                  }
                  showsVerticalScrollIndicator={false}
                  data={restaurants}
                  keyExtractor={(item, index) => item.id} // hey tell flatlist what the unique property is - by edefault it looks for item.key
                  renderItem={({ item }) => (
                    // RestaurantCard is each individual restaurant card that pass restarauntItem being the data that was filtered for the category, but similar to the trendingFood data
                    <RestaurantCard
                      restaurantItem={item}
                      checkForStyleChange={!checkForStyleChange}
                    />
                  )}
                />
              }
              renderItem={({ item }) => (
                // renders the nested data three times -> due to having three objects in the dataToRender array
                // if no category selected, render the default treding
                <RestaurantListComponent
                  title={item.name}
                  style={styles.list}
                  restaurants={item.categorizedRestaurants}
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
                // Scroll bar for the list of categories
                <CategoryScrollBar
                  categoryList={categoryList}
                  itemId={categoryId}
                  style={styles.margin}
                  showItem={onSelectCategory}
                />
              }
              data={filterRestaurantCards}
              keyExtractor={(item, index) => item.id} // hey tell flatlist what the unique property is - by edefault it looks for item.key
              renderItem={({ item }) => (
                // RestaurantCard is each individual restaurant card that pass restarauntItem being the data that was filtered for the category, but similar to the trendingFood data

                <RestaurantCard
                  checkForStyleChange={checkForStyleChange}
                  restaurantItem={item}
                />
              )}
            />
          </>
        )}

        {isClicked === true ? <OrderButton /> : null}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  businessHeaderContainer: {
    margin: 10,
  },
  businessHeader: {
    fontSize: 20,
    fonWeight: 'bold',
  },
  selectedCategory: {
    backgroundColor: 'blue',
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
  },
  margin: {
    backgroundColor: '#f7fafa',
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
