import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IP } from '../../constants/StripeApiKey'
import { auth } from '../../App'

const ORDERS_URL = `http://${IP}:4020/orders/`

const createToken = async () => {
  let user = auth.currentUser
  const token = user && (await user.getIdToken())

  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return payloadHeader
}

export const addOrder = createAsyncThunk(
  'addToOrders/addOrder',
  async (order) => {
    const headers = await createToken()
    console.log('payload item: ', order)
    try {
      const resp = await axios.post(ORDERS_URL, order, headers)
      console.log('Here is response: ', resp.data)

      return resp.data
    } catch (error) {
      console.log('error')
      console.log(error)
    }
  },
)

export const getOrderList = createAsyncThunk(
  'addToOrders/getOrderList',
  async () => {
    const headers = await createToken()
    console.log('headers', headers.headers)
    try {
      console.log('Here is headers: ', headers)
      const response = await axios.get(ORDERS_URL, headers)
      console.log('Here is response data: ', response.data)
      return response.data // Return a value synchronously using Async-await
    } catch (err) {
      if (!err.response) {
        console.log(err.response)
        throw err
      }
    }
  },
)

export const updateOrderStatus = createAsyncThunk(
  'addToCart/updateOrderStatus',
  async (itemStatus) => {
    console.log('update itemStatus', itemStatus)
    console.log('update item id', itemStatus.id)
    console.log('Payload: ' + ORDERS_URL + 'order-status/' + itemStatus.id)
    const headers = await createToken()
    console.log(headers)
    try {
      const response = await axios.patch(
        ORDERS_URL + 'order-status/' + itemStatus.id,
        itemStatus,
      )
      console.log("finishede request")
      console.log('response data: ', response.data)
      return response.data
    } catch (err) {
      if (!err.response) {
        console.log(err.response)
        throw err
      }
    }
  },
)

const initialState = {
  order: [],
  total: 0,
  time: 0,
  orderItemBusinessName: '',
}

export const addToOrders = createSlice({
  name: 'addToOrders',
  initialState,

  reducers: {
    updateOrderStatusReducer: (state, {payload}) => {
        const orderItem = state.order.find((item) => item.id === payload.id)
        orderItem.orderStatus = payload.status
    },
  },

  extraReducers: (builder) => {
    // Adding an order to the order list
    builder.addCase(addOrder.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(addOrder.rejected, (state, { payload }) => {
      console.log('Rejected')
    })
    builder.addCase(addOrder.fulfilled, (state, { payload }) => {
      console.log('payload from backend', payload)
      state.order.push(payload)
      state.order.filter((item, index) => state.order.indexOf(item) === index)

      console.log('order from backend', state.order)
    })

    builder.addCase(getOrderList.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(getOrderList.rejected, (state, { payload }) => {
      console.log('Rejected')
    })
    builder.addCase(getOrderList.fulfilled, (state, { payload }) => {
      console.log('payload from backend in orders get: ', payload)
      // due to using authentication, we need to filter out the payload with each object's User id
      state.order = payload.filter(
        (uidItem) => uidItem.userId === auth.currentUser.uid,
      )
      state.order.filter((item, index) => state.order.indexOf(item) === index)
    })
    builder.addCase(updateOrderStatus.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(updateOrderStatus.rejected, (state, { payload }) => {
      console.log('Rejected', payload)
    })
    // depending if the amount is decremented one time or incrememented on the object on its data, change the visual state of the cart object accordingly
    builder.addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
      console.log('payload from backend', payload)

      
    })
  },
})
// export the reducers 
export const {
    updateOrderStatusReducer
} = addToOrders.actions

export const getOrders = (state) => state.addToOrders.order
export const getTotal = (state) => state.addToOrders.total
export const getOrderBusinessName = (state) =>
  state.addToOrders.orderItemBusinessName
export const getTime = (state) => state.addToOrders.time

export default addToOrders.reducer
