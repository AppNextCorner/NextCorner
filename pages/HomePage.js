/**
 * Purpose of the file: It is used to be the first page the user has access to after opening the app / login in through the app
 * - Displays restaurants based on location or depending on the section from either the category or default sections
 */

import { StyleSheet, View, FlatList, Text, Button } from 'react-native'
import { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { StatusBar } from 'expo-status-bar'
import SearchComponent from '../components/SearchComponent'
import RestaurantCard from '../Cards/RestaurantCard'
import RestaurantListComponent from '../components/RestaurantListComponent'
import CategoryScrollBar from '../components/CategoryScrollBar'
import OrderButton from '../components/OrderButton'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { getButton, getCart } from '../store/slices/addToCart'
import { logOut } from '../store/slices/userSession'
import useCategoryList from '../hooks/useCategoryList'
import useRestaurants from '../hooks/useRestaurants'
import useGetUserData from '../hooks/useGetUserData'

import { auth } from '../App'

// firebase authentication -> grabbing the user data from firebase to use here after user is logged in
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default function HomePage() {
  const dispatch = useAppDispatch()

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

  // auth.currentUser.getIdToken().then((token) => console.log(token))

  const handleSignOut = async () => {
    try {
      console.log(auth.currentUser.email)
      dispatch(logOut())
      const result = await signOut(auth)

      console.log('entered sign out functions')
      console.log(auth.currentUser.email)
    } catch (err) {
      console.log(err.message)
    }
    // add try catch if you want
  }
  const test = async () => {
    try {
      await dispatch(logOut())
    } catch (err) {
      console.log(err.message)
    }
  }

  // // the data we want to render is stored in the state variable, so we need to map through the data to pinpoint the category array containing the data of each card

  // // after we have the category selected, we need to set the selected value equal to the value of the selected item with the selected item ID and compare it with the category selected id value

  const isClicked = useAppSelector(getButton)
  const isCartFull = useAppSelector(getCart)
  console.log(isCartFull)
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
        {/* <Text>{user.email}</Text> */}
        <Button onPress={handleSignOut} title="Sign Out" />
        <Button onPress={test} title="exit" />

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
        {/* <Button onPress={handleSignOut} title="Sign Out"/>
        <Button onPress={test} title="exit"/> */}
      </View>
    </>
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
