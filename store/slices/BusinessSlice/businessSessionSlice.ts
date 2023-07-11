import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";
export interface BusinessState {
  businessess: vendorStructure[];
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
