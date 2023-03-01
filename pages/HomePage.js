/**
 * Purpose of the file: It is used to be the first page the user has access to after opening the app / login in through the app
 * - Displays business based on location or depending on the section from either the category or default sections
 */
import { StyleSheet, View, FlatList, Text } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { StatusBar } from 'expo-status-bar'
import SearchComponent from '../components/SearchComponent'
import BusinessCard from '../Cards/BusinessCard'
import BusinessListComponent from '../components/BusinessListComponent'
import CategoryScrollBar from '../components/CategoryScrollBar'
import OrderButton from '../components/OrderButton'
import { useAppSelector } from '../store/hook'
import { getButton} from '../store/slices/addToCart'
import useCategoryList from '../hooks/useCategoryList'
import useBusiness from '../hooks/useBusiness'

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

  const { trendingBusiness, business } = useBusiness()
  // access the business data
  const getBusinesss = trendingBusiness
    .map((val) => val.businessWithCategories)
    .flat()

  const isClicked = useAppSelector(getButton)
  // Copy of the business 
  let list = []

  // filter out restaraunts from every category - get restrautns from every category
  const getBusiness = business.forEach((r) => {
    // list join up with the restaurnt list
    list = list.concat(r)
  })
  // filter out business that have matching category id
  const filterBusinessCards = business.filter((i) => {
    return i.categoryId === categoryId
  })
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {/* Top header for the user to be able to display address and access items in their order */}

        <HeaderComponent />
        {/* If the category has not been selected, show the default business page */}
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
              data={getBusinesss}
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
                  data={business}
                  keyExtractor={(item, index) => item.id} // hey tell flatlist what the unique property is - by edefault it looks for item.key
                  renderItem={({ item }) => (
                    // BusinessCard is each individual business card that pass restarauntItem being the data that was filtered for the category, but similar to the trendingFood data
                    <BusinessCard
                      businesItem={item}
                      checkForStyleChange={!checkForStyleChange}
                    />
                  )}
                />
              }
              renderItem={({ item }) => (
                // renders the nested data three times -> due to having three objects in the dataToRender array
                // if no category selected, render the default treding
                <BusinessListComponent
                  title={item.name}
                  style={styles.list}
                  business={item.categorizedBusinesss}
                />
              )}
            />
          </>
        ) : (
          // screen for displaying the list of category business after changing the state of the categoryWasSelected
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
              data={filterBusinessCards}
              keyExtractor={(item, index) => item.id} // hey tell flatlist what the unique property is - by edefault it looks for item.key
              renderItem={({ item }) => (
                // BusinessCard is each individual business card that pass restarauntItem being the data that was filtered for the category, but similar to the trendingFood data

                <BusinessCard
                  checkForStyleChange={checkForStyleChange}
                  businesItem={item}
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
