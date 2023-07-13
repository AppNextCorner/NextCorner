import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useOrderButton from "hooks/handlePages/useOrderButton";
import { AntDesign } from "@expo/vector-icons";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
import { location } from "../../typeDefinitions/interfaces/location.interface";

interface IProps {
  menuItem: Iitem | null;
  vendorName: string | null;
  location: location | null
}

const FeaturedTypeCard = (props: IProps) => {
  // Button hook to prevent multiple presses
  const { setOrder } = useOrderButton();
  // Data coming from the business to be sent towards the food details page
  const { menuItem, vendorName, location } = props;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goToFoodDetails = () => {
    setOrder(false);
    navigation.navigate("Item", {
      //  Props data sent to food details to be able to display the details
      business: vendorName,
      menuItem: menuItem,
      location: location,
    });
  };
  if(menuItem){
    return (
      <View style={[styles.cardContainer, styles.shadowBox]}>
        <TouchableOpacity onPress={() => goToFoodDetails()}>
          <View style={styles.container}>
            <View style={styles.ratingContainer}>
              <AntDesign
                style={styles.star}
                name="star"
                size={20}
                color="#ffc247"
              />
              <Text style={styles.rating}>{menuItem.rating}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={{uri: menuItem.image}} style={styles.image} />
            </View>
  
            <View style={styles.itemDescription}>
              <Text style={styles.menuItemName}>{menuItem.name}</Text>
              <Text style={styles.descriptionText}>
                {menuItem.description.slice(0, 45) + "..."}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.menuItemPrice}>
                ${Math.fround(menuItem.price)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  else{
    return null
  }
  
};

export default FeaturedTypeCard;

const styles = StyleSheet.create({
  shadowBox: {
    shadowOffset: { width: -2, height: 3 },
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  star: {
    paddingVertical: 5,
  },
  rating: {
    flex: 1,
    margin: "2%",
  },
  ratingContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
  descriptionText: {
    marginVertical: "2%",
    fontSize: 10,
    color: "#9c9c9c",
  },
  imageContainer: {
    flex: 2,
  },
  menuItemPrice: {
    marginTop: 5,
    color: "#818281",
    fontWeight: "600",
  },
  menuItemName: {
    fontWeight: "600",
    fontSize: 16,
  },
  // image styles for card
  image: {
    width: "100%",
    height: 125,
    borderRadius: 5,
    flex: 1,
  },
  // description of the card styles
  itemDescription: {
    flex: 1,
    width: 150,
    paddingVertical: 10,
    overflow: "hidden",
  },
  priceContainer: {
    flex: 0.5,
  },
  container: {
    marginHorizontal: 10,
    flex: 1,
    width: 155,
    height: 200,
  },
});
