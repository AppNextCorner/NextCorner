import { RootState } from "../../store";
import { vendor } from "../../../typeDefinitions/interfaces/vendor.interface";
import { createSlice } from "@reduxjs/toolkit";
export interface BusinessState {
  businessess: vendor[];
}

const initialState: BusinessState = {
  businessess: [],
};

export const businessSessionSlice = createSlice({
  name: "businessSession",
  initialState,
  reducers: {
    setBusinesses: (state, action) => {
      state.businessess = action.payload;
    },
  },
});

export const { setBusinesses } = businessSessionSlice.actions;
export const getBusinesses = (state: RootState) =>
  state.businessSession.businessess;

export default businessSessionSlice.reducer;
