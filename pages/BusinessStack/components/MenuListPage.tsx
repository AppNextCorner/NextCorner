/**
 * Purpose of File: Displays the contents of the business on what it offers
 * - For example: it displays the food of the business, image of it, opening text, etc
 */

import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import OrderButton from "components/global/OrderButton";
import { useAppSelector } from "../../../store/hook";
import { getButton } from "../../../store/slices/addToCart";
import MenuTypeList from "cards/Menu/MenuTypeList";
import FeaturedList from "components/menu/FeaturedList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PreviousOrdersComponent from "components/menu/PreviousOrdersComponent";
import { getOrders } from "../../../store/slices/addToOrders";
import AnnouncementList from "components/menu/AnnouncementList";
import { API } from "constants/API";
// import { IP } from "@env";

export default function MenuListPage() {
  const route = useRoute();
  const { business }: any = route.params;
  const [menuTypeData] = useState(business);
  // menu of the business through params
  const [menu] = useState(business.menu);
  const isClicked = useAppSelector(getButton); // helps prevent infinite orders being made

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  /**
   * This code section is used to get the orders that have been previously ordered if they match with the current store
   */

  const getOrderFromSlice = useAppSelector(getOrders);
  const previousOrders = JSON.parse(JSON.stringify(getOrderFromSlice));

  // filter through all items in the cart and see if they match
  const getSingleOrders = previousOrders
    .map((item: any) => item.singleOrderList)
    .flat();
  const filterOrder = getSingleOrders.filter(
    (val: any) => val.businessOrderedFrom === business.name
  );

  console.log("Important");
  console.log(business);
  console.log(`${API}/${business.image}`);
  //   Button function solves the issue of not having to use the build in header property in the navigation component -> uses a custom navigation button instead
  const goHome = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Menu list containing food items */}
        <FlatList
          ListHeaderComponent={
            <>
              {/* Pressable for the purpose of using an icon to go back home  */}
              <Pressable style={styles.goBackButton} onPress={goHome}>
                <AntDesign name="arrowleft" size={40} color="white" />
              </Pressable>

              <Image
                style={styles.image}
                source={{
                  uri: `${business.image.toString()}`,
                }}
              />

              {/* Business Logo - not needed as many small businesses don't have one*/}
              {/* <Image style={styles.logoImage} source={business.logo} /> */}
              {/* Section for small google maps preview */}
              <View style={{ marginTop: -60 }}>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeOfMenu}>
                    Open: {business.open} - {business.close}
                  </Text>
                </View>

                <AnnouncementList vendor={business} />
                <FeaturedList
                  menuData={menu}
                  businessName={business.name}
                  location={business.location}
                />
                {/* Section for Featured Items*/}
              </View>

              <PreviousOrdersComponent
                menuData={menu}
                location={business.location}
                listData={filterOrder}
                businessName={business.name}
              />

              {/* ALL menu items located here */}
              <View style={styles.marginSet}>
                <Text style={styles.titleOfMenu}>Full Menu</Text>
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // pass in the menu list coming from the route.params of the business items which we can access through params
          data={menuTypeData.categoriesForMenu}
          renderItem={({ item }) => {
            return (
              <>
                <Text style={styles.typeText}>{item.type}</Text>
                <MenuTypeList
                  type={item.type}
                  menu={menu}
                  businessName={business.name}
                  location={business.location}
                />
                <View style={styles.margin}></View>
              </>
            );
          }}
        />
        <View style={styles.cartButton}>
          {isClicked === true ? <OrderButton /> : null}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    // similar to the go back button, we can put negative margins to this child element as the parent image element has overflow as hidden
    marginTop: "-10%",
    marginLeft: "5%",
    borderRadius: 50,
    width: 75,
    height: 75,
  },
  cartButton: {
    marginBottom: "10%",
  },
  margin: {
    backgroundColor: "#f2f3f5",
    //flex: 1,
    paddingVertical: 5,
  },
  // text for type styles
  typeText: {
    margin: "3%",
    marginTop: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  // menu header styles for business time
  titleOfMenu: {
    fontSize: 25,
    fontWeight: "bold",
    // fontFamily: 'monospace',
    marginLeft: "3%",
    marginVertical: 10,
  },
  timeOfMenu: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  timeContainer: {
    marginLeft: "5%",
    marginBottom: "-2%",
    backgroundColor: "#60b6f7",
    width: 200,
    padding: "1%",
    borderRadius: 20,
    borderColor: "black",
  },
  marginSet: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
  },
  businesCard: {
    flex: 1,
  },
  goBackButton: {
    zIndex: 2,
    margin: 20,
    marginTop: 40,
    borderRadius: 20,
    padding: "2%",
    width: "15%",
    backgroundColor: "#78DBFF",
  },
  description: {
    flex: 0,

    marginHorizontal: 20,
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: 250,
    overflow: "hidden",
    resizeMode: "cover",
    marginTop: '-30%',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    // fontFamily: 'monospace',
    fontSize: 25,
    textAlign: "left",
    marginTop: "2%",
    marginLeft: 10,
    flex: 0,
  },
});
