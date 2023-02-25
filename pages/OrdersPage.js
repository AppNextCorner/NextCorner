/**
 * Purpose of the file: It is used to display the current food items the user has selected after exiting from the foodDetails page and selecting their preference
 */

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hook'
import { getOrderList, getOrders } from '../store/slices/addToOrders'
import InProgressOrderCard from '../Cards/OrderPageCards/InProgressOrderCard'
import { useNavigation } from '@react-navigation/native'
import CompletedOrderCard from '../Cards/OrderPageCards/CompletedOrderCard'

export default function OrdersPage() {
  const [orderSelection, setOrderSelection] = useState(false)
  const dispatch = useAppDispatch()

  const orderData = useAppSelector(getOrders)
  const navigation = useNavigation()

  const orderList = orderData
    .map((val) => val.singleOrderList)
    .flat()
    .map((item) => item.cartData)

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

  // removes duplicated order cards - shows key warning still
  const unique = [
    ...new Map(filterCompletedData.map((m) => [m.createdAt, m])).values(),
  ] // grab the creation time of the order
  const filterInProgressData = orderData.filter(
    (item) => item.orderStatus === 'In Progress',
  )
  useEffect(() => {
    filterInProgressData
    filterCompletedData
  }, [orderData])

  const inProgress = () => {
    setOrderSelection(false)
  }
  const completedOrders = () => {
    setOrderSelection(true)
  }
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
              ListHeaderComponent={
                <>
                  <Text style={styles.completedPageHeader}>Completed</Text>
                </>
              }
              showsVerticalScrollIndicator={false}
              data={unique}
              style={styles.completedPageList}
              renderItem={({ item }) => {
                return (
                  <>
                    <Pressable>
                      <CompletedOrderCard completedOrder={item} />
                    </Pressable>
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
