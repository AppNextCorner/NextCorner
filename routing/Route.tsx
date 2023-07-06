import { Text } from "react-native";
import * as React from "react";
import HomePage from "pages/HomePage";
import ItemPage from "pages/BusinessStack/components/ItemPage";
import OrdersPage from "pages/OrdersPage";
import MenuListPage from "pages/BusinessStack/components/MenuListPage";
import PickUpPage from "pages/ProfilePage";
import SignInPage from "pages/auth/SignInPage";
import CartPage from "pages/CartPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
  Ionicons,
} from "@expo/vector-icons";
import PaymentDetailsPage from "pages/PaymentStack/PaymentDetailsPage";
import OrderPlacedPage from "pages/PaymentStack/OrderPlacedPage";
import useGetUserData from "hooks/handleUsers/useGetUserData";
import InProgressPage from "pages/OrdersStack/InProgressPage";
import SignUpPage from "pages/auth/SignUpPage";
import { NearbyVendors } from "pages/home/NearbyVendors";
import Vendor from "pages/BusinessStack/components/Vendor";
import VendorMore from "pages/BusinessStack/components/VendorMore";
import ReviewsPage from "pages/BusinessStack/components/reviewsPage";
import ReviewCreatePage from "pages/BusinessStack/components/ReviewCreatePage";
import VendorsCreate from "pages/BusinessStack/components/VendorsCreate";
// Vendor pages
const vendorName = "Vendors";
const vendorOptions = "More";

//  User pages
const homeName = "Home";
const ordersName = "Orders";
const profileName = "Profile";
const vendorsName = "Browse";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Route() {
  const { isDone, isLoggedIn } = useGetUserData();
  console.log("isDone: ", isDone);
  console.log("isloggedin: ", isLoggedIn);
  if (isDone === true && isLoggedIn) {
    return (
      <>
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* User pages */}
            <Stack.Screen name="HomeStack" component={Home} />
            <Stack.Screen name="Cart" component={CartPage} />
            <Stack.Screen name="Item" component={ItemPage} />
            <Stack.Screen name="MenuList" component={MenuListPage} />
            <Stack.Screen
              name="PaymentDetails"
              component={PaymentDetailsPage}
            />

            <Stack.Screen name="OrderPlaced" component={OrderPlacedPage} />
            <Stack.Screen name="InProgressOrder" component={InProgressPage} />
            <Stack.Screen name="Browse" component={NearbyVendors} />
            {/* 
              Reviews Pages Start
            */}
            <Stack.Screen name="Reviews" component={ReviewsPage} />
            <Stack.Screen name="ReviewCreate" component={ReviewCreatePage} />

            {/*
              Reviews Pages end 
            */}

            {/* Vendor Pages */}
            <Stack.Screen name="Vendor" component={VendorStack} />
            <Stack.Screen name="VendorCreate" component={VendorsCreate} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  } else if (isDone === true && !isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={SignInPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={SignUpPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <Text>fetching user...</Text>;
  }
}

function VendorStack() {
  return (
    <Tab.Navigator
      initialRouteName={vendorName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let rn = route.name;

          if (rn === vendorName) {
            return (
              <MaterialCommunityIcons
                name={focused ? "store" : "store-outline"}
                size={size}
                color={color}
              />
            );
          } else if (rn === vendorOptions) {
            return (
              <MaterialCommunityIcons
                name={
                  focused
                    ? "dots-horizontal-circle"
                    : "dots-horizontal-circle-outline"
                }
                size={size}
                color={color}
              />
            );
          }
        },
        headerShown: false,
        tabBarActiveTintColor: "#78DBFF",
        tabBarInactiveTintColor: "grey",
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingHorizontal: 10,
          paddingBottom: 10,
          height: "8%",
          margin: 15,
          marginBottom: "7.5%",
          position: "absolute",
          borderRadius: 30,
          backgroundColor: "#fff",
          shadowColor: "#c2c3c4",
          shadowOffset: { width: 0, height: 1.5 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
        },
      })}
    >
      <Tab.Screen name={vendorName} component={Vendor} />
      <Tab.Screen name={vendorOptions} component={VendorMore} />
    </Tab.Navigator>
  );
}

function Home() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let rn = route.name;
          if (rn === homeName) {
            return (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (rn === ordersName) {
            return <Octicons name={"checklist"} size={size} color={color} />;
          } else if (rn === profileName) {
            return <Ionicons name={"person"} size={size} color={color} />;
          } else if (rn === vendorsName) {
            return <FontAwesome5 name={"running"} size={size} color={color} />;
          }
        },
        headerShown: false,
        tabBarActiveTintColor: "#78DBFF",
        tabBarInactiveTintColor: "grey",
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingHorizontal: 10,
          paddingBottom: 10,
          height: "8%",
          margin: 15,
          marginBottom: "7.5%",
          position: "absolute",
          borderRadius: 30,
          backgroundColor: "#fff",
          shadowColor: "#c2c3c4",
          shadowOffset: { width: 0, height: 1.5 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomePage} />
      <Tab.Screen name={vendorsName} component={NearbyVendors} />
      <Tab.Screen name={ordersName} component={OrdersPage} />
      <Tab.Screen name={profileName} component={PickUpPage} />
    </Tab.Navigator>
  );
}
