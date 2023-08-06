import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import AllOrdersList from "components/vendors/handle/AllOrdersList";
import { toggleButton } from "../../../../styles/components/toggleStyles";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { getUserBusiness } from "../../../../store/slices/BusinessSlice/businessSessionSlice";
import useHandleIncomingOrders from "hooks/handleOrders/useHandleIncomingOrders";
import { useRoute } from "@react-navigation/native";
import { WebSocketContext } from "../../../../context/incomingOrderContext";
import {
  addAcceptedOrder,
  getAcceptedOrders,
  getPendingOrders,
  setInitialOrders,
} from "../../../../store/slices/WebsocketSlices/IncomingOrderSlice";
import {useUpdateEffect} from "hooks/api/orders/useUpdateEffect";
const VendorIncomingOrders = () => {
  const stores = useAppSelector(getUserBusiness);
  const getAcceptedOrdersList = useAppSelector(getAcceptedOrders)
  const getPendingOrdersList = useAppSelector(getPendingOrders)
  const store = stores !== null ? stores![0] : null;
  const websocket = useContext(WebSocketContext);
  console.log("websocket vendor incoming", websocket);
  const route = useRoute();
  const dispatch = useAppDispatch();
  //const { store }: RouteParams = route.params as RouteParams;
  const storeId = store!.id!;
  const {
    getPendingOrderList,
    acceptOrder,
    rejectOrder,
    getAcceptedOrderList,
  } = useHandleIncomingOrders();

  // const callbackPending = useCallback(
  //   async () => {return await getPendingOrderList(storeId)},
  //   []
  // );
  // const pendingOrders =    getPendingOrderList(storeId);
  //const pendingMemoOrder = useMemo(async() => {return await getPendingOrderList(storeId)}, [storeId])
  const [pendingMemoOrder, setPendingMemoOrder] = useState<any[]>(getPendingOrdersList);
  const [acceptedOrders, setAcceptedOrders] = useState<any[]>(getAcceptedOrdersList);
  // Step 2: Fetch data and update state when storeId changes
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const orders = await getPendingOrderList(storeId);
  //     setPendingMemoOrder(orders);
  //     const accepted = await getAcceptedOrderList(storeId);
  //     setAcceptedOrders(accepted);
  //   };

  //   fetchData();
    
  // }, [storeId]);

  useEffect(() => {
    const handleWebSocketMessage = (event: any) => {
      const parseData = JSON.parse(event.data);
      Alert.alert(parseData.payload.userName);
      if (parseData.type === "return_change_accepted") {
        if (parseData.payload.accepted === "rejected") {
          // Change from pending to accepted or decline
          setPendingMemoOrder((prev) =>
            prev.filter((item) => item._id !== parseData.payload.id)
          );
        } else {
          const findOrderItem = pendingMemoOrder.find(
            (item) => item._id === parseData.payload.id
          );

          // Update both pendingMemoOrder and acceptedOrders in one set call
          setPendingMemoOrder((prev) =>
            prev.filter((item) => item._id !== parseData.payload.id)
          );
          setAcceptedOrders((prev) => [...prev, findOrderItem]);
          dispatch(addAcceptedOrder({
            order: findOrderItem
          }))
        }
      } else if (parseData.type === "incoming_order") {
        if (
          route.name === "Orders" &&
          parseData.payload.accepted === "pending"
        ) {
          setPendingMemoOrder((prev) => [...prev, parseData.payload]);
        } else if (
          route.name === "Orders" &&
          parseData.payload.accepted === "accepted"
        ) {
          setAcceptedOrders((prev) => [...prev, parseData.payload]);
        }
      }
    };
    websocket.onmessage = handleWebSocketMessage;

    return () => {
      // Cleanup function to unsubscribe from WebSocket when component is unmounted
      websocket.onmessage = null;
    };
  }, []);


  // Step 2: Create state variables for the toggle and orderes
  const [isToggleOn, setIsToggleOn] = useState(false);
  // const [pendingOrders, setPendingOrders] = useState<Iorder[] | undefined>();

  // Toggle handler for when the store is open
  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <NextCornerVendorHeader />
        </View>
        <View style={styles.headerText}>
          <Text>Accepting</Text>
        </View>
      </View>

      <View style={styles.header}>
        <View style={styles.subHeader}>
          <Text>Orders</Text>
        </View>
        {/* Step 3: Toggle Button */}
        <TouchableOpacity onPress={toggleHandler}>
          <View
            style={[
              toggleButton.toggleButton,
              isToggleOn
                ? toggleButton.toggleButtonOn
                : toggleButton.toggleButtonOff,
            ]}
          >
            <View
              style={[
                toggleButton.toggleButtonCircle,
                isToggleOn
                  ? toggleButton.toggleButtonCircleOn
                  : toggleButton.toggleButtonCircleOff,
                { transform: [{ translateX: isToggleOn ? 10 : -10 }] }, // Move the circle to the right when toggle is ON
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Text>Pending</Text>
      {/* Step 5: Display orders once they are available */}
      {pendingMemoOrder !== undefined && (
        <View>
          <AllOrdersList
            orders={pendingMemoOrder}
            acceptMethod={acceptOrder}
            rejectMethod={rejectOrder}
          />
        </View>
      )}
      <Text>Accepted</Text>
      {acceptedOrders !== undefined && (
        <View>
          <AllOrdersList orders={acceptedOrders} />
        </View>
      )}
    </View>
  );
};

export default VendorIncomingOrders;

const styles = StyleSheet.create({
  headerText: { marginTop: "7.5%", fontWeight: "bold" },
  header: { flexDirection: "row", alignItems: "center" },
  page: { flex: 1, backgroundColor: "#fff" },
  subHeader: { flex: 1, backgroundColor: "#fff" },
});
