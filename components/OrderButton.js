import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { getCart, setBusinessName } from '../store/slices/addToCart'
import { useAppDispatch, useAppSelector } from '../store/hook'

const OrderButton = () => {
  
  const navigation = useNavigation()
  const dispatch = useAppDispatch();
  const cartList = useAppSelector(getCart);
  const waitForCartToFill = () => {
    dispatch(setBusinessName(cartList[0].businessOrderedFrom))
    cartList.filter((item, index) => cartList.indexOf(item) === index)
   
  }
 
  const goToCartButton = async() => {
    try{
      await waitForCartToFill();
      
      // if(change === false){
      //   console.log("Please wait");
      //   navigation.navigate('Cart')
      // }
        navigation.navigate('Cart')

      
    } catch(err){
      console.error(err);
    }
    
    // setTimeout(function () {
      
    // }, 50)
    
  }

  
  if(cartList.length > 0){
    return (
      // <Text>Hello</Text>
      <View style={styles.orderButtonContainer}>
      <TouchableOpacity style={styles.orderButton} onPress={goToCartButton}>
        <Text style={styles.orderButtonText}>View Cart</Text>
      </TouchableOpacity>
      </View>
    )
  }

  
}

const styles = StyleSheet.create({
  orderButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButton: {
    backgroundColor: '#78DBFF',
    padding: '3%',
    borderRadius: 20,
    paddingHorizontal: '30%',
    marginTop: '-20%'
  },
  orderButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,

    padding: '5%',
    justifyContent: 'center',
  },
  
})

export default OrderButton
