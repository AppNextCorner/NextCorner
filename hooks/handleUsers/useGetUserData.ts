import { useState, useEffect } from "react";

// set user2
import { getUsers, setUser, logOut } from "../../store/slices/userSessionSlice";
import { NextFn, User, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../store/hook";
import { fetchCart } from "../../store/slices/addToCart";
import { getOrderList } from "../../store/slices/addToOrders";
import { auth } from "hooks/handleUsers/useFirebase";
import UserAction from "../../typeDefinitions/interfaces/reduxAction.interface";
import { AppDispatch } from "../../typeDefinitions/action.type";
import { makePostRequest } from "../../config/axios.config";
import fetchBusinesses from "pages/BusinessStack/api/getBusinessess";
import { setBusinesses } from "../../store/slices/BusinessSlice/businessSessionSlice";

/**
 * Hook used to configure the user slice on redux by fetching the user data from the mongodb server and firebase auth to be able to access the data for that user from redux
 *
 * @returns isDone - used to confirm that the authentication process has been completed
 */
const useGetUserData = () => {
  const [isDone, setIsDone] = useState(false); // runs when the authentication has been initialized whether a user is authenticated or not
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Fixes login instead of redux
  const dispatch: AppDispatch = useAppDispatch();

  /**
   * Call the redux slice to send a request to grab the authenticated information from the mongodb server
   */
  const getLoggedInUserData = async () => {
    try {
      const allusers = await dispatch(getUsers()).then((action: UserAction) => {
        const users = action.payload; // Access the payload
        console.log("all users: ", users); // Do something with the payload
        return users;
      });
      return allusers;
    } catch (err) {
      console.log("no users found with this email address", err);
    }
  };

  /**
   * This post request sends an email and recieves data from the backend
   *
   * @param email The email of the current logged in user
   * @returns
   */
  const getUserData = async (email: string) => {
    const url = "/auth/getUser";
    console.log(
      'email: ', email
    )
    const response = await makePostRequest(url, { email: email });
    console.log('response from user: ', response.data)
    return response.data;
  };

  const dispatchBusinesses = async () => {
    try {
      // Fetch the businesses from the API
      const businesses = await fetchBusinesses();
      const { payload } = dispatch(setBusinesses(businesses));
      console.log("business in payload:", payload);
    } catch (error) {
      console.log("Error fetching businesses:", error);
    }
  };

  useEffect(() => {
    const fetchUserAsync = async () => {
      // after user is confirmed, grab their data
      try {
        const response = await getLoggedInUserData();
        console.log("user data:", response);

        // dispatch(setUser(response)); // set the user data to the slice
        dispatch(fetchCart());
        dispatch(getOrderList());
      } catch (e) {
        console.log("error: ", e);
      }
    };

    /**
     * Checking if the user is authenticated in firebase, and if so, then fetch the data of the user
     */
    const handleAuthStateChanged: NextFn<User | null> = async (
      user: User | null
    ) => {
      try {
        console.log(user)
        if (user && user.email) {
          const data = await getUserData(user.email);
          console.log('payload from user: ', data.payload)
          dispatch(setUser(data.payload));
          fetchUserAsync();
          dispatchBusinesses();
          setIsDone(true);
          setIsLoggedIn(true);
        } else {
          // User is signed out
          console.log('logging out')
          dispatch(logOut());
          setIsDone(true);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    // Attach the callback function to the onAuthStateChanged event
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, [auth, dispatch]);

  return {
    isDone,
    isLoggedIn
  };
};

export default useGetUserData;
