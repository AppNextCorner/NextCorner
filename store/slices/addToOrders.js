/**
 * Purpose of the file: Contains Redux slice for managing order-related state and asynchronous actions.
 */

 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
 import axios from 'axios';
 import {createToken} from 'hooks/handleUsers/useCreateToken'
 import { IP } from '@env'
 import {auth} from '../../hooks/handleUsers/useFirebase'
 
 const ORDERS_URL = `https://nextcornerdevelopment.onrender.com/orders/`;
 
 // Asynchronous action to add an order
 export const addOrder = createAsyncThunk(
   'addToOrders/addOrder',
   async (order) => {
     const headers = await createToken();
     try {
       const resp = await axios.post(ORDERS_URL, order, headers);
       return resp.data;
     } catch (error) {
       console.log('error');
       console.log(error);
     }
   },
 );
 
 // Asynchronous action to fetch the order list
 export const getOrderList = createAsyncThunk(
   'addToOrders/getOrderList',
   async () => {
     const headers = await createToken();
     try {
       const response = await axios.get(ORDERS_URL, headers);
       console.log('response from order', response.data)
       return response.data;
     } catch (err) {
       if (err.response) {
         console.log(err.response);
         throw err;
       }
     }
   },
 );
 
 // Asynchronous action to update the order status
 export const updateOrderStatus = createAsyncThunk(
   'addToOrders/updateOrderStatus',
   async (itemStatus) => {
     try {
       const response = await axios.patch(
         ORDERS_URL + 'order-status/' + itemStatus.id,
         itemStatus,
       );
       console.log('response from order:  ', response.data)
 
       return response.data;
     } catch (err) {
       if (err.response) {
         console.log(err.response);
         throw err;
       }
     }
   },
 );
 
 // Initial state of the addToOrders slice
 const initialState = {
   order: [],
   total: 0,
   time: 0,
   orderItemBusinessName: '',
 };
 
 // Create the addToOrders slice
 export const addToOrders = createSlice({
   name: 'addToOrders',
   initialState,
 
   // Reducers to handle synchronous actions
   reducers: {
     updateOrderStatusReducer: (state, { payload }) => {
       const orderItem = state.order.find((item) => item.id === payload.id);
       orderItem.orderStatus = payload.status;
     },
   },
 
   // Extra reducers to handle asynchronous actions
   extraReducers: (builder) => {
     builder.addCase(addOrder.pending, (state, { payload }) => {
       console.log('pending');
     });
     builder.addCase(addOrder.rejected, (state, { payload }) => {
       console.log('Rejected');
     });
     builder.addCase(addOrder.fulfilled, (state, { payload }) => {
       state.order.push(payload);
       state.order.filter((item, index) => state.order.indexOf(item) === index);
     });
 
     builder.addCase(getOrderList.pending, (state, { payload }) => {
       console.log('pending');
     });
     builder.addCase(getOrderList.rejected, (state, { payload }) => {
       console.log('Rejected');
     });
     builder.addCase(getOrderList.fulfilled, (state, { payload }) => {
       state.order = payload.filter(
         (uidItem) => uidItem.userId === auth.currentUser.uid,
       );
       state.order.filter((item, index) => state.order.indexOf(item) === index);
     });
 
     builder.addCase(updateOrderStatus.pending, (state, { payload }) => {
       console.log('pending');
     });
     builder.addCase(updateOrderStatus.rejected, (state, { payload }) => {
       console.log('Rejected', payload);
     });
     builder.addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
       // Handle the fulfilled action
     });
   },
 });
 
 // Export the reducers
 export const { updateOrderStatusReducer } = addToOrders.actions;
 
 // Selectors to get specific state values
 export const getOrders = (state) => state.addToOrders.order;
 export const getTotal = (state) => state.addToOrders.total;
 export const getOrderBusinessName = (state) =>
   state.addToOrders.orderItemBusinessName;
 export const getTime = (state) => state.addToOrders.time;
 
 export default addToOrders.reducer;
 
