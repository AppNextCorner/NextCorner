import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

const OrderButton = () => {
  const navigation = useNavigation()
  const goToCartButton = () => {
    navigation.navigate('Cart')
  }

  return (
    <View style={styles.orderButtonContainer}>
    <TouchableOpacity style={styles.orderButton} onPress={goToCartButton}>
      <Text style={styles.orderButtonText}>View Cart</Text>
    </TouchableOpacity>
    </View>
  )
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
