import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";
export interface BusinessState {
  businessess: vendorStructure[];
  userBusiness: vendorStructure[] | null | undefined;
}

const initialState: BusinessState = {
  businessess: [],
  userBusiness: null,
};

export const businessSessionSlice = createSlice({
  name: "businessSession",
  initialState,
  reducers: {
    setBusinesses: (state, action) => {
      state.businessess = action.payload;
    },
    setUserBusiness: (state, action) => {
      state.userBusiness = action.payload;
    }
  },
});

export const { setBusinesses, setUserBusiness } = businessSessionSlice.actions;
export const getBusinesses = (state: RootState) =>
  state.businessSession.businessess;

export const getUserBusiness = (state: RootState) => 
  state.businessSession.userBusiness;



export default businessSessionSlice.reducer;
