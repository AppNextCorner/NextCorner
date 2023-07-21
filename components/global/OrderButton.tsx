import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { getCart, } from "../../store/slices/addToCartSessionSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import orderItem from "../../typeDefinitions/interfaces/orderItem.interface";

const OrderButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const getCartFromSlice = useAppSelector(getCart);
  
  console.log('cart from slice: ', getCartFromSlice);
  const navigateCart = () => {
    navigation.navigate("Cart");

  };

  // check if there are any items in the cart
  if (getCartFromSlice.length > 0) {
    return (
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => navigateCart()}
      >
        <View style={styles.orderButtonContainer}>
          <Text style={styles.orderButtonText}>View Cart</Text>
          <Text style={styles.cartLengthText}>{getCartFromSlice.length}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  cartLengthText: {
    color: "white",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 5,

    borderColor: "#fff",
    padding: "2.5%",
  },
  orderButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  orderButton: {
    backgroundColor: "#78DBFF",
    padding: "5%",
    borderRadius: 20,
    margin: "5%",
    bottom: '10%',
    width: '90%',
    position: "absolute",
  },
  orderButtonText: {
    flex: 7,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default OrderButton;
