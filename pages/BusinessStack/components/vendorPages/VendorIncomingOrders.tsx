import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import AllOrdersList from "components/vendors/handle/AllOrdersList";
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
  const getAcceptedOrdersList = useAppSelector(getAcceptedOrders);
  const getPendingOrdersList = useAppSelector(getPendingOrders);
  const websocket = useContext(WebSocketContext);
  console.log("websocket vendor incoming", websocket);
  const route = useRoute();
  const dispatch = useAppDispatch();
  //const { store }: RouteParams = route.params as RouteParams;
  const { acceptOrder, rejectOrder, completeOrder } = useHandleIncomingOrders();

  const [pendingMemoOrder, setPendingMemoOrder] =
    useState<any[]>(getPendingOrdersList);
  const [acceptedOrders, setAcceptedOrders] = useState<any[]>(
    getAcceptedOrdersList
  );

  const handleWebSocketMessage = (event: any) => {
    const parseData = JSON.parse(event.data)
    const incomingOrder = parseData.payload
   if (parseData.type === "incoming_order" && incomingOrder.accepted === "pending") {
    // This one needs testing, a lot of testing...
    dispatch(addIncomingOrder([incomingOrder]))
    }
    else if(parseData.type === "return_change_accepted" && route.name == "Orders" && incomingOrder.accepted === "rejected"){
      dispatch(removeFromPending(incomingOrder));
    }
  };

  
  useEffect(() => {
    setPendingMemoOrder(getPendingOrdersList);
    setAcceptedOrders(getAcceptedOrdersList);
  }, [dispatch, websocket, handleWebSocketMessage]);



    websocket.onmessage = handleWebSocketMessage;


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
        {/* <View style={styles.headerText}>
          <Text>Accepting</Text>
        </View> */}
      </View>

      <View style={styles.header}>
        {/* Step 3: Toggle Button */}
        {/* <TouchableOpacity onPress={toggleHandler}>
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
        </TouchableOpacity> */}
      </View>
      <View style={styles.listHeaderContainer}>
        <Text style={[styles.listHeader]}>Incoming Orders</Text>
      </View>
      {/* Step 5: Display orders once they are available */}
      {pendingMemoOrder !== undefined && (
        <View style={styles.list}>
          <AllOrdersList
            orders={pendingMemoOrder}
            acceptMethod={acceptOrder}
            rejectMethod={rejectOrder}
          />
        </View>
      )}
      <View style={styles.listHeaderContainer}>
        <Text style={[styles.listHeader]}>Accepted Orders</Text>
      </View>

      {acceptedOrders !== undefined && (
        <View style={styles.list}>
          <AllOrdersList
            completeMethod={completeOrder}
            orders={acceptedOrders}
          />
        </View>
      )}
    </View>
  );
};

export default VendorIncomingOrders;

const styles = StyleSheet.create({
  listHeaderContainer: { margin: "2.5%" },
  listHeader: { fontWeight: "bold", fontSize: 17 },
  list: { flex: 1 },
  headerText: { marginTop: "7.5%", fontWeight: "bold" },
  header: { flexDirection: "row", alignItems: "center" },
  page: { flex: 1, backgroundColor: "#fff" },
  subHeader: { flex: 1, backgroundColor: "#fff", marginHorizontal: "5%" },
});
