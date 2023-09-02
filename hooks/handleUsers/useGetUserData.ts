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
import { setInitialOrders } from "../../store/slices/WebsocketSlices/IncomingOrderSlice";

/**
 * Hook used to configure the user slice on redux by fetching the user data from the mongodb server and firebase auth to be able to access the data for that user from redux
 *
 * @returns isDone - used to confirm that the authentication process has been completed
 */
const useGetUserData = () => {
  const { updateBusinessInformation } = useBusinessInformation();
  const { initializeCart } = useFetchCart();
  const { getCurrentOrders } = UseOrders();
  const [user, changeUser] = useState<AppUser | null>(null);
  const [isDone, setIsDone] = useState(false); // runs when the authentication has been initialized whether a user is authenticated or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dummy endpoint
  const [url, setUrl] = useState(
    `ws://192.168.0.20:4002`
  ); 
  const dispatch: AppDispatch = useAppDispatch();
  const { getPendingOrderList, getAcceptedOrderList } =
    useHandleIncomingOrders();
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

  let userData: AppUser | null = null;
  useEffect(() => {
    /**
     * Checking if the user is authenticated in firebase, and if so, then fetch the data of the user
     */
    const handleAuthStateChanged: NextFn<User | null> = async (
      user: User | null
    ) => {
      try {
        if (user && user.email) {
          userData = await getUserData(user.email);
          changeUser(userData);
          dispatchBusinesses();
          const updateVendor = await updateBusinessInformation(userData!._id);
          const pendingOrders = updateVendor
            ? await getPendingOrderList(updateVendor.id)
            : [];
          const acceptedOrders = updateVendor
            ? await getAcceptedOrderList(updateVendor.id)
            : [];
          dispatch(
            setInitialOrders({
              accepted: acceptedOrders,
              pending: pendingOrders,
            })
          );
          initializeCart();
          getCurrentOrders(userData);
          setIsDone(true);
          setIsLoggedIn(true);
          setUrl(`ws://192.168.0.20:4002/ws?uid=${userData!._id}`);
        } else {
          // User is signed out
          dispatch(logOut());
          setIsDone(true);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log("error with fetching: ", err);
      }
    };
    // Attach the callback function to the onAuthStateChanged event
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, [auth]);

  return {
    isDone,
    userData,
    user,
    isLoggedIn,
    url,
    setUrl,
  };
};

export default useGetUserData;
