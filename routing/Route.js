/**
 * Purpose: Serves as storiing our stacks for our application such as auth stack, home stack, profile stack, pickup stack
 */

import { StyleSheet } from 'react-native'
import * as React from 'react'
// components / pages imported
import HomePage from '../pages/HomePage'
import FoodDetailsPage from '../pages/FoodDetailsPage'
import OrdersPage from '../pages/OrdersPage'
import MenuListPage from '../pages/MenuListPage'
import PickUpPage from '../pages/PickUpPage'
import SignInPage from '../pages/auth/SignInPage'
import CartPage from '../pages/CartPage'

// importing the libraries needed for the navigation for every page
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Icon list for the menu bar in the navigation container
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Octicons, Ionicons } from '@expo/vector-icons'

import { useAppSelector } from '../store/hook'
import { getIsLoggedIn } from '../store/userSession'
import PaymentDetailsPage from '../pages/PaymentStack/PaymentDetailsPage'
import OrderPlacedPage from '../pages/OrderPlacedPage'
import AddPaymentPage from '../pages/PaymentStack/AddPaymentPage'

import { useEffect } from 'react'
import useCart from '../hooks/useCart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, getCart } from '../store/addToCart'

//Screen names to easily find in the route
const homeName = 'HomePage'
const ordersName = 'Orders'
const pickUpName = 'Profile'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()



// tab navigation stack
function Home() {
  
  
  // set up bottom bar navigation style settings and icons
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          let rn = route.name

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline'
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          } else if (rn === ordersName) {
            iconName = focused ? 'checklist' : 'checklist'
            return <Octicons name={iconName} size={size} color={color} />
          } else if (rn === pickUpName) {
            iconName = focused ? 'person' : 'person'
            return <Ionicons name={iconName} size={size} color={color} />
          }
        },
        headerShown: false,
        // using tabBar instead of screenOptions because this is not deprecated like screenOptions is
        tabBarActiveTintColor: '#78DBFF',
        tabBarInactiveTintColor: 'grey',

        tabBarShowLabel: true,
        tabBarStyle: { padding: 10, height: 75},
      })}
    >
      {/* Tabs we want to use  */}
      <Tab.Screen name={homeName} component={HomePage} />
      <Tab.Screen name={ordersName} component={OrdersPage} />
      <Tab.Screen name={pickUpName} component={PickUpPage} />
    </Tab.Navigator>
  )
}

export default function Route() {
 
  // assign the variable a value of the state of the getIsLoggedIn according to the state of the userSession
  const isLoggedin = useAppSelector(getIsLoggedIn)

  console.log('the user is logged in: ', isLoggedin)
  // using the state of the login which we got from the hook useAppSelector will help use the component / method value
  if (isLoggedin) {
    const userItems = useAppSelector(getCart)
    const { getCurrentCartItems } = useCart();
    useEffect(() => {
      getCurrentCartItems()
    }, []);
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            // Removes the header from the navigation stack to replace it with a custom header button
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* Home -> main tab / default where it contains only orders and home  */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={CartPage} />
            <Stack.Screen name="FoodDetails" component={FoodDetailsPage} />
            <Stack.Screen name="MenuList" component={MenuListPage} />
            <Stack.Screen name="PaymentDetails" component={PaymentDetailsPage} />
            <Stack.Screen name="OrderPlaced" component={OrderPlacedPage} />
            <Stack.Screen name="AddPayment" component={AddPaymentPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={SignInPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
