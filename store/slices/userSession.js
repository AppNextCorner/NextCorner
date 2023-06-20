/**
 * Purpose of file: Used to send our requests to the server and be able to create and get a new user from the server and be able to display the new changes to our frontend after changing our redux state
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IP } from '@env'
import { app } from '../../App'
import { getAuth } from 'firebase/auth'

const USER_URL = `http://${IP}:5005/auth/`

export const createToken = async () => {
  const auth = getAuth(app);
  console.log('auth from global', auth)
  let user = auth.currentUser
  console.log("user current user:", user)
  const token = user && (await user.getIdToken())
  console.log("token: ",token)
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
  console.log('get users')
  console.log("headers: ", headers)
  try {
    const response = await axios.get(USER_URL, headers)
    console.log("RESPONSE DATA", response.data)
    return response.data // Return a value synchronously using Async-await
  } catch (err) {
    if (!err.response) {
      console.log("Error from user: ", err.response)
      throw err
    }
  }
})

export const createUser = createAsyncThunk(
  'userSession/createUser',
  async (userData) => {
    try {
      const resp = await axios.post(USER_URL + 'signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
     

      return resp.data
    } catch (err) {
      console.log('error from user')
      console.log(err.message)
      return err.message
    }
  },
)

// setting the default state for the app
const initialState = {
  loggedIn: true, // user is not logged in by default
  users: [],
}

// create a slice object to store the state -> creates action creators for each case inside reducers and can safely mutate the state
export const userSession = createSlice({
  // prefix for generated action types
  name: 'userSession',
  // initial state of the reducer
  initialState,
  // object where the keys are strings and the values are functions that handle specific actions
  reducers: {
    // case reducer functions
    // action is what values we want to assign the state to and receive it from payload
    setUser: (state, action) => {
      console.log('action payload: ', action.payload, " + EMAIL: " + auth.currentUser.email)
      state.users = action.payload.filter(
        (getOneUser) => getOneUser.email === auth.currentUser.email,
      )
      console.log("state user: ", state.users)
      // state.user = action.payload
      state.loggedIn = true
    },
    logOut: (state) => {
      // when user logs in, update logged in state
      state.loggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {

      
      
    })
    builder.addCase(createUser.pending, (state, { payload }) => {
      console.log('pending')
     
    })
    builder.addCase(createUser.rejected, (state, { payload }) => {
      console.log('Rejected')
    })
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
    })
  },
})

// export the case / function action from the userSession and access the object
export const { setUser, logOut } = userSession.actions

// create getters

// get the user loggedInSTate whether it is true or false and the value of the user -> USED MOSTLY FOR USEAPPSELECTOR methods
// export state values through a function
export const getIsLoggedIn = (state) => state.userSession.loggedIn
export const getUser = (state) => state.userSession.users

// export the reducer of the slice
export default userSession.reducer
