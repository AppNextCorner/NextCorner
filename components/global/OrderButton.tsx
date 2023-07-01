import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { getCart, setBusinessName } from "../../store/slices/addToCart";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import orderItem from "../../typeDefinitions/interfaces/orderItem.interface";

const OrderButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const getCartFromSlice = useAppSelector(getCart);
  const cart = JSON.parse(JSON.stringify(getCartFromSlice));
  const dispatch = useAppDispatch();
  // setting up the businessname to that of our first cart item then check if the business is already there, and if it is, then we can proceed to that page, and if not then give an alert to the user
  const navigateCart = () => {

    if (cart.length > 0) {
      //;
      navigation.navigate("Cart");
      // Change the state of the business in the cart page to match the business from the cart data
      dispatch(setBusinessName(cart[0].businessOrderedFrom));
      // Remove any existing duplicate cart items
      cart.filter(
        (cartItem: orderItem, index: number) => cart.indexOf(cartItem) === index
      );
    } else {
      Alert.alert("Buy some items to proceed...");
    }
  };

  // check if there are any items in the cart
  if (cart.length > 0) {
    return (
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => navigateCart()}
      >
        <View style={styles.orderButtonContainer}>
          <Text style={styles.orderButtonText}>View Cart</Text>
          <Text style={styles.cartLengthText}>{cart.length}</Text>
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
