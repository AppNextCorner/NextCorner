import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import useHandleIncomingOrders from "../../../classes/businessStack/vendors/IncomingOrders.class";
import { useAppSelector } from "../../../store/hook";
import { getUserBusiness } from "../../../store/slices/BusinessSlice/businessSessionSlice";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";

const IncomingOrderAlert = () => {
  const stores = useAppSelector(getUserBusiness);
  const store = stores !== null ? stores![0] : null;
  const storeId = store === null ? "" : store.id || "";

  const [incomingOrders, setIncomingOrders] = useState<{
    pendingOrders: Iorder[];
    acceptedOrders: Iorder[];
  } | null>(null);

  // Separate function to fetch incoming orders
  const fetchIncomingOrders = async () => {
    try {
      const orders = await useHandleIncomingOrders(storeId);
      setIncomingOrders(orders);
    } catch (error) {
      console.error("Error fetching incoming orders:", error);
    }
  };

  useEffect(() => {
    fetchIncomingOrders(); // Fetch incoming orders when the component mounts
  }, [storeId]);

  // Add a check for incomingOrders and pendingOrders before accessing their lengths
  const pendingOrdersLength = incomingOrders?.pendingOrders?.length || 0;

  return (
    <ModalLayout visible={true}>
      <Text style={styles.headerText}>Orders pending</Text>
      <Text style={styles.messageText}>There are {pendingOrdersLength} pending orders</Text>
    </ModalLayout>
  );
};

export default IncomingOrderAlert;

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    },
    modalContainer: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      elevation: 5, // For Android elevation shadow
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    messageText: {
      fontSize: 16,
      marginBottom: 20,
    },
  
    dismissButtonText: {
      fontSize: 16,
      color: "#333",
    },
  });