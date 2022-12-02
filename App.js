import { StyleSheet } from 'react-native'
import * as React from 'react'
import HomePage from './pages/HomePage'
import FoodDetailsPage from './pages/FoodDetailsPage'
import OrdersPage from './pages/OrdersPage'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import MenuListPage from './pages/MenuListPage'

//Screen names to easily find in the route
const homeName = 'HomePage'
const ordersName = 'Orders'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function Home() {

  return (
    <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName
        let rn = route.name

        if (rn === homeName) {
          iconName = focused ? 'home' : 'home-outline'
        } else if (rn === ordersName) {
          iconName = focused ? 'notebook' : 'notebook-outline'
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
      },
      headerShown: false,
    })}
    tabBarOptions={{
      activeTintColor: '#78DBFF',
      inactiveTintColor: 'grey',
      showLabel: false,
      style: { padding: 10, height: 80 },
    }}
    
  >
    <Tab.Screen name={homeName} component={HomePage} />
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
