import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

// Screens
import HomePage from '../pages/HomePage'
import OrdersPage from '../pages/OrdersPage'



function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            let rn = route.name

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn === ordersName) {
              iconName = focused ? 'list' : 'list-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: '#78DBFF',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={homeName} component={HomePage} />
        <Tab.Screen name={ordersName} component={OrdersPage} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator
