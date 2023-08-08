/**
 * Purpose of the file: Contains Redux slice for managing order-related state and asynchronous actions.
 */

import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "./addToCartSessionSlice";
import { RootState } from "../store";

export interface state {
  orders: ICart[];
  minutesToDone: number;
  status: string;
  accepted: string;
  uid: string;
}

export interface ITotalOrder {
  orders: state[];
}

// Initial state of the addToOrders slice
const initialState: ITotalOrder = {
  orders: [],
};

// Create the addToOrders slice
export const addToOrders = createSlice({
  name: "addToOrders",
  initialState,

  // Reducers to handle synchronous actions
  reducers: {
    setOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setCompleted: (state, action) => {
      state.orders = state.orders.filter(
        (item: any) => item._id !== action.payload._id
      );
      state.orders.push(action.payload);
    },
  },
});

// Export the reducers
export const { setOrders, setCompleted } = addToOrders.actions;

// // Selectors to get specific state values
export const getOrders = (state: RootState) => state.addToOrders.orders;
// export const getTotal = (state) => state.addToOrders.total;
// export const getOrderBusinessName = (state) =>
//   state.addToOrders.orderItemBusinessName;
// export const getTime = (state) => state.addToOrders.time;

export default addToOrders.reducer;
