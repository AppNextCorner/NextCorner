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
      console.log("Here is incoming order:\n");
      console.log(action.payload);
      console.log("\n\n\n\n");
      state.pending.push(action.payload[0]);
    },
    removeFromPending: (state, action) => {
      state.pending = state.pending.filter(
        (item) => item._id !== action.payload.id
      );

      state.pending = state.pending.filter(
        (item) => item._id !== action.payload
      );
    },
    addAcceptedOrder: (state, action) => {
      //remove from pending

      // console.log("HERE IS ACTION:", action.payload)
      // console.log(action.payload)
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
