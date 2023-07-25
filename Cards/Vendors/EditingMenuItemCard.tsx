import {
  Animated,
  Easing,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
const logo = require("assets/logo.png");
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useUpdateMenu from "hooks/api/business/menu/useUpdateMenu";
import { vendorStructure } from "../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  menuItem: Iitem;
  vendor: vendorStructure;
  disabled?: boolean;
}

const EditingMenuItemCard = ({ menuItem, disabled, vendor }: Props) => {
  const { deleteItem } = useUpdateMenu();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const swipeableContentPosition = useRef(new Animated.Value(0)).current;
  let limitTextAmount = menuItem.description.slice(0, 20) + "...";

  const renderRightActions = () => {
    return (
      <>
        <View style={styles.animatedContainer}>
          <Animated.View
            style={[
              styles.rightActionContainer,
              { backgroundColor: "tomato" },
              {
                transform: [{ translateX: swipeableContentPosition }],
              },
            ]}
          >
            <TouchableOpacity
              onPress={(event: GestureResponderEvent) =>
                deleteItem(event, {
                  itemId: menuItem._id,
                  vendorId: vendor.id,
                })
              }
            >
              <Feather name="trash" size={30} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.rightActionContainer,
              { backgroundColor: "#669cff" },
              {
                transform: [{ translateX: swipeableContentPosition }],
              },
            ]}
          >
            <TouchableOpacity
              onPress={(_event: GestureResponderEvent) =>
                navigation.navigate("VendorMenuCreate", { menuItem })
              }
            >
              <Feather name="edit" size={30} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </>
    );
  };

  if (!disabled) {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={renderRightActions}
          onSwipeableOpen={() => {
            Animated.timing(swipeableContentPosition, {
              toValue: 0,
              duration: 175,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }}
          onSwipeableClose={() => {
            Animated.timing(swipeableContentPosition, {
              toValue: 50,
              duration: 100,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }}
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
    <TouchableOpacity style={styles.foodCategoryStyle} disabled={disabled}>
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
  animatedContainer: {
    display: "flex",
    flex: 0,
    flexDirection: "row",
  },
  itemContainer: {
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  rightActionContainer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "flex-end",
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
    flex: 2,
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
    flex: 2,

    // Increase the image size
    padding: "30%",
    marginLeft: 25,
    marginVertical: "15%",
    borderRadius: 5,
  },
  card: {
    width: 250,
    height: 115,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
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
