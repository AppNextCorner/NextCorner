import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const OrderPlacedPage = () => {
  const navigation = useNavigation()
  const goToHome = () => {
    navigation.navigate('HomePage')
  }
  return (
    <View style={styles.orderPlacedContainer}>
      <View style={styles.alertContainer}>
        <Text>Your order has been successfully placed</Text>
        <Text>
          Your orders is being worked on. It'll take 10 minutes before it's
          ready!
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goToHome} style={styles.goHomeButton}>
            <Text style={styles.buttonText}>
              Go Back Home
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default OrderPlacedPage

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    marginHorizontal: 10,
    
  },
  alertContainer: {
    flex: 1,
  },

  orderPlacedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  goHomeButton: {
    backgroundColor: '#78DBFF',
    padding: '5%',
    paddingHorizontal: '35%',
    borderRadius: 20,
  },
})
