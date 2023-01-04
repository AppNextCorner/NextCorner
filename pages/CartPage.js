/**
 * Purpose: After user has selected items, then this screen would be updated to include the selected items
 * note: Total number of selected items, price, etc will need to be added here
 */

import React from 'react'

import { getCart } from '../store/addToCart'
import { useAppSelector } from '../store/hook'
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
  Button,
} from 'react-native'
import { useAppDispatch } from '../store/hook'
import { increase, decrease, calculateTotals } from '../store/addToCart'
import { getAmount } from '../store/addToCart'
const CartPage = () => {
  const dispatch = useAppDispatch()
  // navigation part of the screen
  const navigation = useNavigation()
  const goHome = () => {
    navigation.goBack()
  }
  const goToPayment = () => {
    navigation.navigate('PaymentDetails')
  }

  const isCartFull = useAppSelector(getCart)

  const cartList = isCartFull.map((val) => val.cartData)
  console.log(cartList)
  let text = 'Lorem ipsum dol'

  let limitTextAmount = text.slice(0, 75) + ''
  let randomId = Math.floor(Math.random() * 10) + 1

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Pressable style={styles.goBackButton} onPress={goHome}>
        <Feather name="arrow-left-circle" size={40} color="black" />
      </Pressable>
      <FlatList
        data={cartList}
        renderItem={({ item }) => (
          <>
            {/* Display cards added */}
            <TouchableOpacity disabled={true} style={styles.foodCategoryStyle}>
              <View style={styles.card}>
                <View style={styles.imageBox}>
                  <Image
                    style={styles.foodImages}
                    source={item.menuItemImage}
                  />
                </View>
                <View style={styles.foodTexts}>
                  <Text style={styles.categoryText}>{item.menuItemName}</Text>
                  <Text style={styles.descriptionOfItem}>
                    {limitTextAmount}
                  </Text>
                  <Text style={styles.priceText}>{item.menuItemPrice}</Text>
                </View>

                {/* Takes in 3rd part of the whole card containing increment and decrement icons to increase or decrease the amount of one single item gets */}
                <View style={styles.amountContainer}>
                  <AntDesign
                    style={styles.icon}
                    name="minuscircle"
                    size={24}
                    color="#78DBFF"
                    onPress={() =>
                      dispatch(
                        decrease({
                          id: item.menuItemId,
                          type: randomId,
                        }),
                      )
                    }
                  />
                  <Text>{item.menuItemCartAmount}</Text>
                  <AntDesign
                    style={styles.icon}
                    name="pluscircle"
                    size={24}
                    color="#78DBFF"
                    onPress={() =>
                      dispatch(
                        increase({
                          // change the idea towards that of a new concatted one
                          id: item.menuItemId,
                          type: randomId,
                        }),
                      )
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
      />
      <View>
        
      </View>
      <View style={styles.proceedToPaymentContainer}>
        <TouchableOpacity onPress={goToPayment} style={styles.proceedToPaymentButton}>
          <Text style={styles.proceedToPaymentText}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default CartPage

const styles = StyleSheet.create({
  proceedToPaymentText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,

    padding: '5%',
    justifyContent: 'center',
  },
  proceedToPaymentButton: {
    marginTop: '25%',
    backgroundColor: '#78DBFF',
    padding: '3%',
    borderRadius: 20,
    paddingHorizontal: '25%',
  },
  proceedToPaymentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
  },
  icon: {
    margin: 10,
  },
  goBackButton: {
    margin: '10%',
  },
  descriptionOfItem: {
    flex: 1,
    fontSize: 10,

    //fontFamily: 'monospace',
  },
  imageBox: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
    flex: 1,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: 'bold',
    //fontFamily: 'monospace',
    marginTop: 15,
    flex: 1,
  },
  foodImages: {
    width: '50%',
    flex: 1,

    // Increase the image size
    padding: '30%',
    marginLeft: 25,
    marginTop: '18%',
    marginBottom: '70%',
    borderRadius: 10,
  },
  card: {
    width: 250,
    height: 115,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  priceText: {
    flex: 1,
    alignContent: 'flex-end',
    color: '#97989F',
    marginTop: 0,
  },
  foodTexts: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 5,
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderStyle: 'solid',

    borderBottomWidth: 1,
    //marginHorizontal: 10,
    marginBottom: -0.1,
    marginTop: 0,
  },
})
