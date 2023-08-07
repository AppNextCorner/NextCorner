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
import useBusinessInformation from "hooks/api/business/useBusinessInformation";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
import useHandleIncomingOrders from "hooks/handleOrders/useHandleIncomingOrders";
import { getAcceptedOrders, setInitialOrders } from "../../store/slices/WebsocketSlices/IncomingOrderSlice";

/**
 * Hook used to configure the user slice on redux by fetching the user data from the mongodb server and firebase auth to be able to access the data for that user from redux
 *
 * @returns isDone - used to confirm that the authentication process has been completed
 */
const useGetUserData = () => {
  const { updateBusinessInformation } = useBusinessInformation();
  const { initializeCart } = useFetchCart();
  const { getCurrentOrders } = UseOrders();
  const [isDone, setIsDone] = useState(false); // runs when the authentication has been initialized whether a user is authenticated or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [url, setUrl] = useState(`ws://192.168.1.19:4002/ws/debug`) // Fixes login instead of redux
  const dispatch: AppDispatch = useAppDispatch();
  const {
    getPendingOrderList,
    acceptOrder,
    rejectOrder,
    getAcceptedOrderList,
  } = useHandleIncomingOrders();
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
    const data = response.data;
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
          const userData: AppUser = await getUserData(user.email);

          dispatchBusinesses();
          const updateVendor = await updateBusinessInformation(userData._id);
          const pendingOrders = updateVendor ? await getPendingOrderList(updateVendor.id) : [];
          const acceptedOrders = updateVendor ? await getAcceptedOrderList(updateVendor.id) : [];
          console.log('orders: ', acceptedOrders.length)
          dispatch(setInitialOrders({
            accepted: acceptedOrders,
            pending: pendingOrders,
          }))
          console.log("running below functions");
          initializeCart();
          getCurrentOrders(userData);
          setIsDone(true);
          setIsLoggedIn(true);
          setUrl(`ws://192.168.1.19:4002/ws?uid=${userData._id}`);
        } else {
          // User is signed out
          setUrl(`ws://192.168.1.19:4002/ws/debug`);
          dispatch(logOut());
          setIsDone(true);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log("error with fetching: ",err);
      }
    };
    console.log("auth: ", auth);
    // Attach the callback function to the onAuthStateChanged event
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, [auth, dispatch]);

  return {
    isDone,
    isLoggedIn,
    url,
  };
};

export default useGetUserData;
