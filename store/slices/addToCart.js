/**
 * Purpose of file: used to send requests to our server and be able to receive and display the results throughout our application for the user's cart items only
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IP } from '../../constants/ApiKeys'
import { auth } from '../../App'

const POSTS_URL = `http://${IP}:4020/api/`

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

export const deleteItem = createAsyncThunk(
  'addToCart/deleteItem',
  async (cartItem) => {
    try {
      const response = await axios.delete(
        POSTS_URL + 'delete-item/' + cartItem.id,
        // headers,
      )
      return response.data // Return a value synchronously using Async-await
    } catch (err) {
      if (!err.response) {
        console.log(err.response)
        throw err
      }
    }
  },
)

export const fetchCart = createAsyncThunk('addToCart/fetchCart', async () => {
  const headers = await createToken()
  try {
    const response = await axios.get(POSTS_URL, headers)
    return response.data // Return a value synchronously using Async-await
  } catch (err) {
    if (!err.response) {
      console.log(err.response)
      throw err
    }
  }
})

export const updateCartItemAmount = createAsyncThunk(
  'addToCart/updateCartItemAmount',
  async (cartItem) => {
    try {
      const response = await axios.put(
        POSTS_URL + 'item-amount/' + cartItem.id,
        cartItem.updatedItem,
      )
      return response.data
    } catch (err) {
      if (!err.response) {
        console.log(err.response)
        throw err
      }
    }
  },
)

export const updateRemoveCartItemAmount = createAsyncThunk(
  'addToCart/updateRemoveCartItemAmount',
  async (cartItem) => {
    try {
      const response = await axios.put(
        POSTS_URL + 'item-amount/' + cartItem.id,
        cartItem.updatedItem,
      )

      return response.data
    } catch (err) {
      if (!err.response) {
        console.log(err.response)
        throw err
      }
    }
  },
)

export const addNewCartItem = createAsyncThunk(
  'addToCart/addNewCartItem',
  async (cartItem) => {
    const headers = await createToken()
    try {
      const resp = await axios.post(POSTS_URL, cartItem, headers)

      return resp.data
    } catch (error) {
      console.log('error')
      console.log(error)
    }
  },
)

// setting the de fault state for the app
const initialState = {
  cartButton: false, // user is not logged in by default
  cart: [],
  order: [],
  total: 0,
  businessName: '',
}

// create a slice object to store the state -> creates action creators for each case inside reducers and can safely mutate the state
export const addToCart = createSlice({
  // prefix for generated action types
  name: 'addToCart',
  // initial state of the reducer
  initialState,
  // object where the keys are strings and the values are functions that handle specific actions
  reducers: {
    setBusinessName: (state, { payload }) => {
      state.businessName = payload
    },
    setOrder: (state, { payload }) => {
      let removeCart = state.cart.splice(0, state.cart.length)
      let order = state.order.push(payload.order)
      state.cartButton = false
    },
    addItem: (state, { payload }) => {
      state.cart = state.cart.push(payload)
    },
    // case reducer functions
    // action is what values we want to assign the state to and receive it from payload
    setCart: (state, action) => {

      // when user logs in, update logged in state by assigning it a new value -> could do more actions such as push to an array, but it all depends on the data type and current state

      // assign the null value of the user to the value we get from the setUser dispatch method
      const mapCart = state.cart.map((itemList) => itemList.cartData)

      const mapCartMenuItem = mapCart.map((item) => item.customizations).flat()
      console.log('HERE IS OPTIONS', mapCartMenuItem)
      console.log('payload of customizations', action.payload.customizations)

      const cartItem = mapCart.find((item) => item.itemId === action.payload.id)
      const index = mapCart.indexOf(cartItem)
      if (index > -1) {
        cartItem.amountInCart += 1
        // only splice array when item is found
        mapCart.splice(index, 1) // 2nd parameter means remove one item only
      } else {
        state.cart.push(action.payload)
      }

      if (state.cart.length > 0) {
        state.cartButton = true
      } else {
        state.cartButton = false
      }

    },
    orderPlaced: (state) => {
      // when user logs in, update logged in state
      if (state.cart.length == 0) {
        state.cartButton = false
      } else {
        state.cartButton = true
      }
    },

    increaseInFoodDetails: (state, { payload }) => {
      payload.amountInCart += 1
     
    },

    increase: (state, { payload }) => {
      // get the data of each object in the state array
      const mapCart = state.cart.map((itemList) => itemList.cartData)
      //
      const cartItem = mapCart.find((item) => item.itemId === payload.id)
      cartItem.amountInCart += 1
    },
    // status: completed
    deleteItemReducer: (state, { payload }) => {
      const cartItem = state.cart.find((item) => item.id === payload.id)
      // function to remove the item from the state array with the find index method
      function removeObjectWithId(arr, id) {
        //const mapAnotherCart = arr.map((item) => item.cartData)
        // find the index of the item in the array that the item belongs to with the given id from the payload
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id)
        // confirm if the item exists in the array
        if (objWithIdIndex > -1) {
          // if the item is already in the array, remove it from the array with the index found
          arr.splice(objWithIdIndex, 1)
        }
        // mutated the array to avoid copying the original / modified array
        return arr
      }
      // checks if the object property is below or over 1 to either eliminate it from the array with the removeObjectWithId function
      if (cartItem.cartData.amountInCart - 1 < 1) {
        // pass the global state to the removeObjectWithId function to mutate the array and the payload if to remove the item from the array
        removeObjectWithId(state.cart, payload.id)
      }
    },
    deleteItemAfterOrder: (state, { payload }) => {
      // function to remove the item from the state array with the find index method
      function removeObjectWithId(arr, id) {
        //const mapAnotherCart = arr.map((item) => item.cartData)
        // find the index of the item in the array that the item belongs to with the given id from the payload
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id)
        // confirm if the item exists in the array
        if (objWithIdIndex > -1) {
          // if the item is already in the array, remove it from the array with the index found
          arr.splice(objWithIdIndex, 1)
        }
        // mutated the array to avoid copying the original / modified array
        return arr
      }

      // pass the global state to the removeObjectWithId function to mutate the array and the payload if to remove the item from the array
      removeObjectWithId(state.cart, payload.id)
    },
    decrease: (state, { payload }) => {
      // get the data of each object in the state array
      const mapCart = state.cart.map((itemList) => itemList.cartData)
      //
      const cartItem = mapCart.find((item) => item.itemId === payload.id)
      // function to remove the item from the state array with the find index method
      function removeObjectWithId(arr, id) {
        const mapAnotherCart = arr.map((item) => item.cartData)
        // find the index of the item in the array that the item belongs to with the given id from the payload
        const objWithIdIndex = mapAnotherCart.findIndex(
          (obj) => obj.itemId === id,
        )
        // confirm if the item exists in the array
        if (objWithIdIndex > -1) {
          // if the item is already in the array, remove it from the array with the index found
          arr.splice(objWithIdIndex, 1)
        }
        // mutated the array to avoid copying the original / modified array
        return arr
      }
      // checks if the object property is below or over 1 to either eliminate it from the array with the removeObjectWithId function
      if (cartItem.amountInCart - 1 < 1) {
        // pass the global state to the removeObjectWithId function to mutate the array and the payload if to remove the item from the array
        removeObjectWithId(state.cart, payload.id)
      } else if (cartItem.amountInCart >= 1) {
        // remove the item from the cart item counter
        cartItem.amountInCart -= 1
      }
    },
    // After the cart item has been moved to the payment screen, we need to update the total state object with the new price of the total items
    calculateTotals: (state) => {
      const mapCart = state.cart.map((itemList) => itemList.cartData)
      let total = 0
      for (let i = 0; i < mapCart.length; i++) {
        //convert the items to an integer -> multiply the amount of one item price with the total amount in one particular item of the cart
        total += Number(mapCart[i].price * mapCart[i].amountInCart)
      }
      
      state.total = total
    },
  },
  // update the state of the cart asynchronously
  extraReducers: (builder) => {
    // fetch the data of the cart and update the state with the data from the payload
    builder.addCase(fetchCart.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(fetchCart.rejected, (state, { payload }) => {
      console.log('Rejected')
    })
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cartButton = true
      
      // due to using authentication, we need to filter out the payload with each object's User id
      state.cart = payload.filter(
        (uidItem) => uidItem.userId === auth.currentUser.uid,
      )
      state.cart.filter((item, index) => state.cart.indexOf(item) === index)
     
    })
    builder.addCase(addNewCartItem.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(addNewCartItem.rejected, (state, { payload }) => {
      console.log('Rejected')
    })
    builder.addCase(addNewCartItem.fulfilled, (state, { payload }) => {
      state.cartButton = true
     
      state.cart.push(payload)
      state.cart.filter((item, index) => state.cart.indexOf(item) === index)
    })
    builder.addCase(updateCartItemAmount.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(updateCartItemAmount.rejected, (state, { payload }) => {
      console.log('Rejected', payload)
    })
    // depending if the amount is decremented one time or incrememented on the object on its data, change the visual state of the cart object accordingly
    builder.addCase(updateCartItemAmount.fulfilled, (state, { payload }) => {
     
      const cartItem = state.cart.find((item) => item.id === payload.id)
      cartItem.cartData.amountInCart += 1
    })
    builder.addCase(
      updateRemoveCartItemAmount.fulfilled,
      (state, { payload }) => {
        

        const cartItem = state.cart.find((item) => item.id === payload.id)
        //const findMapAmount = payload.cartData

        cartItem.cartData.amountInCart -= 1
      },
    )
    builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
     
      state.cart = state.cart.filter(
        (cartItemId) => cartItemId.id !== payload.id,
      )
    })
  },

  // Thunk API requests
})

// export the case / function action from the userSession and access the object
export const {
  setCart,
  orderPlaced,
  increase,
  decrease,
  calculateTotals,
  setOrder,
  increaseInFoodDetails,
  deleteItemReducer,
  setBusinessName,
  deleteItemAfterOrder,
} = addToCart.actions

// create getters

// get the user loggedInSTate whether it is true or false and the value of the user -> USED MOSTLY FOR USEAPPSELECTOR methods
// export state values through a function
export const getButton = (state) => state.addToCart.cartButton
export const getCart = (state) => state.addToCart.cart
export const getTotal = (state) => state.addToCart.total
export const getOrder = (state) => state.addToCart.order
export const getBusinessName = (state) => state.addToCart.businessName

// export the reducer of the slice
export default addToCart.reducer
