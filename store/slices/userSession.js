/**
 * Purpose of file: Contains our slice to use for our state 
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IP } from "../../constants/StripeApiKey";
import { auth } from "../../App";

const POSTS_URL = `http://${IP}:4020/auth/`

const createToken = async () => {
  let user = auth.currentUser
  const token = user && (await user.getIdToken())

  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return payloadHeader
}

export const getUsers = createAsyncThunk('userSession/getUsers', async () => {
  const headers = await createToken()
  console.log('headers', headers.headers)
  try {
    console.log('Here is headers: ', headers)
    const response = await axios.get(POSTS_URL, headers)
    console.log('Here is response data: ', response.data)
    return response.data // Return a value synchronously using Async-await
  } catch (err) {
    if (!err.response) {
      console.log(err.response)
      throw err
    }
  }
})

// setting the default state for the app
const initialState = {
  loggedIn: true, // user is not logged in by default
  users: [],
};

// create a slice object to store the state -> creates action creators for each case inside reducers and can safely mutate the state
export const userSession = createSlice({
// prefix for generated action types
  name: "userSession",
  // initial state of the reducer
  initialState,
  // object where the keys are strings and the values are functions that handle specific actions
  reducers: {
    // case reducer functions
    // action is what values we want to assign the state to and receive it from payload
    setUser: (state, action) => {
        console.log(action);
      // when user logs in, update logged in state by assigning it a new value -> could do more actions such as push to an array, but it all depends on the data type and current state

      // assign the null value of the user to the value we get from the setUser dispatch method
      state.user = action.payload;
      state.loggedIn = true;
    },
    logOut: (state) => {
      // when user logs in, update logged in state
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) =>{
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload
      state.users = state.users.filter((getOneUser) => getOneUser.email === auth.currentUser.email);
      console.log("state users: ",state.users);
    })
  }
});

// export the case / function action from the userSession and access the object 
export const {setUser, logOut} = userSession.actions;

// create getters

// get the user loggedInSTate whether it is true or false and the value of the user -> USED MOSTLY FOR USEAPPSELECTOR methods
// export state values through a function
export const getIsLoggedIn = (state) => state.userSession.loggedIn;
export const getUser = (state) => state.userSession.user;

// export the reducer of the slice
export default userSession.reducer;