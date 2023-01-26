/**
 * Purpose: After user has selected items, then this screen would be updated to include the selected items
 * note: Total number of selected items, price, etc will need to be added here
 */

import React, { useEffect } from 'react'

import {
  getBusinessName,
  getCart,
  orderPlaced,
  setBusinessName,
} from '../store/slices/addToCart'
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
import { calculateTotals } from '../store/slices/addToCart'
import useCart from '../hooks/useCart'
/**
 *
 * Remove from items cart list
 * Add to order page
 */

const CartPage = () => {
  const { updateCartItemData } = useCart()
  const dispatch = useAppDispatch()
  // navigation part of the screen
  const navigation = useNavigation()
  const goHome = () => {
    navigation.goBack()
    dispatch(orderPlaced())
  }
  const goToPayment = () => {
    navigation.navigate('PaymentDetails')
    dispatch(calculateTotals())
  }

  const isCartFull = useAppSelector(getCart)
  const businessName = useAppSelector(getBusinessName)
  console.log('isCartFull', isCartFull)
  //isCartFull.filter((item,
  //index) => isCartFull.indexOf(item) === index);

  useEffect(() => {
    if (isCartFull.length === 0) {
      console.log('empty cart')
      dispatch(setBusinessName(''))
      isCartFull.filter((item, index) => isCartFull.indexOf(item) === index)
    } else if (isCartFull.length > 0) {
      isCartFull.filter((item, index) => isCartFull.indexOf(item) === index)
    }
  }, [isCartFull, dispatch])

  let text = 'Lorem ipsum dol'

  let limitTextAmount = text.slice(0, 75) + ''
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Pressable style={styles.goBackButton} onPress={goHome}>
        <Feather name="arrow-left-circle" size={40} color="black" />
      </Pressable>

      <FlatList
        ListHeaderComponent={() => {
          return <Text>Ordered from: {businessName}</Text>
        }}
        data={isCartFull}
        renderItem={({ item }) => {
          const grabCartItem = item.cartData
          console.log(grabCartItem)
          return (
            <>
              {/* Display cards added */}
              <TouchableOpacity
                disabled={true}
                style={styles.foodCategoryStyle}
              >
                <View style={styles.card}>
                  <View style={styles.imageBox}>
                    <Image
                      style={styles.foodImages}
                      source={grabCartItem.image}
                    />
                  </View>
                  <View style={styles.foodTexts}>
                    <Text style={styles.categoryText}>{grabCartItem.name}</Text>
                    <Text style={styles.descriptionOfItem}>
                      {limitTextAmount}
                    </Text>
                    <Text style={styles.priceText}>{grabCartItem.price}</Text>
                  </View>

                  {/* Takes in 3rd part of the whole card containing increment and decrement icons to increase or decrease the amount of one single item gets */}
                  <View style={styles.amountContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="minuscircle"
                      size={24}
                      color="#78DBFF"
                      onPress={() => {
                        // console.log('dispatch')
                        const updatedCartItem = {
                          ...grabCartItem,
                          amountInCart: (grabCartItem.amountInCart -= 1),
                        }
                        console.log('Item id: ', item.id)
                        //console.log(updatedCartItem)
                        updateCartItemData({
                          updatedCartItem: updatedCartItem,
                          id: item.id,
                        })
                        // dispatch(
                        //   updateCartItem({

                        //   }),
                        // )
                      }}
                    />
                    <Text>{grabCartItem.amountInCart}</Text>
                    <AntDesign
                      style={styles.icon}
                      name="pluscircle"
                      size={24}
                      color="#78DBFF"
                      onPress={() => {
                        const updatedCartItem = {
                          ...grabCartItem,
                          amountInCart: (grabCartItem.amountInCart += 1),
                        }
                        console.log('Item id: ', item.id)
                        //console.log(updatedCartItem)
                        updateCartItemData({
                          updatedCartItem: updatedCartItem,
                          id: item.id,
                        })
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )
        }}
      />

      <View>
        <View style={styles.bottomButtons}>
          <View style={styles.addItemsButtonContainer}>
            <TouchableOpacity style={styles.addItemsButton}>
              <Text>Add More Items</Text>
            </TouchableOpacity>
          </View>
          {/* Payment button */}
          <View style={styles.proceedToPaymentContainer}>
            <TouchableOpacity
              onPress={() => goToPayment()}
              style={styles.proceedToPaymentButton}
            >
              <Text style={styles.proceedToPaymentText}>
                Proceed to payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
export default CartPage

const styles = StyleSheet.create({
  bottomButtons: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  addItemsButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: '1%',
  },
  addItemsButton: {
    backgroundColor: '#DFDFDF',
    padding: '4%',
    borderRadius: 20,
  },
  proceedToPaymentText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  proceedToPaymentButton: {
    backgroundColor: '#78DBFF',
    padding: '5%',
    borderRadius: 20,
    paddingHorizontal: '30%',
  },
  proceedToPaymentContainer: {
    alignItems: 'center',
    marginTop: '40%',
    marginBottom: '6%',
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
    marginBottom: -0.1,
    marginTop: 0,
  },
})
