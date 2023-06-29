/**
 * Purpose: Takes in data from the MenuListPage for a specific menu item and displays the data of that menu item here - the user should be able to select their own preference for that item
 */

import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import OptionSelectionComponent from "components/menu/OptionSelectionComponent";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getBusinessName, setBusinessName } from "../../store/slices/addToCart";
import useCart from "hooks/handleVendors/useCart";
import { auth } from "hooks/handleUsers/useFirebase";
import useOrderButton from "hooks/handlePages/useOrderButton";
import { useState } from "react";
import { IP } from "@env";

export default function ItemPage() {
  const { addToCart } = useCart();
  const { setOrder, order } = useOrderButton();

  const [render, setRender] = useState(false);

  const dispatch = useAppDispatch();
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { business, foodItem, location } = route.params;
  const businessName = useAppSelector(getBusinessName);

  useEffect(() => {
    // Create a deep copy of foodItem when render state changes
    Object.assign({}, { ...foodItem });
  }, [render]);

  const parse = { cartData: JSON.parse(JSON.stringify(foodItem)) };
  const name = (parse || {}).cartData;

  const resetOptions = name.customizations.flat().map((c) => c.selected);

  const goHome = async () => {
    setOrder(true);
    try {
      navigation.goBack();
      if (order === true) {
        for (let i = 0; i < resetOptions.length; i++) {
          resetOptions[i] = false;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const goToCartButton = async () => {
    const userId = auth.currentUser.uid;
    const addItem = name;
    setOrder(true);
    if (businessName === "" || business === businessName) {
      try {
        const { payload } = await addToCart(
          addItem,
          userId,
          business,
          location
        );
        console.log("cart payload: ", payload);
        console.log(addItem.customizations[0].optionCustomizations);
        dispatch(setBusinessName(business));
        for (let i = 0; i < resetOptions.length; i++) {
          resetOptions[i] = false;
        }
        navigation.goBack();
      } catch (e) {
        console.log("error");
      }
    } else {
      Alert.alert("Added item from a different business");
    }
  };

  // Bug Issue: When uploading an option, option customizations are all the same
  // Potential Fix: Get only the selected options for that category option
  const handleOptionSelect = (selectedOptions, customization) => {
    // Perform the necessary logic with the selected options
    // Update the selected options in the foodItem object
    name.customizations.forEach((option, index) => {
      for (let i = 0; i < customization.length; i++) {
        console.log(
          "option name: ",
          option.name,
          " custom name: ",
          customization[i].name,
          "SELECTION: ",
          option.name == customization[i].name
        );
        if (option.name == customization[i].name) {
          console.log(
            "custom name: ",
            customization[i].name,
            "option.optionCustomizations: ",
            option.optionCustomizations
          );
          option.optionCustomizations = selectedOptions;
        }
      }
    });
    // You can update the state or perform any other actions based on the selected options
  };

  const Header = () => {
    return (
      <>
        <Pressable style={styles.goBackButton} onPress={goHome}>
          <AntDesign name="arrowleft" size={40} color="white" />
        </Pressable>

        <Image
          style={styles.image}
          source={{
            uri: `https://nextcornerdevelopment.onrender.com/${foodItem.image.toString()}`,
          }}
        />

        <View style={styles.headerContainer}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{foodItem.name}</Text>
            <Text style={styles.price}>${foodItem.price}</Text>
          </View>
          <Text style={styles.description}>{foodItem.description}</Text>
          <View style={styles.ratingContainer}>
            <AntDesign
              style={styles.star}
              name="star"
              size={20}
              color="#ffc247"
            />
            <Text style={styles.ratingText}>{foodItem.rating}</Text>
            <Text style={styles.info}>Rating and reviews</Text>
            <AntDesign
              style={styles.arrowRight}
              name="arrowright"
              size={30}
              color="black"
            />
          </View>
        </View>
        <View style={styles.customizeText}>
          <Text style={styles.custom}>Customize</Text>
        </View>
      </>
    );
  };

  return (
    <>
      <StatusBar style="light" />

      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <OptionSelectionComponent
            header={Header}
            data={foodItem.customizations}
            render={setRender}
            onSelect={(selectedOptions) =>
              handleOptionSelect(selectedOptions, name.customizations)
            }
            stateRender={render}
          />
        </View>

        <View style={[styles.shadowOffSet, styles.buttonContainer]}>
          <TouchableOpacity
            disabled={order}
            style={styles.orderButton}
            onPress={goToCartButton}
          >
            <Text style={styles.orderButtonText}>
              Add to Cart ${foodItem.price}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Header styles
  info: {
    flex: 6,
  },
  arrowRight: {
    flex: 1,
    paddingHorizontal: 20,
  },
  star: {},
  ratingText: {
    paddingHorizontal: 10,
    flex: 1,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: "3%",
    margin: 5,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 4,
  },
  price: {
    flex: 1,
    fontSize: 18,
  },
  headerText: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    margin: 10,
  },
  custom: {
    margin: "5%",
    fontSize: 15,
    fontWeight: "600",
  },
  customizeText: {
    marginHorizontal: "5%",
    marginTop: "5%",
    borderColor: "#f2f0f0",
    borderWidth: 3,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: -40,

    borderColor: "#f2f0f0",
    borderStyle: "solid",
    borderWidth: 3,
  },
  orderButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  goBackButton: {
    zIndex: 2,
    margin: 20,
    marginTop: 40,
    flex: 1,
  },
  description: {
    flex: 0,
    marginVertical: 5,
    marginHorizontal: 10,
    width: 250,
    color: "#808080",
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    marginTop: -105,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  shadowOffSet: {
    shadowOffset: { width: -2, height: 3 },
    shadowColor: "#171717",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonContainer: {
    backgroundColor: "#fff",
  },
  orderButton: {
    backgroundColor: "#78DBFF",
    margin: 15,
    padding: 15,
    borderRadius: 20,
    marginBottom: "10%",
  },
});
