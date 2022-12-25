/**
 * Purpose of the file: It is used to be the first page the user has access to after opening the app / login in through the app
 * - Displays restaurants based on location or depending on the section from either the category or default sections
 */

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Button
} from 'react-native'
import { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { StatusBar } from 'expo-status-bar'
import SearchComponent from '../components/SearchComponent'
import RestaurantCard from '../Cards/RestaurantCard'
import RestaurantListComponent from '../components/RestaurantListComponent'
import CategoryScrollBar from '../components/CategoryScrollBar'

import useFoodItemData from '../data/useFoodItemData'
import OrderButton from '../components/OrderButton'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { getButton} from '../store/addToCart'
import { logOut} from '../store/userSession'

// firebase authentication -> grabbing the user data from firebase to use here after user is logged in
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase/firebase-config'

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: '',
  })
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const email = user.email;
      console.log(email);
      setUser(user,
        email)
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid
      // ...
    } else {
      // User is signed out
      // ...
    }
  })

  const handleSignOut = async() => {
    try {
      console.log(auth.currentUser.email);
      dispatch(logOut());
      const result = await signOut(auth);
      
      console.log("entered sign out functions");
      console.log(auth.currentUser.email);
      
    }catch (err) {
      console.log(err.message)
    }
    // add try catch if you want
    
}
const test = async() => {
  try {
    dispatch(logOut());
  } catch (err) {
    console.log(err.message)
  }
}

  // import our boilerplate data we want to display being the restaurants and category list
  const { categoryList, trendingFood} = useFoodItemData()
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
  const isClicked = useAppSelector(getButton)

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {/* Top header for the user to be able to display address and access items in their order */}

        <HeaderComponent />
        <Text>{user.email}</Text>
        <Button onPress={handleSignOut} title="Sign Out"/>
        <Button onPress={test} title="exit"/>
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
                // Scroll bar for the list of categories
                <CategoryScrollBar
                  categoryList={categoryList}
                  itemId={itemId}
                  style={styles.margin}
                  showItem={showItem}
                />
              }
              data={filterRestaurantCards}
              renderItem={({ item }) => {
                // RestaurantCard is each individual restaurant card that pass restarauntItem being the data that was filtered for the category, but similar to the trendingFood data
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
      {isClicked === true ? <OrderButton /> : null}
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
