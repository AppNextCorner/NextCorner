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
import React from "react";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import OrderButton from "components/global/OrderButton";
import { useAppSelector } from "../../../store/hook";
import { getButton } from "../../../store/slices/addToCartSessionSlice";
import MenuList from "cards/Menu/MenuList";
import FeaturedList from "components/menu/FeaturedList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import PreviousOrdersComponent from "components/menu/PreviousOrdersComponent";
// import { getOrders } from "../../../store/slices/addToOrders";
import AnnouncementList from "components/menu/AnnouncementList";
import FullMenuList from "components/vendors/FullMenuList";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { useFetchCart } from "hooks/api/business/menu/useFetchCart";
// import { IP } from "@env";

interface IRoute {
  business: vendorStructure;
}

export default function MenuListPage() {
  const route = useRoute();
  const { initializeCart } = useFetchCart();
  React.useEffect(() => {
    // Call initializeCart when the component mounts to fetch and initialize the cart data
    initializeCart();
  }, []); // Empty dependency array ensures this useEffect runs only once when the component mounts

  const { business }: IRoute = route.params as IRoute;

  const isClicked = useAppSelector(getButton); // helps prevent infinite orders being made

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  /**
   * This code section is used to get the orders that have been previously ordered if they match with the current store
   */

  // filter through all items in the cart and see if they match
  // const getSingleOrders = previousOrders
  //   .map((item: any) => item.singleOrderList)
  //   .flat();
  // const filterOrder = getSingleOrders.filter(
  //   (val: any) => val.businessOrderedFrom === business.name
  // );
  //   Button function solves the issue of not having to use the build in header property in the navigation component -> uses a custom navigation button instead
  const goHome = () => {
    navigation.navigate("Home");
  };
  const currentDate = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayIndex = currentDate.getDay();
  const currentDayString = weekdays[currentDayIndex];
  const indexOfDay = business.times.findIndex(
    (currentTime) =>
      currentTime.day.toLowerCase() === currentDayString.toLowerCase()
  );
  console.log(indexOfDay);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Menu list containing food items */}
        <FlatList
          ListFooterComponent={
            <>
              <FullMenuList
                location={business.location}
                create={false}
                menu={business.menu}
                vendor={business}
              />
            </>
          }
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
                  <Text style={styles.timeOfMenu}>Open: {business.times[indexOfDay].time.open} - {business.times[indexOfDay].time.closed}</Text>
                </View>

                <AnnouncementList vendor={business} />
                <FeaturedList
                  menuData={business.menu}
                  vendorName={business.name}
                  location={business.location}
                />
                {/* Section for Featured Items*/}
              </View>

              {/* <PreviousOrdersComponent
                menuData={business.menu}
                location={business.location}
                listData={filterOrder}
                vendorName={business.name}
              /> */}

              {/* ALL menu items located here */}
              <View style={styles.marginSet}>
                <Text style={styles.titleOfMenu}>Full Menu</Text>
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // pass in the menu list coming from the route.params of the business items which we can access through params
          data={business.itemCategories}
          renderItem={({ item }) => {
            return (
              <>
                <Text style={styles.typeText}>{item}</Text>
                <MenuList
                  category={item}
                  menu={business.menu}
                  vendorName={business.name}
        
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
    marginTop: "-30%",
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
