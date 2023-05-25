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
  name: 'addToCart',
  initialState,
  reducers: {
    setBusinessName: (state, { payload }) => {
      state.businessName = payload;
    },
    setOrder: (state, { payload }) => {
      state.cart = []; // Clear the cart
      state.order.push(payload.order);
      state.cartButton = false;
    },
    addItem: (state, { payload }) => {
      state.cart.push(payload);
    },
    setCart: (state, { payload }) => {
      const mapCart = state.cart.map((itemList) => itemList.cartData);
      const cartItem = mapCart.find((item) => item.itemId === payload.id);
      const index = mapCart.indexOf(cartItem);

      if (index > -1) {
        cartItem.amountInCart += 1;
        mapCart.splice(index, 1);
      } else {
        state.cart.push(payload);
      }

      state.cartButton = state.cart.length > 0;
    },
    orderPlaced: (state) => {
      state.cartButton = state.cart.length > 0;
    },
    increaseInFoodDetails: (state, { payload }) => {
      payload.amountInCart += 1;
    },
    increase: (state, { payload }) => {
      const mapCart = state.cart.map((itemList) => itemList.cartData);
      const cartItem = mapCart.find((item) => item.itemId === payload.id);
      cartItem.amountInCart += 1;
    },
    deleteItemReducer: (state, { payload }) => {
      const cartItem = state.cart.find((item) => item.id === payload.id);

      if (cartItem.cartData.amountInCart - 1 < 1) {
        state.cart = state.cart.filter((item) => item.id !== payload.id);
      }
    },
    deleteItemAfterOrder: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload.id);
    },
    decrease: (state, { payload }) => {
      const mapCart = state.cart.map((itemList) => itemList.cartData);
      const cartItem = mapCart.find((item) => item.itemId === payload.id);

      if (cartItem.amountInCart - 1 < 1) {
        state.cart = state.cart.filter((item) => item.id !== payload.id);
      } else if (cartItem.amountInCart >= 1) {
        cartItem.amountInCart -= 1;
      }
    },
    calculateTotals: (state) => {
      const mapCart = state.cart.map((itemList) => itemList.cartData);
      let total = 0;

      for (let i = 0; i < mapCart.length; i++) {
        total += Number(mapCart[i].price * mapCart[i].amountInCart);
      }

      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      console.log('pending');
    });
    builder.addCase(fetchCart.rejected, (state) => {
      console.log('Rejected');
    });
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cartButton = true;
      state.cart = payload.filter((uidItem) => uidItem.userId === auth.currentUser.uid);
      state.cart = state.cart.filter((item, index) => state.cart.indexOf(item) === index);
    });
    builder.addCase(addNewCartItem.pending, (state) => {
      console.log('pending');
    });
    builder.addCase(addNewCartItem.rejected, (state) => {
      console.log('Rejected');
    });
    builder.addCase(addNewCartItem.fulfilled, (state, { payload }) => {
      state.cartButton = true;
      state.cart.push(payload);
      state.cart = state.cart.filter((item, index) => state.cart.indexOf(item) === index);
    });
    builder.addCase(updateCartItemAmount.pending, (state) => {
      console.log('pending');
    });
    builder.addCase(updateCartItemAmount.rejected, (state, { payload }) => {
      console.log('Rejected', payload);
    });
    builder.addCase(updateCartItemAmount.fulfilled, (state, { payload }) => {
      const cartItem = state.cart.find((item) => item.id === payload.id);
      cartItem.cartData.amountInCart += 1;
    });
    builder.addCase(updateRemoveCartItemAmount.fulfilled, (state, { payload }) => {
      const cartItem = state.cart.find((item) => item.id === payload.id);
      cartItem.cartData.amountInCart -= 1;
    });
    builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
      state.cart = state.cart.filter((cartItemId) => cartItemId.id !== payload.id);
    });
  },
});

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
