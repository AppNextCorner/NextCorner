/**
 * Purpose of the file: Used after the user is ready to move to the business page where they could add an business and be able to send requests through our frontend
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createToken } from "hooks/handleUsers/useCreateToken";
const BUSINESS_URL = `https://nextcornerdevelopment.onrender.com/business/`;
export const getAllBusinesses = createAsyncThunk(
  "businessSlice/getAllBusinesses",
  async () => {
    const headers = await createToken();
    console.log("here is business: ", headers);
    try {
      const response = await axios.get(BUSINESS_URL + "get-vendors", headers);
      console.log("response by business", response.data);
      return response.data; // Return a value synchronously using Async-await
    } catch (err) {
      if (err.response) {
        console.log("Error in getallbusiness: ", err.response);

        return err;
      }
    }
  }
);

export const sendReview = createAsyncThunk(
  "businessSlice/sendReview",
  async (itemStatus) => {
    try {
      const response = await axios.patch(
        BUSINESS_URL + itemStatus.id,
        itemStatus
      );

      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        throw err;
      }
    }
  }
);

const initialState = {
  business: [],
};

export const businessSlice = createSlice({
  name: "businessSlice",
  initialState,

  reducers: {
    //  sendReviewReducer: (state, { payload }) => {
    //    const businessItem = state.business.find((item) => item.id === payload.id)
    //    businessItem.businessStatus = payload.status
    //  },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllBusinesses.pending, (state, { payload }) => {
      console.log("pending in business");
    });
    builder.addCase(getAllBusinesses.rejected, (state, { payload }) => {
      console.log("Rejected in business");
    });
    builder.addCase(getAllBusinesses.fulfilled, (state, { payload }) => {
      // due to using authentication, we need to filter out the payload with each object's User id
      state.business = payload;
      console.log("business in slice: ", state.business);
    });
    builder.addCase(sendReview.pending, (state, { payload }) => {
      console.log("pending");
    });
    builder.addCase(sendReview.rejected, (state, { payload }) => {
      console.log("Rejected", payload);
    });
    // depending if the amount is decremented one time or incrememented on the object on its data, change the visual state of the cart object accordingly
    builder.addCase(sendReview.fulfilled, (state, { payload }) => {});
  },
});
// export the reducers
//export const { sendReviewReducer } = businessSlice.actions

export const getBusiness = (state) => state.businessSlice.business;

export default businessSlice.reducer;
