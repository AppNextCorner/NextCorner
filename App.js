
import { StyleSheet} from 'react-native'
import HomePage from './pages/HomePage'
import FoodDetailsPage from './pages/FoodDetailsPage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      // Removes the header from the navigation stack to replace it with a custom header button
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="FoodDetails" component={FoodDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
