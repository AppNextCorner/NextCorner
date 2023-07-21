import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
import { RootState } from "../store";
import axios from "axios";
import { API } from "constants/API";
const USER_URL = `${API}/auth/`;

export const createUser = createAsyncThunk(
  "userSession/createUser",
  async (userData: any) => {
    try {
      const resp = await axios.post(USER_URL + "signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return resp.data.payload;
    } catch (error: any) {
      if (error.response && error.response.data) {
        // Access the error payload from response.data
        return error.response.data; 
      }
      return error.response; 
     
    }
  }
);
/**
 * end of temp
 */
export interface AppUserState {
  user: AppUser | null;
  loggedIn: boolean; //temp
  activeSession: boolean;
}

const initialState: AppUserState = {
  user: null,
  loggedIn: true, //temp
  activeSession: true,
};

export const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.activeSession = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      // when user logs in, update logged in state
      state.loggedIn = false;
    },
  },
});

export const { setUser, logOut } = userSessionSlice.actions;

export const getUser = (state: RootState) => state.userSession.user;
export const getIsLoggedIn = (state: any) => state.userSession.activeSession;

export default userSessionSlice.reducer;
