import { useState, useEffect } from "react";
import { getUsers, setUser, logOut } from "../../store/slices/userSession";
import {onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../store/hook";
import { fetchCart } from "../../store/slices/addToCart";
import { getOrderList } from "../../store/slices/addToOrders";
import {auth} from '@hooks/handleUsers/useFirebase'
import { getAllBusinesses } from "../../store/slices/BusinessSlice/businessSlice";
/**
 * Hook used to configure the user slice on redux by fetching the user data from the mongodb server and firebase auth to be able to access the data for that user from redux
 *
 * @returns isDone - used to confirm that the authentication process has been completed
 */
const useGetUserData = () => {
  
  const [isDone, setIsDone] = useState(false); // runs when the authentication has been initialized whether a user is authenticated or not
  const dispatch = useAppDispatch();
  /**
   * Call the redux slice to send a request to grab the authenticated information from the mongodb server
   */
  const getLoggedInUserData = async () => {
    try {
      const {payload} = await dispatch(getUsers());
      console.log("payload for users: ", payload);
      return {payload};
    } catch (err) {
      console.log("no users found with this email address", err);
    }
  };

  useEffect(() => {

    const fetchUserAsync = async () => {
      // after user is confirmed, grab their data
      try {
        const {payload} = await getLoggedInUserData();
        console.log("user data:", payload);
        
        dispatch(setUser(payload)); // set the user data to the slice
        dispatch(fetchCart());
        dispatch(getOrderList());
        
      } catch (e) {
        console.log("error: ", e);
      }
    };
    const fetchBusinesses = async () => {
      try {
        // Fetch the businesses from the API
        const { payload } = await dispatch(getAllBusinesses());
        console.log('business in payload:', payload);

      } catch (error) {
        console.log("Error fetching businesses:", error);
      }
    };

    /**
     * Checking if the user is authenticated in firebase, and if so, then fetch the data of the user
     */
    const handleAuthStateChanged = async (user) => {
      console.log("auth", auth);
      if (user.email) {
        fetchUserAsync();
        fetchBusinesses();
        setIsDone(true);
      } else {
        // User is signed out
        dispatch(logOut());
        setIsDone(true);
      }
    };

    // Attach the callback function to the onAuthStateChanged event
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, [auth, dispatch]);

  return {
    isDone,
  };
};

export default useGetUserData;
