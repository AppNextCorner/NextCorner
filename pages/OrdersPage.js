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
import { useAppSelector, useAppDispatch } from '../store/hook'

import { getOrderList, getOrders, getTime } from '../store/slices/addToOrders'

import InProgressOrderCard from '../Cards/OrderPageCards/InProgressOrderCard'
import InProgressPage from './OrdersStack/InProgressPage'
import { useNavigation } from '@react-navigation/native'
import CompletedOrderCard from '../Cards/OrderPageCards/CompletedOrderCard'

export default function OrdersPage() {
  const [orderSelection, setOrderSelection] = useState(false)
  const dispatch = useAppDispatch()

  const orderData = useAppSelector(getOrders)
  const navigation = useNavigation()
  ///const getTimeLeft = useAppSelector(getTime);
  const orderList = orderData
    .map((val) => val.singleOrderList)
    .flat()
    .map((item) => item.cartData)
  console.log(' order list')
  console.log(orderList)
  console.log(orderData.map((val) => val.id))

  const goToProgressPage = (item) => {
    navigation.navigate('InProgressOrder', { item: item })
  }

  useEffect(() => {
    dispatch(getOrderList())
    console.log(orderData)
    orderData.filter((item, index) => orderData.indexOf(item) === index)
  }, [dispatch])

  const filterCompletedData = orderData.filter(
    (item) => item.orderStatus === 'Order taking longer than expected',
  )
  const unique = [...new Map(filterCompletedData.map((m) => [m.createdAt, m])).values()];
  console.log('unique: ', unique);
  console.log(filterCompletedData)
  const filterInProgressData = orderData.filter(
    (item) => item.orderStatus === 'In Progress',
  )
  useEffect(() => {
    filterInProgressData
    filterCompletedData
  }, [orderData])

  let text = 'Lorem ipsum dol'

  const inProgress = () => {
    setOrderSelection(false)
  }
  const completedOrders = () => {
    setOrderSelection(true)
  }

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
              <TouchableOpacity
                onPress={() => inProgress()}
                style={styles.sectionButton}
              >
                <Text style={styles.sectionHeader}>In progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => completedOrders()}
                style={styles.sectionButton}
              >
                <Text style={styles.sectionHeader}>Complete</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={filterInProgressData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                console.log('Item: ', item)
                return (
                  <>
                    <TouchableOpacity onPress={() => goToProgressPage(item)}>
                      <InProgressOrderCard
                        orderTimeData={item}
                        orderItemId={item.id}
                        orderStatusData={item.orderStatus}
                      />
                    </TouchableOpacity>
                  </>
                )
              }}
            />
          </View>
        ) : (
          <View>
            <View style={styles.headerOfOrder}>
              <TouchableOpacity
                onPress={() => inProgress()}
                style={styles.sectionButton}
              >
                <Text style={styles.sectionHeader}>In progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => completedOrders()}
                style={styles.sectionButton}
              >
                <Text style={styles.sectionHeader}>Complete</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              ListFooterComponent={
                <>
                  <Text style={styles.completedPageHeader}>Completed</Text>
                </>
              }
              inverted={true}
              showsVerticalScrollIndicator={false}
              data={unique}
              style={styles.completedPageList}
              renderItem={({ item }) => {
                console.log('Item: ', item)
                return (
                  <>
                    <TouchableOpacity onPress={() => goToProgressPage(item)}>
                      <CompletedOrderCard completedOrder={item} />
                    </TouchableOpacity>
                    <View style={styles.margin}></View>
                  </>
                )
              }}
            />
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
  // margin for every card to be splitted
  margin: {
    backgroundColor: '#f2f3f5',
    flex: 1,
    paddingVertical: 5,
  },
  // header for completed page / completed page styles
  completedPageList: {
    marginHorizontal: '-2%',
  },

  completedPageHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: '5%',
    padding: '5%',
  },
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
