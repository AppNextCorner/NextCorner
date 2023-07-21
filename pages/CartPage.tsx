/**
 * Purpose: After user has selected items, then this screen would be updated to include the selected items
 * note: Total number of selected items, price, etc will need to be added here
 */

import React from "react";
import { useAppSelector } from "../store/hook";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import useCart from "hooks/handleVendors/useCart.hook";
import { getCart } from "../store/slices/addToCartSessionSlice";
/**
 *
 * After user finishes selecting an item and wants to proceed, they can remove from items cart list
 * Add to order page after clicking on proceed button
 */

const emptyImage = require("assets/emptyCartImage.png");

const CartPage = () => {
  const { updateCartItemAmount } = useCart(); // be able to increment or decrement the amount in which ever cart item is updated from the user
  // navigation part of the screen
  const navigation = useNavigation<NavigationProp<any>>();
  const goHome = () => {
    navigation.goBack();
  };
  const goToPayment = () => {
    navigation.navigate('PaymentDetails')
  };
  const cart = useAppSelector(getCart);
  
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Pressable style={styles.goBackButton} onPress={goHome}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </Pressable>

      {cart.length > 0 ? (
        <>
          <FlatList
            ListFooterComponent={
              <View style={styles.totalItemsContainer}></View>
            }
            data={cart}
            renderItem={({ item, index }) => {
              const getCartData = item.inCart;
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
                            uri: `${getCartData.image.toString()}`,
                          }}
                        />
                      </View>
                      <View style={styles.foodTexts}>
                        <Text style={styles.categoryText}>
                          {getCartData.name}
                        </Text>
                        <Text style={styles.descriptionOfItem}>
                          {getCartData.description}
                        </Text>
                        <Text style={styles.priceText}>
                          {getCartData.price}
                        </Text>
                      </View>

                      {/* Takes in 3rd part of the whole card containing increment and decrement icons to increase or decrease the amount of one single item gets */}
                      <View style={styles.amountContainer}>
                        <AntDesign
                          style={styles.icon}
                          name="minuscircle"
                          size={24}
                          color="#78DBFF"
                          onPress={() => {
                            updateCartItemAmount(-1, index);
                          }}
                        />
                        <Text>{getCartData.amountInCart}</Text>
                        <AntDesign
                          style={styles.icon}
                          name="pluscircle"
                          size={24}
                          color="#78DBFF"
                          onPress={() => {
                            updateCartItemAmount(1, index);
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
          />

          <View style={styles.bottomButtons}>
            <Text style={styles.businessText}>
              Ordered from: id
            </Text>
            {/* Payment button */}
            <View>
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
        </>
      ) : (
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.emptyImage} source={emptyImage} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.textContainer]}>Your cart is empty :(</Text>
            <Text style={[styles.text, styles.description]}>
              Looks like you have not added anything into your card. Go ahead
              and explore
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default CartPage;

const styles = StyleSheet.create({
  textContainer: {
    margin: "5%",
  },
  text: {
    textAlign: "center",
    fontSize: 25,

    fontWeight: "600",
  },
  description: {
    color: "#979899",
    fontSize: 15,
  },
  imageContainer: {
    alignSelf: "center",
    height: "40%",
    aspectRatio: 1,
    backgroundColor: "#f2f3f5",
    borderRadius: 100,
    margin: "15%",
    padding: "5%",
  },
  emptyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    opacity: 0.75,
  },
  totalItemsContainer: {
    marginBottom: "50%",
  },
  businessText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  bottomButtons: {
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: "5%",
    padding: "5%",
    borderRadius: 10,
    marginHorizontal: "2.5%",
    position: "absolute",
    bottom: "5%",

    shadowColor: "#c2c3c4",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
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
    borderRadius: 15,
    padding: "4%",
    paddingHorizontal: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e3e3e3",
    borderWidth: 2,
    flexDirection: "row",
    marginVertical: "5%",
  },
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
