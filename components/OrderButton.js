import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { getCart, setBusinessName } from '../store/slices/addToCart'
import { useAppDispatch, useAppSelector } from '../store/hook'

const OrderButton = () => {
  const navigation = useNavigation()
  const getCartOption = useAppSelector(getCart)
  const dispatch = useAppDispatch()

  const navigateCart = () => {
    if (getCartOption.length > 0) {
      //;
      navigation.navigate('Cart')
      dispatch(setBusinessName(getCartOption[0].businessOrderedFrom))
      getCartOption.filter(
        (item, index) => getCartOption.indexOf(item) === index,
      )
    } else {
      Alert.alert('Buy some items to proceed...')
      //console.log('Buy some items to proceed...')
    }
  }

  if (getCartOption.length > 0) {
    return (
      // <Text>Hello</Text>

      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => navigateCart()}
      >
        <View style={styles.orderButtonContainer}>
          <Text style={styles.orderButtonText}>View Cart</Text>
          <Text style={styles.cartLengthText}>{getCartOption.length}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cartLengthText: {
    color: 'white',
    fontSize: 14,
    paddingBottom: '10%',
    flex: 0.5,
    textAlign: 'center',
    paddingTop: '5%',
    borderRadius: 25,
    borderWidth: 5,

    borderColor: '#fff',
    padding: '5%',
  },
  orderButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    backgroundColor: '#78DBFF',
    padding: '8%',
    borderRadius: 20,
    margin: '5%',
    marginTop: '-20%',
    flex: 1,
  },
  orderButtonText: {
    flex: 7,
    color: 'white',
    paddingBottom: '5%',
    fontSize: 15,
    fontWeight: 'bold',
  },
})

export default OrderButton
