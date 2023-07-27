import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { useRoute } from "@react-navigation/native";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import AllOrdersList from "components/vendors/handle/AllOrdersList";
import { Iorder } from "../../../../typeDefinitions/interfaces/order.interface";
import useHandleIncomingOrders from "../../../../classes/businessStack/vendors/IncomingOrders.class";
import { toggleButton } from "../../../../styles/components/toggleStyles";
import { useAppSelector } from "../../../../store/hook";
import { getUserBusiness } from "../../../../store/slices/BusinessSlice/businessSessionSlice";
interface RouteParams {
  store?: { store: vendorStructure };
}
const VendorIncomingOrders = () => {
  const route = useRoute();
  const stores = useAppSelector(getUserBusiness);
  const store = stores !== null ? stores![0] : null
  //const { store }: RouteParams = route.params as RouteParams;
  const storeName = store!.name!;

  // Step 1: Use the custom hook to get the incomingOrders object
  const incomingOrders = useHandleIncomingOrders(storeName);

  // Step 2: Create state variables for the toggle and orderes
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<Iorder[] | undefined>();
  const [acceptedOrders, setAcceptedOrders] = useState<Iorder[] | undefined>();

  // Toggle handler for when the store is open
  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };

  // Step 3: useEffect to update orders state when incomingOrders is available
  useEffect(() => {
   
    setPendingOrders(incomingOrders?.pendingOrders);
    setAcceptedOrders(incomingOrders?.acceptedOrders);

    console.log("Pending orders:", incomingOrders.pendingOrders);
    console.log("Accepted orders:", incomingOrders.acceptedOrders);
  }, [incomingOrders]);

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
              isToggleOn ? toggleButton.toggleButtonOn : toggleButton.toggleButtonOff,
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
      {/* Step 5: Display orders once they are available */}
      {pendingOrders !== undefined && (
        <View>
          <AllOrdersList
            orders={pendingOrders}
            acceptMethod={incomingOrders?.acceptOrder}
            rejectMethod={incomingOrders?.rejectOrder}
          />
        </View>
      )}

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
