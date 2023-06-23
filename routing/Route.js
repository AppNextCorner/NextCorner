import { Text } from "react-native";
import * as React from "react";
import HomePage from "@pages/HomePage";
import ItemPage from "@pages/BusinessStack/itemDetails";
import OrdersPage from "@pages/OrdersPage";
import MenuListPage from "@pages/BusinessStack/MenuListPage";
import PickUpPage from "@pages/ProfilePage";
import SignInPage from "@pages/auth/SignInPage";
import CartPage from "@pages/CartPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
  Ionicons,
} from "@expo/vector-icons";
import { useAppSelector } from "../store/hook";
import { getIsLoggedIn } from "../store/slices/userSession";
import PaymentDetailsPage from "@pages/PaymentStack/PaymentDetailsPage";
import OrderPlacedPage from "@pages/PaymentStack/OrderPlacedPage";
import useGetUserData from "@hooks/handleUsers/useGetUserData";
import InProgressPage from "@pages/OrdersStack/InProgressPage";
import SignUpPage from "@pages/auth/SignUpPage";
import { NearbyVendors } from "../pages/home/NearbyVendors";

const homeName = "HomePage";
const ordersName = "Orders";
const profileName = "Profile";
const vendorsName = "Browse";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Route() {
  const { isDone } = useGetUserData();
  const isLoggedin = useAppSelector(getIsLoggedIn);
  console.log("isDone: ", isDone);
  console.log("isloggedin: ", isLoggedin);
  if (isDone === true) {
    if (isLoggedin) {
      return (
        <>
          <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
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
            </Stack.Navigator>
          </NavigationContainer>
        </>
      );
    } else {
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
    }
  } else if (isDone === false) {
    return <Text>fetching user...</Text>;
  }
}

function Home() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (rn === ordersName) {
            iconName = focused ? "checklist" : "checklist";
            return <Octicons name={iconName} size={size} color={color} />;
          } else if (rn === profileName) {
            iconName = focused ? "person" : "person";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (rn === vendorsName) {
            iconName = focused ? "running" : "running";
            return <FontAwesome5 name={iconName} size={size} color={color} />;
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
          shadowColor: '#c2c3c4',
          shadowOffset: { width: 0, height: 1.5, },
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
