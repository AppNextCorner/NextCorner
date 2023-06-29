/**
 * Purpose: After user has selected items, then this screen would be updated to include the selected items
 * note: Total number of selected items, price, etc will need to be added here
 */

import React, { useEffect } from "react";

import {
  getBusinessName,
  getCart,
  orderPlaced,
  setBusinessName,
  calculateTotals,
} from "../store/slices/addToCart";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import useCart from "hooks/handleVendors/useCart";
import { IP } from "@env";
/**
 *
 * After user finishes selecting an item and wants to proceed, they can remove from items cart list
 * Add to order page after clicking on proceed button
 */

const CartPage = () => {
  const { updateCartItemData } = useCart(); // be able to increment or decrement the amount in which ever cart item is updated from the user
  const dispatch = useAppDispatch();
  // navigation part of the screen
  const navigation = useNavigation();
  const goHome = () => {
    navigation.goBack();
    dispatch(orderPlaced());
  };
  const goToPayment = () => {
    navigation.navigate("PaymentDetails");
    dispatch(calculateTotals()); // grab the total amount and the price of each item for our transaction in the PaymentDetails page
  };

  const getCartFromSlice = useAppSelector(getCart);
  const isCartFull = JSON.parse(JSON.stringify(getCartFromSlice));
  const businessName = useAppSelector(getBusinessName);

  // Checking if the cart is full or empty based on the amount of cart items there are and be able to filter any duplicates and set the business name to be empty is the cart is empty
  useEffect(() => {
    if (isCartFull.length === 0) {
      console.log("empty cart");
      dispatch(setBusinessName(""));
      isCartFull.filter((item, index) => isCartFull.indexOf(item) === index);
    } else if (isCartFull.length > 0) {
      isCartFull.filter((item, index) => isCartFull.indexOf(item) === index);
    }
  }, [isCartFull, dispatch]);

  let text = "Lorem ipsum dol";

  let limitTextAmount = text.slice(0, 75) + "";
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Pressable style={styles.goBackButton} onPress={goHome}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </Pressable>

      <FlatList
        data={isCartFull}
        renderItem={({ item }) => {
          const grabCartItem = item.cartData;

          return (
            <>
              {/* Display cards added */}
              <TouchableOpacity
                disabled={true}
                style={styles.foodCategoryStyle}
              >
                <View style={styles.card}>
                  <View style={styles.imageBox}>
                    <Image
                      style={styles.foodImages}
                      source={{
                        uri: `https://nextcornerdevelopment.onrender.com/${grabCartItem.image.toString()}`,
                      }}
                    />
                  </View>
                  <View style={styles.foodTexts}>
                    <Text style={styles.categoryText}>{grabCartItem.name}</Text>
                    <Text style={styles.descriptionOfItem}>
                      {grabCartItem.description}
                    </Text>
                    <Text style={styles.priceText}>{grabCartItem.price}</Text>
                  </View>

                  {/* Takes in 3rd part of the whole card containing increment and decrement icons to increase or decrease the amount of one single item gets */}
                  <View style={styles.amountContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="minuscircle"
                      size={24}
                      color="#78DBFF"
                      onPress={() => {
                        const updatedCartItem = {
                          ...grabCartItem,
                          amountInCart: (grabCartItem.amountInCart -= 1),
                        };
                        updateCartItemData({
                          updatedCartItem: updatedCartItem,
                          id: item.id,
                        });
                      }}
                    />
                    <Text>{grabCartItem.amountInCart}</Text>
                    <AntDesign
                      style={styles.icon}
                      name="pluscircle"
                      size={24}
                      color="#78DBFF"
                      onPress={() => {
                        const updatedCartItem = {
                          ...grabCartItem,
                          amountInCart: (grabCartItem.amountInCart += 1),
                        };
                        updateCartItemData({
                          updatedCartItem: updatedCartItem,
                          id: item.id,
                        });
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />

      <View>
        <View style={styles.bottomButtons}>
          <Text style={styles.businessText}>Ordered from: {businessName}</Text>
          {/* Payment button */}
          <View style={styles.proceedToPaymentContainer}>
            <TouchableOpacity
              onPress={() => goToPayment()}
              style={styles.proceedToPaymentButton}
            >
              <Text style={styles.proceedToPaymentText}>
                Proceed to payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CartPage;

const styles = StyleSheet.create({
  businessText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  bottomButtons: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: "10%",
  },
  addItemsButtonContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: "1%",
  },
  addItemsButton: {
    backgroundColor: "#DFDFDF",
    padding: "4%",
    borderRadius: 20,
  },
  proceedToPaymentText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  proceedToPaymentButton: {
    backgroundColor: "#78DBFF",
    borderRadius: 20,
    padding: "4%",
    paddingHorizontal: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e3e3e3",
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "row",
    marginVertical: "5%",
  },
  proceedToPaymentContainer: {},
  amountContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  icon: {
    margin: 10,
  },
  goBackButton: {
    margin: "10%",
    marginTop: "15%",
  },
  descriptionOfItem: {
    flex: 1,
    fontSize: 10,

    //fontFamily: 'monospace',
  },
  imageBox: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
    flex: 1,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: "bold",
    //fontFamily: 'monospace',
    marginTop: 15,
    flex: 1,
  },
  foodImages: {
    width: "50%",
    flex: 1,

    // Increase the image size
    padding: "30%",
    marginLeft: 25,
    marginTop: "18%",
    marginBottom: "70%",
    borderRadius: 10,
  },
  card: {
    width: 250,
    height: 115,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  priceText: {
    flex: 1,
    alignContent: "flex-end",
    color: "#97989F",
    marginTop: 0,
  },
  foodTexts: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 5,
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "#fff",
    borderColor: "#d6d6d6",
    borderStyle: "solid",

    borderBottomWidth: 1,
    marginBottom: -0.1,
    marginTop: 0,
  },
});
