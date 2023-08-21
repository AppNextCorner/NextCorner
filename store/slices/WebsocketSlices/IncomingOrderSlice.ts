import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";

// Interface for the state of the cart
export interface IIncoming {
  accepted: Iorder[];
  pending: Iorder[];
}

const initialState: IIncoming = {
  accepted: [],
  pending: [],
};

export const IncomingOrderSlice = createSlice({
  name: "IncomingOrderSlice",
  initialState,
  reducers: {
    // Reducer to add a new item to the cart
    setInitialOrders: (state, action) => {
      state.accepted = action.payload.accepted;
      state.pending = action.payload.pending;
    },
    addIncomingOrder: (state, action) => {
      state.pending.push(action.payload[0]);
    },
    removeFromPending: (state, action) => {
      console.log("old pending length:", state.pending.length);
      const index = state.pending
        .map((item) => item._id)
        .indexOf(action.payload);
      state.pending.splice(index, 1);
      console.log("new state pending length:");
      console.log(state.pending.length);
    },
    addAcceptedOrder: (state, action) => {
      state.pending = state.pending.filter(
        (item) => item._id !== action.payload[0]._id
      );
      // Add to accepted
      state.accepted.push(action.payload[0]);
    },
    removeFromAccepted: (state, action) => {
      state.accepted = state.accepted.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const {
  setInitialOrders,
  addAcceptedOrder,
  addIncomingOrder,
  removeFromPending,
  removeFromAccepted,
} = IncomingOrderSlice.actions;
export const getAcceptedOrders = (state: RootState) =>
  state.IncomingOrderSlice.accepted;
export const getPendingOrders = (state: RootState) =>
  state.IncomingOrderSlice.pending;

export default IncomingOrderSlice.reducer;
