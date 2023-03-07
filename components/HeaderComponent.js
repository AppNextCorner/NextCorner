/**
 * Purpose of the component: It is going to display the user's location and as well as a clickable icon to navigate through the order page to show the user their orders
 */

import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import HomeIcon from '../assets/icon/nextCornerLogo.png'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { getCart, setBusinessName } from '../store/slices/addToCart'

export default function HeaderComponent() {
  const navigation = useNavigation()
  const getCartOption = useAppSelector(getCart)
  const dispatch = useAppDispatch()

  const navigateCart = () => {
    if (getCartOption.length > 0) {
      //;
      navigation.navigate('Cart')
      dispatch(setBusinessName(getCartOption[0].businessOrderedFrom))
      getCartOption.filter((item, index) => getCartOption.indexOf(item) === index)
    } else {
      Alert.alert("Buy some items to proceed...")
      //console.log('Buy some items to proceed...')
    }
  }

  // useEffect(() => {
  //   navigateCart()
  // }, [])
  return (
    <View style={styles.header}>
      <Image style={styles.nextCornerIcon} source={HomeIcon} />
      <Text style={styles.address}>2167 w ave</Text>
      <View>
        <FontAwesome5
          onPress={() => navigateCart()}
          style={styles.shoppingIcon}
          name="shopping-basket"
          size={24}
          color="black"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nextCornerIcon: {
    marginTop: 2,
  },
  shoppingIcon: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  address: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop: '15%',
    paddingHorizontal: 50,
    paddingBottom: '5%',
  },
})
