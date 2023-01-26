/**
 * Purpose of the file: It is used to display the current food items the user has selected after exiting from the foodDetails page and selecting their preference
 * - Work in Progess -> needs to completed in terms of passing data from the FoodDetails page and need to display both components of current and completed order
 */

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../store/hook'

import { getOrders } from '../store/slices/addToOrders'

export default function OrdersPage() {
  const { orderSelection, setOrderSelection } = useState(false)

  const orderData = useAppSelector(getOrders)
  const orderList = orderData.map((val) => val.singleOrderList).flat().map(item => item.cartData)
  console.log(' order list')
  console.log(orderList)

  let text = 'Lorem ipsum dol'

  let limitTextAmount = text.slice(0, 75) + ''
  let randomId = Math.floor(Math.random() * 10) + 1
  return (
    <View style={styles.orderPageContainer}>
      <Text style={styles.headerText}>Your Orders</Text>
      {/* Store two components aligned center and switch betweeen the two */}
      <View style={styles.orderTypeContainer}>
        {orderSelection !== true ? (
          <View>
            <View style={styles.headerOfOrder}>
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionHeader}>In progress</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionHeader}>Complete</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={orderList}
              renderItem={({ item }) => {
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
                            source={item.image}
                          />
                        </View>
                        <View style={styles.foodTexts}>
                          <Text style={styles.categoryText}>{item.name}</Text>
                          <Text style={styles.descriptionOfItem}>
                            {limitTextAmount}
                          </Text>
                          <Text style={styles.priceText}>{item.price}</Text>
                        </View>

                        {/* Takes in 3rd part of the whole card containing increment and decrement icons to increase or decrease the amount of one single item gets */}
                        <View style={styles.amountContainer}>
                          <Text>{item.amountInCart}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                )
              }}
            />
            
          </View>
        ) : (
          <View>
            <View style={styles.headerOfOrder}>
              <Text style={styles.sectionHeader}>In progress</Text>
              <Text style={styles.sectionHeader}>Complete</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
  // return (
  //   // <View>
  //   //   <Text>OrdersPage</Text>

  //   //   <Button
  //   //     onPress={() => {
  //   //       setOrderType((orderType) => {
  //   //         return {
  //   //           ...orderType,
  //   //           name: 'InProgress',
  //   //         }
  //   //       })
  //   //       console.log(orderType.name)
  //   //     }}
  //   //     title="Lol"
  //   //   />
  //   //   <Button
  //   //     onPress={() => {
  //   //       setOrderType((orderType) => {
  //   //         return {
  //   //           ...orderType,
  //   //           name: 'Done',
  //   //         }
  //   //       })
  //   //       console.log(orderType.name)
  //   //     }}
  //   //     title="Done"
  //   //   />
  //   //   <FlatList
  //   //     data={orderType}
  //   //     renderItem={({ item }) => {
  //   //       console.log('Among Us ' + item.name)
  //   //       if (item.name == 'Done') {
  //   //         return <Text style={styles.text}>Hello World</Text>
  //   //       } else {
  //   //         return <Text>Descpi</Text>
  //   //       }
  //   //     }}
  //   //     keyExtractor={(item) => item.id}
  //   //   />

  //   //   {/* 2 column list to navigate easily between in progress and completed orders */}
  //   //   <View></View>
  //   // </View>
  //   <View>
  //     <ScrollView>
  //       <View
  //         style={{
  //           padding: 10,
  //           width: '100%',
  //           backgroundColor: '#000',
  //           height: 150,
  //         }}
  //       >
  //         <TouchableOpacity>
  //           <Image
  //             source={require('../assets/restaurantImages/redFoodCart.png')}
  //             style={{ width: 30, height: 30 }}
  //           ></Image>
  //           <View></View>
  //           <View></View>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={{ alignItems: 'left' }}>
  //         <Image
  //           source={require('../assets/restaurantImages/redFoodCart.png')}
  //           style={{
  //             width: 140,
  //             height: 140,
  //             borderRadius: 100,
  //             marginTop: -70,
  //           }}
  //         ></Image>
  //         <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>
  //           {' '}
  //           Ralph Lopez{' '}
  //         </Text>
  //         <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}>
  //           {' '}
  //           Ralph90062@gmail.com{' '}
  //         </Text>
  //       </View>
  //       <TouchableOpacity
  //         style={{
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           flexDirection: 'row',
  //           backgroundColor: 'white',
  //           width: '90%',
  //           padding: 20,
  //           borderRadius: 10,
  //           marginTop: 20,
  //           shadowOpacity: 80,
  //           elevation: 15,
  //         }}
  //       >
  //         <Image
  //           source={require('../assets/restaurantImages/redFoodCart.png')}
  //           style={{ width: 30, height: 30 }}
  //         ></Image>
  //         <Text
  //           style={{
  //             fontSize: 15,
  //             color: '#818181',
  //             fontWeight: 'bold',
  //             marginLeft: 10,
  //           }}
  //         >
  //           {' '}
  //           Profile{' '}
  //         </Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         style={{
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           flexDirection: 'row',
  //           backgroundColor: 'white',
  //           width: '90%',
  //           padding: 20,
  //           borderRadius: 10,
  //           marginTop: 20,
  //           shadowOpacity: 80,
  //           elevation: 15,
  //           marginBottom: 40,
  //         }}
  //       >
  //         <Image
  //           source={require('../assets/restaurantImages/redFoodCart.png')}
  //           style={{ width: 30, height: 30 }}
  //         ></Image>
  //         <Text
  //           style={{
  //             fontSize: 15,
  //             color: '#818181',
  //             fontWeight: 'bold',
  //             marginLeft: 10,
  //           }}
  //         >
  //           {' '}
  //           Profile{' '}
  //         </Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         style={{
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           flexDirection: 'row',
  //           backgroundColor: 'white',
  //           width: '90%',
  //           padding: 20,
  //           borderRadius: 10,
  //           marginTop: 20,
  //           shadowOpacity: 80,
  //           elevation: 15,
  //           marginBottom: 40,
  //           backgroundColor: 'blue',
  //         }}
  //       >
  //         <Text
  //           style={{
  //             fontSize: 15,
  //             color: '#fff',
  //             fontWeight: 'bold',
  //             marginLeft: 10,
  //           }}
  //         >
  //           {' '}
  //           Logout{' '}
  //         </Text>
  //       </TouchableOpacity>
  //     </ScrollView>
  //   </View>
  // )
}

const styles = StyleSheet.create({
  sectionButton: {},
  // header
  amountContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
  },
  sectionHeader: {
    marginHorizontal: '15%',
    fontWeight: 'bold',
    backgroundColor: '#f2f5f5',
    textAlign: 'center',
    paddingVertical: '5%',
  },
  headerOfOrder: {
    flexDirection: 'row',
    marginBottom: '10%',
  },
  orderTypeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  orderPageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    margin: '10%',
    marginTop: '30%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  // Card styles
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
    width: '20%',
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
