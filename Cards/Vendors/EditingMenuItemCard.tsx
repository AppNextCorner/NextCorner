import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
const logo = require("assets/logo.png");
//import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
//import * as Swipeable from 'react-native-swipeable';
import Swipeable from "react-native-gesture-handler/Swipeable";

import { makePutRequest } from "../../config/axios.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
/**
 * The default business card item
 * @param {*} props - be able to pass additional properties through the cart after coming from the business property prior to this page
 *
 */
interface Props {
  menuItem: Iitem;
  disabled?: boolean;
}

const renderRightActions = () => {
  return (
    <View style={styles.rightActionContainer}>
      <Text style={styles.deleteText}>Delete</Text>
    </View>
  );
};

const EditingMenuItemCard = ({ menuItem, disabled }: Props) => {
  console.log("put request: ");
  const await4 = async () => {
    console.log(
      await makePutRequest("/business/items/deleteItem", {
        itemId: menuItem._id,
        vendorId: menuItem.storeInfo.storeId,
      })
    );
  };
  await4();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  let limitTextAmount = menuItem.description.slice(0, 20) + "...";

  if (!disabled) {
    return (
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <View style={styles.card}>
            <View style={styles.imageBox}>
              <Image
                style={styles.foodImages}
                source={
                  menuItem.image
                    ? {
                        uri: menuItem.image,
                      }
                    : logo
                }
              />
            </View>
            <View style={styles.foodTexts}>
              <Text style={styles.categoryText}>{menuItem.name}</Text>
              <Text style={styles.descriptionOfItem}>{limitTextAmount}</Text>
              <Text style={styles.priceText}>
                ${Math.fround(menuItem.price)}
              </Text>
            </View>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }
  return (
    <TouchableOpacity
      // passing data through the FoodDetails page to access the selection data from the menu list
      style={styles.foodCategoryStyle}
      disabled={disabled}
    >
      <View style={styles.card}>
        <View style={styles.imageBox}>
          <Image
            style={styles.foodImages}
            source={
              menuItem.image
                ? {
                    uri: menuItem.image,
                  }
                : logo
            }
          />
        </View>
        <View style={styles.foodTexts}>
          <Text style={styles.categoryText}>{menuItem.name}</Text>
          <Text style={styles.descriptionOfItem}>{limitTextAmount}</Text>
          <Text style={styles.priceText}>${Math.fround(menuItem.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EditingMenuItemCard;

const styles = StyleSheet.create({
  itemContainer: {
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  rightActionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "red",
    paddingHorizontal: 16,
  },
  deleteText: {
    color: "white",
  },
  descriptionOfItem: {
    flex: 1,
    fontSize: 10,
    color: "#97989F",

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
    // fontFamily: 'monospace',
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
    borderRadius: 5,
  },
  card: {
    width: 250,
    height: 115,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  priceText: {
    flex: 1,
    alignContent: "flex-end",
    color: "grey",
    marginTop: 0,
  },
  foodTexts: {
    flex: 2,
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
