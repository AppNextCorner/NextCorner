import { StyleSheet } from 'react-native'
import * as React from 'react'
import HomePage from './pages/HomePage'
import FoodDetailsPage from './pages/FoodDetailsPage'
import OrdersPage from './pages/OrdersPage'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Icon list for the menu bar in the navigation container
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'

import MenuListPage from './pages/MenuListPage'
import PickUpPage from './pages/PickUpPage'

//Screen names to easily find in the route
const homeName = 'HomePage'
const ordersName = 'Orders'
const pickUpName = 'PickUp'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

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
            iconName = focused ? 'walking' : 'walking'
            return <FontAwesome5 name={iconName} size={size} color={color} />
          }
        },
        headerShown: false,
        // using tabBar instead of screenOptions because this is not deprecated like screenOptions is
        tabBarActiveTintColor: '#78DBFF',
        tabBarInactiveTintColor: 'grey',

        tabBarShowLabel: true,
        tabBarStyle: { padding: 10, height: 60 },
      })}
    >
      {/* Tabs we want to use  */}
      <Tab.Screen name={homeName} component={HomePage} />
      <Tab.Screen name={pickUpName} component={PickUpPage} />
      <Tab.Screen name={ordersName} component={OrdersPage} />
    </Tab.Navigator>
  )
}

export default function App() {
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
          <Stack.Screen name="FoodDetails" component={FoodDetailsPage} />
          <Stack.Screen name="MenuList" component={MenuListPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
