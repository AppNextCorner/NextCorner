/**
 * Purpose: Takes in data from the MenuListPage for a specific menu item and displays the data of that menu item here - the user should be able to select their own preference for that item
 */

import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Feather, AntDesign } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import MultipleOptionSelectedList from '../components/MultipleOptionSelectedList'
import SingleOptionSelectionComponent from '../components/SingleOptionSelectionComponent'
import useFoodItemData from '../data/useFoodItemData'
import { useAppDispatch, useAppSelector } from '../store/hook'
import addToCart, {
  decrease,
  getBusinessName,
  getCart,
  increase,
  setBusinessName,
} from '../store/slices/addToCart'
import GoogleMapsMenuSection from '../components/GoogleMapsMenuSection'
import useCart from '../hooks/useCart'
import { auth } from '../App'
import useOrderButton from '../hooks/useOrderButton'

export default function FoodDetailsPage() {
  const { addToCart, getCurrentCartItems } = useCart()
  const { setOrder, order} = useOrderButton();
  //create our options

  const dispatch = useAppDispatch()
  const route = useRoute()
  const navigation = useNavigation()
  const { business, foodItem } = route.params
  console.log('business route : ' + business)

  const businessName = useAppSelector(getBusinessName)
  const getCartItems = useAppSelector(getCart)
  // "Object.assign"
  Object.assign({}, { ...foodItem })

  // "JSON"
  const parse = { cartData: JSON.parse(JSON.stringify(foodItem)) }
  const name = (parse || {}).cartData
  //   Button function solves the issue of not having to use the build in header property in the navigation component -> uses a custom navigation button instead
  const goHome = () => {
    navigation.goBack()
  }
  /**
   * WIll run after the options are selected - such as if one or however much options is required to make an order
   */
  const goToCartButton = async () => {
    const userId = auth.currentUser.uid
    const addItem = name
    setOrder(true)
    console.log('add item: ', addItem)
    if (businessName === '' || business === businessName) {
      try {
        await addToCart(addItem, userId, business)
        console.log('business is empty')
        dispatch(setBusinessName(business))
        navigation.goBack()
        // getCurrentCartItems()
      } catch (e) {
        console.log('error')
      }
    } else {
      Alert.alert('added item from a business already')
    }
    
  }

  const onSizeChange = (sizeVal) => {
    console.log(sizeVal)
  }

  // list component for the options page
  const Header = () => {
    return (
      <>
        <Pressable style={styles.goBackButton} onPress={goHome}>
          <Feather name="arrow-left-circle" size={40} color="white" />
        </Pressable>

        <Image style={styles.image} source={foodItem.image} />
        <Text style={styles.title}>{foodItem.name}</Text>
      </>
    )
  }

  return (
    <>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* Showing off the list options for the user - passing data from route.params to our component list */}
        {/* <MultipleOptionSelectedList /> */}

        <SingleOptionSelectionComponent
          header={Header}
          optionData={foodItem.name}
          data={foodItem.options}
          onChange={onSizeChange}
        />
        {/* <View style={styles.amountContainer}>
                  <AntDesign
                    style={styles.icon}
                    name="minuscircle"
                    size={24}
                    color="#78DBFF"
                    onPress={() =>
                      dispatch(
                        decrease({
                          id: route.params.itemId,
                          
                        }),
                      )
                    }
                  />
                  <Text>{route.params.amountInCart}</Text>
                  <AntDesign
                    style={styles.icon}
                    name="pluscircle"
                    size={24}
                    color="#78DBFF"
                    onPress={() =>
                      dispatch(
                        increaseInFoodDetails({
                          // change the idea towards that of a new concatted one
                          amountInCart: route.params.amountInCart
                          
                        }),
                      )
                    }
                  />
                </View> */}

        {/* <GoogleMapsMenuSection /> */}

        <TouchableOpacity disabled={order}  style={styles.orderButton} onPress={goToCartButton}>
          <Text style={styles.orderButtonText}>
            Add to Cart {foodItem.price}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  orderButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  goBackButton: {
    zIndex: 2,
    margin: 20,
    marginTop: 40,
    flex: 1,
  },
  description: {
    flex: 0,
    backgroundColor: 'yellow',
    marginHorizontal: 20,
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: -105,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#78DBFF',
    margin: 15,
    padding: 15,
    borderRadius: 20,
    marginBottom: '20%',
  },
})
