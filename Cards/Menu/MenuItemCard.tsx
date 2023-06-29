import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import useOrderButton from "hooks/handlePages/useOrderButton";
import { useEffect } from "react";
// import { IP } from "@env";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { itemType } from "../../types/interfaces/item.interface";

/**
 * The default business card item
 * @param {*} props - be able to pass additional properties through the cart after coming from the business property prior to this page
 *
 */

/**
 *  TO DOO
 *
 *  location is what?
 */
interface Props {
  foodItem: itemType;
  businessName: string;
  location: any;
}
export default function MenuItemCard({
  foodItem,
  businessName,
  location,
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { setOrder } = useOrderButton();
  // Match the location to the current location
  useEffect(() => {
    location;
  });

  // Section to re-new the option selection buttons for the menu item - IMPORTANT
  Object.assign({}, { ...foodItem });
  const parse = { cartData: JSON.parse(JSON.stringify(foodItem)) };

  let limitTextAmount = foodItem.description.slice(0, 75) + "...";
  const goToFoodDetails = () => {
    setOrder(false);
    navigation.navigate("Item", {
      business: businessName,
      foodItem: parse.cartData,
      location: location,
    });
  };
  return (
    // Each card is going to have a different data source, so we need to create a custom button being the touchable opacity in order to navigate through the cards and as well as pass in data through the cards with navigation
    <TouchableOpacity
      // passing data through the FoodDetails page to access the selection data from the menu list
      onPress={() => goToFoodDetails()}
      style={styles.foodCategoryStyle}
    >
      <View style={styles.card}>
        <View style={styles.imageBox}>
          <Image
            style={styles.foodImages}
            source={{
              uri: `https://nextcornerdevelopment.onrender.com/${foodItem.image.toString()}`,
            }}
          />
        </View>
        <View style={styles.foodTexts}>
          <Text style={styles.categoryText}>{foodItem.name}</Text>
          <Text style={styles.descriptionOfItem}>{limitTextAmount}</Text>
          <Text style={styles.priceText}>${Math.fround(foodItem.price)}</Text>
        </View>
        {/* Store image with button  */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
