import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
import { RootState } from "../store";

/**
 * temp
 */
import { auth } from "hooks/handleUsers/useFirebase";
import { createToken } from "../../hooks/handleUsers/useCreateToken";
import axios from "axios";
import { API } from "constants/API";
const USER_URL = `${API}/auth/`;
/**
 * temp
 *
 */

export const createUser = createAsyncThunk(
  "userSession/createUser",
  async (userData: any) => {
    try {
      console.log("here is user data: ", userData.firstName);
      const resp = await axios.post(USER_URL + "signup", userData.firstName, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return resp.data;
    } catch (err: any) {
      console.log("error from user");
      console.log(err.message);
      return err.message;
    }
  }
);

export const getUsers = createAsyncThunk("userSession/getUsers", async () => {
  const headers: any = await createToken();
  console.log("get users by this IP: ", process.env.IP);
  console.log("headers: ", headers);
  try {
    const response = await axios.get(USER_URL, headers);
    console.log("RESPONSE DATA", response.data);
    return response.data; // Return a value synchronously using Async-await
  } catch (err: any) {
    console.log("error in user:", err);
    if (err.response) {
      console.log("Error from user: ", err.response);
      throw err;
    }
  }
});

/**
 * end of temp
 */
export interface AppUserState {
  user: AppUser | null;
  users: any; // temp
  loggedIn: boolean; //temp
  activeSession: boolean;
}

const initialState: AppUserState = {
  user: null,
  users: [], // temp
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
      // state.users = action.payload.filter(
      //   (getOneUser: AppUser) => getOneUser.email === auth?.currentUser?.email
      // );
    },
    setUser2: (state, action) => {
      // console.log(
      //   "action payload: ",
      //   action.payload,
      //   " + EMAIL: " + auth?.currentUser?.email
      // );
      state.users = action.payload.filter(
        (getOneUser: any) => getOneUser.email === auth?.currentUser?.email
      );
      // console.log("state user: ", state.users);
      // state.user = action.payload
      state.loggedIn = true;
    },
    logOut: (state) => {
      // when user logs in, update logged in state
      state.loggedIn = false;
    },
  },
});

export const { setUser, setUser2, logOut } = userSessionSlice.actions;

export const getUser = (state: RootState) => state.userSession.user;
export const getIsLoggedIn = (state: any) => state.userSession.activeSession;
export const getUserz = (state: any) => state.userSession.users; //temp

export default userSessionSlice.reducer;
