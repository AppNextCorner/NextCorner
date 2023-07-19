/**
 * Purpose of the file: Contains Redux slice for managing order-related state and asynchronous actions.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createToken } from "hooks/handleUsers/useCreateToken";
import { IP } from "@env";
import { auth } from "../../hooks/handleUsers/useFirebase";
import { API } from "constants/API";
import { ICart } from "./addToCartSessionSlice";

const ORDERS_URL = `${API}/orders/`;

export interface state {
  orders: ICart[];
  minutesToDone: number;
  status: string;
  accepted: string;
  uid: string;
}

export interface ITotalOrder {
  orders: ITotalOrder[];
}

// Initial state of the addToOrders slice
const initialState: ITotalOrder = {
  orders: []
};

// Create the addToOrders slice
export const addToOrders = createSlice({
  name: "addToOrders",
  initialState,

  // Reducers to handle synchronous actions
  reducers: {
    
    updateOrderStatusReducer: (state, { payload }) => {
      // const orderItem = state.order.find((item) => item.id === payload.id);
      // orderItem.orderStatus = payload.status;
    },
  },
});

// Export the reducers
export const { updateOrderStatusReducer } = addToOrders.actions;

// Selectors to get specific state values
export const getOrders = (state) => state.addToOrders.order;
export const getTotal = (state) => state.addToOrders.total;
export const getOrderBusinessName = (state) =>
  state.addToOrders.orderItemBusinessName;
export const getTime = (state) => state.addToOrders.time;

export default addToOrders.reducer;
