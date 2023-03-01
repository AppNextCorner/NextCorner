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
import { AntDesign } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import OptionSelectionComponent from '../../components/MenuComponents/OptionSelectionComponent'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import {
  getBusinessName,
  setBusinessName,
} from '../../store/slices/addToCart'
import useCart from '../../hooks/useCart'
import { auth } from '../../App'
import useOrderButton from '../../hooks/useOrderButton'
import { useState } from 'react'
import { IP } from '../../constants/ApiKeys'

export default function FoodDetailsPage() {
  const { addToCart } = useCart()
  const { setOrder, order } = useOrderButton()

  const [render, setRender] = useState(false)
  //create our options

  const dispatch = useAppDispatch()
  const route = useRoute()
  const navigation = useNavigation()
  const { business, foodItem, location} = route.params
  const businessName = useAppSelector(getBusinessName)
  // "JSON"
  useEffect(() => {
    Object.assign({}, { ...foodItem })
  }, [render])
    // Make a deep copy to make sure that we update the local properties and not the properties of the main business
  const parse = { cartData: JSON.parse(JSON.stringify(foodItem)) }
  const name = (parse || {}).cartData

  // grabbing the selection status for the customization of the menu item from the business
  const resetOptions = name.customizations
    
    .flat()
    .map((c) => c.selected)
  //   Button function solves the issue of not having to use the build in header property in the navigation component -> uses a custom navigation button instead
  const goHome = async () => {
    setOrder(true)
    try {
      navigation.goBack()
      if (order === true) {
        for (let i = 0; i < resetOptions.length; i++) {
          resetOptions[i] = false // set the status to false
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  /**
   * WIll run after the options are selected - such as if one or however much options is required to make an order
   */
  const goToCartButton = async () => {
    const userId = auth.currentUser.uid
    const addItem = name
    setOrder(true)
    // check to see if the cart already exists with a business
    if (businessName === '' || business === businessName) {
      try {
        // add the items to the cart - don't need to call another getCart items due to it showing the new data with useEffect
        await addToCart(addItem, userId, business, location)
        // change the business name of the cart page to the business name of this current item
        dispatch(setBusinessName(business))
        // reset the options selected to its default value when going back to the previous screen
        for (let i = 0; i < resetOptions.length; i++) {
          resetOptions[i] = false
        }
        navigation.goBack()
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
          <AntDesign name="arrowleft" size={40} color="white" />
        </Pressable>

        <Image style={styles.image} source={{uri:`http://${IP}:4020/${foodItem.image.toString()}`}} />

        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{foodItem.name}</Text>
            <Text style={styles.price}>${foodItem.price}</Text>
          </View>
          <Text style={styles.description}>{foodItem.description}</Text>
          {/* Reviews of item */}
          <View style={styles.ratingContainer}>
            <AntDesign
              style={styles.star}
              name="star"
              size={20}
              color="#ffc247"
            />
            <Text style={styles.ratingText}>{foodItem.rating}</Text>
            <Text style={styles.info}>Rating and reviews</Text>
            <AntDesign
              style={styles.arrowRight}
              name="arrowright"
              size={30}
              color="black"
            />
          </View>
        </View>
        <View style={styles.customizeText}>
          <Text style={styles.custom}>Customize</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* Showing off the list options for the user - passing data from route.params to our component list */}
        <View style={{ flex: 1 }}>
          <OptionSelectionComponent
            header={Header}
            data={foodItem.customizations}
            render={setRender}
            stateRender={render}
          />
        </View>

        {/* Takes in 3rd part of the whole card containing increment and decrement icons to increase or decrease the amount of one single item gets */}
        <View style={[styles.shadowOffSet, styles.buttonContainer]}>
          <TouchableOpacity
            disabled={order}
            style={styles.orderButton}
            onPress={goToCartButton}
          >
            <Text style={styles.orderButtonText}>
              Add to Cart ${foodItem.price}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  // Header styles
  info: {
    flex: 6,
  },
  arrowRight: {
    flex: 1,
    paddingHorizontal: 20,
  },
  star: {},
  ratingText: {
    paddingHorizontal: 10,
    flex: 1,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginLeft: '3%',
    margin: 5,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 4,
  },
  price: {
    flex: 1,
    fontSize: 18,
  },
  headerText: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    margin: 10,
  },
  custom: {
    margin: '5%',
    fontSize: 15,
    fontWeight: '600',
  },
  customizeText: {
    marginHorizontal: '5%',
    marginTop: '5%',
    borderColor: '#f2f0f0',
    borderWidth: 3,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: -40,

    borderColor: '#f2f0f0',
    borderStyle: 'solid',
    borderWidth: 3,
  },
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
    marginVertical: 5,
    marginHorizontal: 10,
    width: 250,
    color: '#808080',
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    marginTop: -105,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  shadowOffSet: {
    shadowOffset: { width: -2, height: 3 },
    shadowColor: '#171717',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonContainer: {
    backgroundColor: '#fff',
  },
  orderButton: {
    backgroundColor: '#78DBFF',
    margin: 15,
    padding: 15,
    borderRadius: 20,
    marginBottom: '10%',
  },
})
