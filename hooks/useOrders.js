import React from 'react'
import { View, StyleSheet } from 'react-native'
import { auth } from '../App'
import { useAppDispatch } from '../store/hook'
import { addOrder, getOrderList } from '../store/slices/addToOrders'

const UseOrders = () => {
  const dispatch = useAppDispatch()

  const getCurrentOrder = async () => {
    try {
      await dispatch(getOrderList())
    } catch (err) {
      console.error('Failed to save the post', err)
    }
  }

  const addCartToOrder = async (singleOrderList) => {
    console.log('list: ', singleOrderList)
    const orderItemTimes = singleOrderList
      .map((order) => order.cartData)
      .map((time) => time.timeToMake)

    let sum = orderItemTimes.reduce(function (a, b) {
      return a + b
    })

    console.log(sum)
    console.log('orderItemTimes: ', orderItemTimes)
    const orderList = {
      singleOrderList: singleOrderList,
      timer: sum,
      orderStatus: 'In Progress',
      userId: auth.currentUser.uid,
    }
    try {
      await dispatch(addOrder(orderList))
    } catch (e) {
      console.log(e)
    }
  }

  return {
    addCartToOrder,
    getCurrentOrder,
  }
}

export default UseOrders
