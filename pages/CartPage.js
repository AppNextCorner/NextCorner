/**
 * Purpose: After user has selected items, then this screen would be updated to include the selected items
 * note: Total number of selected items, price, etc will need to be added here
 */

import React from 'react'

import { getCart } from '../store/addToCart'
import { useAppSelector } from '../store/hook'

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
import { useEffect } from 'react'
import { calculateTotals } from '../store/addToCart'
import { useAppDispatch } from '../store/hook'
import { increase } from '../store/addToCart'
import { getAmount } from '../store/addToCart'
const CartPage = () => {
  const dispatch = useAppDispatch()

  const navigation = useNavigation()
  const goHome = () => {
    navigation.goBack()
  }
  const isCartFull = useAppSelector(getCart)
  const amount = useAppSelector(getAmount)
  const cartList = isCartFull.map((val) => val.cartData)
  console.log(cartList)
  let text = 'Lorem ipsum dol'

  let limitTextAmount = text.slice(0, 75) + ''

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Button title="Button" onPress={goHome} />
      <FlatList
        data={cartList}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('FoodDetails', item)}
              style={styles.foodCategoryStyle}
            >
              <View style={styles.card}>
                <View style={styles.imageBox}>
                  <Image style={styles.foodImages} source={item.image} />
                </View>
                <View style={styles.foodTexts}>
                  <Text style={styles.categoryText}>{item.title}</Text>
                  <Text style={styles.descriptionOfItem}>
                    {limitTextAmount}
                  </Text>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
                {/* Store image with button  */}
                <Button
                  title="Increment"
                  onPress={() => {
                    console.log(item.itemId)
                    dispatch(
                      increase({
                        id: item.itemId,
                      }),
                    )
                  }}
                />
                <Text style={{ flex: 1, textAlign: 'center', top: 50 }}>
                  {amount}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      />
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  )
}
export default CartPage

const styles = StyleSheet.create({
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
