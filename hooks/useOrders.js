import React from 'react'
import { View, StyleSheet } from 'react-native'
import { auth } from '../App'
import { useAppDispatch, useAppSelector } from '../store/hook'
import {
  addOrder,
  getOrderList,
  getTime,
  getOrders,
  updateOrderStatus,
  updateOrderStatusReducer
} from '../store/slices/addToOrders'

const UseOrders = () => {
  const dispatch = useAppDispatch()

  const orders = useAppSelector(getOrders)

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
      .map((time) => time.timeToMake * time.amountInCart)

    let sum = orderItemTimes.reduce(function (a, b) {
      return a + b
    })

    console.log("sum", sum)
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

  const updateOrder = async (updatedStatus, timeLeft) => {
    
      console.log('run updateOrderStatus')

      const itemStatus = {
        status: updatedStatus.orderStatus,
        id: updatedStatus.id,
      }
      console.log('item status: ' + itemStatus.status)

    //   if (timeLeft === 0) {
        // dispatch the update staatus and pas in item id
      try{
        // change the state
        dispatch(updateOrderStatusReducer(itemStatus))
        // send in axios put request
        dispatch(updateOrderStatus(itemStatus))
        console.log('dispatch update order status')
      //}
    } catch (e) {
      console.log(e)
    }
  }

  return {
    addCartToOrder,
    getCurrentOrder,
    updateOrder,
  }
}

export default UseOrders
