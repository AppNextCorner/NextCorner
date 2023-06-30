import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
/**
 *
 * Displays the screen with the message shown to the user when the item went through successfully with the order
 */
const OrderPlacedPage = () => {
  const navigation = useNavigation();
  const goToOrders = () => {
    navigation.navigate("Orders");
  };
  return (
    <View style={styles.orderPlacedContainer}>
      <View style={styles.alertContainer}>
        <Image source={require("assets/logo.png")} style={styles.iconImage} />
        <Text style={styles.header}>
          Your order has been successfully placed
        </Text>
        <Text style={styles.text}>
          Your orders is being worked on. It'll take a couple of minutes to
          complete!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToOrders} style={styles.goHomeButton}>
          <Text style={styles.buttonText}>Check your order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderPlacedPage;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
  },
  text: {
    margin: 10,
    textAlign: "center",
  },
  iconImage: {
    width: "50%",
    height: "25%",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
  buttonContainer: {
    flex: 0,
    justifyContent: "flex-end",
    marginBottom: 50,
    marginHorizontal: 10,
  },
  alertContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  orderPlacedContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  goHomeButton: {
    backgroundColor: "#78DBFF",
    padding: "5%",
    paddingHorizontal: "35%",
    borderRadius: 20,
  },
});
