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
} from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import MultipleOptionSelectedList from '../components/MultipleOptionSelectedList'
import SingleOptionSelectionComponent from '../components/SingleOptionSelectionComponent'
import useFoodItemData from '../data/useFoodItemData'
import { useAppDispatch } from '../store/hook'
import {  setCart } from '../store/addToCart'

export default function FoodDetailsPage() {
  //create our options
  
  const { buttonVisibility} = useFoodItemData();

  const dispatch = useAppDispatch();

  const route = useRoute()
  const navigation = useNavigation()

  //   Button function solves the issue of not having to use the build in header property in the navigation component -> uses a custom navigation button instead
  const goHome = () => {
    
    navigation.goBack()
  }
  const goToCartButton = () => {
    dispatch(setCart({
      cartData: route.params
    }))
    navigation.goBack();
  }

  useEffect(() => {
    console.log("lmao",buttonVisibility);
  },[])
  

  // list component for the options page
  const Header = () => {
    return (
      <>
        <Pressable style={styles.goBackButton} onPress={goHome}>
          <Feather name="arrow-left-circle" size={40} color="white" />
        </Pressable>

        <Image style={styles.image} source={route.params.image} />
        <Text style={styles.title}>{route.params.title}</Text>
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
          optionData={route.params.optionTitle}
          data={route.params.singularOptionSelectionList}
        />
       
        <TouchableOpacity
         style={styles.orderButton}
         onPress={goToCartButton}
         >
          <Text style={styles.orderButtonText}>Add to Cart {route.params.price}</Text>
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
  },
})
