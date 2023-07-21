import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

import moment from "moment";
import "moment-timezone";
import { useNavigation } from "@react-navigation/native";
import useOrderButton from "hooks/handlePages/useOrderButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import orderItem from "../../typeDefinitions/interfaces/orderItem.interface";

interface Props {
  previousOrders: orderItem;
  vendorName: string;
}

const PreviousOrderCard = (props: Props) => {
  const { previousOrders, vendorName } = props;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { setOrder } = useOrderButton();

  const getPreviousItemData = previousOrders.inCart;
  // creating a new order date object with moment to show when the order was created
  const getTimeOrdered = moment(
    new Date(previousOrders.createdAt!), // comes from mongodb document timestamps
    "YYYY-M-D H:mm"
  )
    .tz("America/Los_Angeles") // timezone for the time

    .format("dddd, MMM D");

  const goToFoodDetails = () => {
    setOrder(false);
    navigation.navigate("Item", {
      business: vendorName,
      menuItem: getPreviousItemData,
    });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => goToFoodDetails()}
        style={styles.previousOrderButton}
      >
        <View style={styles.card}>
          {/* <View style={styles.imageBox}>
            <Image
              style={styles.foodImages}
              source={getPreviousItemData.image}
            />
          </View> */}
          <View style={styles.foodTexts}>
            <Text style={styles.categoryText}>
              {getPreviousItemData.name} x{getPreviousItemData.amountInCart}
            </Text>
            {/* get previous order details */}

            {/* time last ordered */}

            {/* timeOrdered not defined? */}
            <Text>Last Ordered: {getTimeOrdered}</Text>
            <Text style={styles.priceText}>
              ${getPreviousItemData.price * getPreviousItemData.amountInCart}
            </Text>
          </View>
          {/* Store image with button  */}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PreviousOrderCard;

const styles = StyleSheet.create({
  previousOrderButton: {
    margin: 10,
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
    width: "25%",
    flex: 1,

    // Increase the image size
    padding: "50%",

    borderRadius: 5,
  },
  card: {
    width: 250,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    padding: "3%",
    height: 125,
    borderColor: "#f2f0f0",
    borderStyle: "solid",
    borderWidth: 2,
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
