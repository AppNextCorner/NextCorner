import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import useOrderButton from "hooks/handlePages/useOrderButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
const logo = require('assets/logo.png')
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
/**
 * The default business card item
 * @param {*} props - be able to pass additional properties through the cart after coming from the business property prior to this page
 *
 */
interface Props {
  menuItem: Iitem;
  vendorName?: string;
}
export default function MenuItemCard({
  menuItem,
  vendorName,
  
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { setOrder } = useOrderButton();

  // Section to re-new the option selection buttons for the menu item - IMPORTANT
  Object.assign({}, { ...menuItem });
  const parse = { cartData: JSON.parse(JSON.stringify(menuItem)) };

  let limitTextAmount = menuItem.description.slice(0, 20) + "...";
  const goToFoodDetails = () => {
    setOrder(false);
    navigation.navigate("Item", {
      business: vendorName,
      menuItem: parse.cartData,
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
            source={menuItem.image ? {
              uri: menuItem.image
            }: logo}
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
