import { useState, useEffect } from "react";
import { setUser, logOut } from "../../store/slices/userSessionSlice";
import { NextFn, User, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../store/hook";
//import { getOrderList } from "../../store/slices/addToOrders";
import { auth } from "hooks/handleUsers/useFirebase";
import { AppDispatch } from "../../typeDefinitions/action.type";
import { makePostRequest } from "../../config/axios.config";
import fetchBusinesses from "pages/BusinessStack/api/getBusinessess";
import { setBusinesses } from "../../store/slices/BusinessSlice/businessSessionSlice";
import { API } from "constants/API";
import { useFetchCart } from "hooks/api/business/menu/useFetchCart";
import UseOrders from "hooks/handleVendors/useOrders.hook";

/**
 * Hook used to configure the user slice on redux by fetching the user data from the mongodb server and firebase auth to be able to access the data for that user from redux
 *
 * @returns isDone - used to confirm that the authentication process has been completed
 */
const useGetUserData = () => {
  const { initializeCart } = useFetchCart();
  const { getCurrentOrders } = UseOrders();
  const [isDone, setIsDone] = useState(false); // runs when the authentication has been initialized whether a user is authenticated or not
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Fixes login instead of redux
  const dispatch: AppDispatch = useAppDispatch();

  /**
   * This post request sends an email and recieves data from the backend
   *
   * @param email The email of the current logged in user
   * @returns
   */
  const getUserData = async (email: string) => {
    const url = "/auth/getUser";
    console.log("email: ", email);
    const response = await makePostRequest(url, { email: email });
    const data = response.data
    console.log("response from user: ", data);
    await dispatch(setUser(data.payload));
    return data.payload;
  };

  const dispatchBusinesses = async () => {
    try {
      // Fetch the businesses from the API
      const businesses = await fetchBusinesses();
      dispatch(setBusinesses(businesses));
    } catch (error) {
      console.log("Error fetching businesses:", error);
    }
  };

  useEffect(() => {
    /**
     * Checking if the user is authenticated in firebase, and if so, then fetch the data of the user
     */
    const handleAuthStateChanged: NextFn<User | null> = async (
      user: User | null
    ) => {
      try {
        console.log("API: ", API);
        console.log(user);
        if (user && user.email) {
          const userData = await getUserData(user.email);
          dispatchBusinesses();
          console.log('running below functions')
          initializeCart();
          getCurrentOrders(userData);
          setIsDone(true);
          setIsLoggedIn(true);
        } else {
          // User is signed out
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
    isLoggedIn,
  };
};

export default useGetUserData;
