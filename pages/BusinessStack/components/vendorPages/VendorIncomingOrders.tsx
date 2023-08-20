import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import AllOrdersList from "components/vendors/handle/AllOrdersList";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import useHandleIncomingOrders from "hooks/handleOrders/useHandleIncomingOrders";
import { WebSocketContext } from "../../../../context/incomingOrderContext";
import {
  getAcceptedOrders,
  getPendingOrders,
} from "../../../../store/slices/WebsocketSlices/IncomingOrderSlice";
const VendorIncomingOrders = () => {
  const getAcceptedOrdersList = useAppSelector(getAcceptedOrders);
  const getPendingOrdersList = useAppSelector(getPendingOrders);
  const websocket = useContext(WebSocketContext);
  console.log("websocket vendor incoming", websocket);
  const dispatch = useAppDispatch();
  //const { store }: RouteParams = route.params as RouteParams;
  const { acceptOrder, rejectOrder, completeOrder } = useHandleIncomingOrders();

  const [pendingMemoOrder, setPendingMemoOrder] =
    useState<any[]>(getPendingOrdersList);
  const [acceptedOrders, setAcceptedOrders] = useState<any[]>(
    getAcceptedOrdersList
  );

  useEffect(() => {
    setPendingMemoOrder(getPendingOrdersList);
    setAcceptedOrders(getAcceptedOrdersList);
  }, [dispatch, websocket, ]);


  // Step 2: Create state variables for the toggle and orderes
  // const [isToggleOn, setIsToggleOn] = useState(false);
  // const [pendingOrders, setPendingOrders] = useState<Iorder[] | undefined>();

  // Toggle handler for when the store is open
  // // // const toggleHandler = () => {
  // //   setIsToggleOn(!isToggleOn);
  // };

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
