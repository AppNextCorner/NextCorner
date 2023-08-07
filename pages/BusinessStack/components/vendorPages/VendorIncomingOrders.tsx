import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import AllOrdersList from "components/vendors/handle/AllOrdersList";
import { toggleButton } from "../../../../styles/components/toggleStyles";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import useHandleIncomingOrders from "hooks/handleOrders/useHandleIncomingOrders";
import { useRoute } from "@react-navigation/native";
import { WebSocketContext } from "../../../../context/incomingOrderContext";
import {
  addIncomingOrder,
  getAcceptedOrders,
  getPendingOrders,
  removeFromPending,
} from "../../../../store/slices/WebsocketSlices/IncomingOrderSlice";
const VendorIncomingOrders = () => {
  const getAcceptedOrdersList = useAppSelector(getAcceptedOrders)
  const getPendingOrdersList = useAppSelector(getPendingOrders)
  const websocket = useContext(WebSocketContext);
  console.log("websocket vendor incoming", websocket);
  const route = useRoute();
  const dispatch = useAppDispatch();
  //const { store }: RouteParams = route.params as RouteParams;
  const {
    acceptOrder,
    rejectOrder,
  } = useHandleIncomingOrders();

  const [pendingMemoOrder, setPendingMemoOrder] = useState<any[]>(getPendingOrdersList);
  const [acceptedOrders, setAcceptedOrders] = useState<any[]>(getAcceptedOrdersList);
  
  useEffect(() => {
    setPendingMemoOrder(getPendingOrdersList);
    setAcceptedOrders(getAcceptedOrdersList);
  })
  useEffect(() => {
    const handleWebSocketMessage = (event: any) => {
      const parseData = JSON.parse(event.data);
      Alert.alert(parseData.payload.userName);
      const incomingOrder = parseData.payload
      console.log(route.name)
      console.log(parseData)
     if (parseData.type === "incoming_order" && route.name === "Orders" && incomingOrder.accepted === "pending") {
       
      // This one needs testing, a lot of testing...
      dispatch(addIncomingOrder([incomingOrder]))
      }
      if(parseData.type === "return_change_accepted" && route.name == "Orders" && incomingOrder.accepted === "rejected"){
        //
        dispatch(removeFromPending(incomingOrder))
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
