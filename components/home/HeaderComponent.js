/**
 * Purpose of the component: It is going to display the user's location and as well as a clickable icon to navigate through the order page to show the user their orders
 */

import { StyleSheet, View, Text, Image, Alert, Pressable } from "react-native";
// import HomeIcon from 'assets/logo.png'
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getCart, setBusinessName } from "../../store/slices/addToCart";
import { Foundation } from "@expo/vector-icons";
import SearchComponent from "./SearchComponent";
import { useState } from "react";

const HomeIcon = require("assets/logo.png");
export default function HeaderComponent() {
  const [magnifyClicked, setMagnifyClicked] = useState(false);
  const navigation = useNavigation();
  //JSON.parse(JSON.stringify(getCartFromSlice))
  const getCartFromSlice = useAppSelector(getCart);
  const getCartOption = JSON.parse(JSON.stringify(getCartFromSlice));

  const dispatch = useAppDispatch();

  // setting up the businessname to that of our first cart item then check if the business is already there, and if it is, then we can proceed to that page, and if not then give an alert to the user
  const navigateCart = () => {
    if (getCartOption.length > 0) {
      //;
      navigation.navigate("Cart");
      // Change the state of the business in the cart page to match the business from the cart data
      dispatch(setBusinessName(getCartOption[0].businessOrderedFrom));
      // Remove any existing duplicate cart items
      getCartOption.filter(
        (item, index) => getCartOption.indexOf(item) === index
      );
    } else {
      Alert.alert("Buy some items to proceed...");
    }
  };
  const toggleSearch = () => {
    setMagnifyClicked((prev) => !prev);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.iconContainer}>
            <Image style={styles.nextCornerIcon} source={HomeIcon} />
          </View>

          <Text style={styles.appName}>Next Corner</Text>
        </View>

        <Pressable onPress={toggleSearch} style={styles.basketContainer}>
          <View style={styles.magnifyIcon}>
            <Foundation name="magnifying-glass" size={24} color="black" />
          </View>
        </Pressable>
        <Pressable
          style={styles.basketContainer}
          onPress={() => navigateCart()}
        >
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    alignSelf: "flex-end",
                    margin: 5,
                  }}
                ></View>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    alignSelf: "flex-start",
                    margin: 10,
                    marginBottom: 15,
                  }}
                >
                  <View></View>
                  <View
                    style={[
                      styles.amountContainer,
                      { flexDirection: "column" },
                    ]}
                  >
                    <Text style={styles.amount}>{getCartOption.length}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  zIndex: -1,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  position: "absolute",
                }}
              >
                <FontAwesome5
                  onPress={() => navigateCart()}
                  style={styles.shoppingIcon}
                  name="shopping-basket"
                  size={24}
                  color="black"
                />
              </View>
            </View>
          </View>
        </Pressable>
      </View>
      {magnifyClicked ? <SearchComponent /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: "3%",
    borderRadius: 5,
    backgroundColor: "#E4F8FF",
  },
  magnifyIcon: {
    flex: 2,
    justifyContent: "center",
  },
  amountContainer: {
    marginRight: -20,
    height: 20,
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#78DBFF",
    justifyContent: "center",
  },
  amount: {
    textAlign: "center",
    color: "#fff",
  },
  basketContainer: {
    flexDirection: "row",
    marginRight: 10,
    flex: 1, 
  },
  appName: {
    marginHorizontal: "5%",
    fontWeight: "600",
    fontSize: 15,
  },
  logoContainer: {
    flex: 10,
    flexDirection: "row",
    alignItems: "center",
   
  },
  nextCornerIcon: {
    marginTop: 2,
    width: 25,
    height: 25,
  },
  shoppingIcon: {
    flex: 1,
    justifyContent: "flex-end",
  },
  address: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    paddingTop: "15%",
    paddingHorizontal: "10%",
    paddingBottom: "5%",
  },
});
