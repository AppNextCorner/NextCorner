import { StyleSheet, Text } from 'react-native'
import * as React from 'react'
import HomePage from '@pages/HomePage'
import ItemPage from '@pages/BusinessStack/itemDetails'
import OrdersPage from '@pages/OrdersPage'
import MenuListPage from '@pages/BusinessStack/MenuListPage'
import PickUpPage from '@pages/ProfilePage'
import SignInPage from '@pages/auth/SignInPage'
import CartPage from '@pages/CartPage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '../store/hook'
import { getIsLoggedIn } from '../store/slices/userSession'
import PaymentDetailsPage from '@pages/PaymentStack/PaymentDetailsPage'
import OrderPlacedPage from '@pages/PaymentStack/OrderPlacedPage'
import useGetUserData from '@hooks/handleUsers/useGetUserData'
import InProgressPage from '@pages/OrdersStack/InProgressPage'
import SignUpPage from '@pages/auth/SignUpPage'

const homeName = 'HomePage'
const ordersName = 'Orders'
const profileName = 'Profile'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function Route() {
  const { isDone } = useGetUserData()
  const isLoggedin = useAppSelector(getIsLoggedIn)

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
              <Stack.Screen name="PaymentDetails" component={PaymentDetailsPage} />
              <Stack.Screen name="OrderPlaced" component={OrderPlacedPage} />
              <Stack.Screen name="InProgressOrder" component={InProgressPage} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={SignInPage} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={SignUpPage} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
  } else if (isDone === false) {
    return <Text>fetching user...</Text>
  }
}

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
            return (
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            )
          } else if (rn === ordersName) {
            iconName = focused ? 'checklist' : 'checklist'
            return <Octicons name={iconName} size={size} color={color} />
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person'
            return <Ionicons name={iconName} size={size} color={color} />
          }
        },
        headerShown: false,
        tabBarActiveTintColor: '#78DBFF',
        tabBarInactiveTintColor: 'grey',
        tabBarShowLabel: true,
        tabBarStyle: { padding: 10, height: '10%' },
      })}
    >
      <Tab.Screen name={homeName} component={HomePage} />
      <Tab.Screen name={ordersName} component={OrdersPage} />
      <Tab.Screen name={profileName} component={PickUpPage} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
