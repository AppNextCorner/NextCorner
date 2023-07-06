import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ViewStyle,
  StyleProp,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { vendor } from "../../typeDefinitions/interfaces/vendor.interface";
const logo = require("assets/logo.png");

interface Props {
  businessItem: vendor;
  checkForStyleChange?: boolean;
  disabled?: boolean;
}

export default function BusinessCard({
  businessItem,
  checkForStyleChange,
  disabled
  
}: Props) {
  // The style is changed when a category is selected on the home page
  const changeStyle = (
    checkForStyleChange: boolean | undefined
  ): StyleProp<ViewStyle> => {
    let change: StyleProp<ViewStyle> =
      checkForStyleChange === true
        ? {
            // For the category business list
            height: 250,
            width: "100%",
          }
        : // for the default business list on home screen to display it smaller then the category business list
          {
            height: 200,
            width: 275,
          };
    return change;
  };
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    // Each card is going to have a different data source, so we need to create a custom button being the touchable opacity in order to navigate through the cards and as well as pass in data through the cards with navigation
    <TouchableOpacity
      // pass in data of business items / all of business, but pin pointing which business data to get
      disabled={disabled}
      onPress={() =>
        navigation.navigate("MenuList", { business: businessItem })
      }
      style={styles.foodCategoryStyle}
    >
      <View
        style={
          checkForStyleChange
            ? changeStyle(checkForStyleChange)
            : {
                height: 200,
                width: 275,
              }
        }
      >
        <View
          style={businessItem.image ? styles.vendorImageContainer : styles.noVendorImageContainer}
        >
          <Image
            style={businessItem.image ? styles.vendorImage : styles.noVendorImage}
            source={businessItem.image ? { uri: businessItem.image } : logo}
          />
        </View>

        <View style={styles.foodTexts}>
          <MaterialIcons name="store" size={24} color="#606160" />
          <Text style={styles.businesText}>{businessItem.name}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={12} color="#ffc247" />
          <Text style={styles.ratingText}>{businessItem.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: "3%",
  },
  ratingText: {
    color: "#9a9c9a",
  },
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
  },
  businesText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#606160",
    flex: 1,
  },
  vendorImage: {
    width: "100%",
    flex: 1,
    height: 150,
  },
  noVendorImageContainer: {
    flex: 5,
    width: "100%",
  },
  vendorImageContainer: {
    flex: 5,
    width: "100%",
  },
  noVendorImage: {
    flex:1,
    width: 175,
    height: 250,
    margin: "2%",
    alignSelf: "center",
    objectFit: "scale-down",
    tintColor: 'gray',
    opacity: 0.5
  },
  card: {
    width: 250,
    height: 250,
    flex: 1,
  },
  priceText: {
    flex: 1,
    alignContent: "flex-end",
    color: "#97989F",
  },
  foodTexts: {
    flexDirection: "row",
    marginLeft: "2%",
    marginVertical: "1%",
    alignItems: "center",
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    borderColor: "#f2f0f0",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 15,
    paddingBottom: 7,
  },
});
