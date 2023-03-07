import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
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
      getCartOption.filter((item, index) => getCartOption.indexOf(item) === index)
    } else {
      Alert.alert("Buy some items to proceed...")
      //console.log('Buy some items to proceed...')
    }
  }
 
  const goToCartButton = async() => {
    try{
     // await waitForCartToFill();
      
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

  
  if(getCartOption.length > 0){
    return (
      // <Text>Hello</Text>
      <View style={styles.orderButtonContainer}>
      <TouchableOpacity style={styles.orderButton} onPress={() => navigateCart()}>
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
    //paddingBottom: '10%'
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
