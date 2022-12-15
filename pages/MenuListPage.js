/**
 * Purpose of File: Displays the contents of the restaurant on what it offers
 * - For example: it displays the food of the restaurant, image of it, opening text, etc
 */

import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import MenuItemCard from '../Cards/MenuItemCard'

export default function MenuListPage() {
  // using routes for getting the data and navigation to navigate through a different screen
  const route = useRoute()
  const navigation = useNavigation()

  //   Button function solves the issue of not having to use the build in header property in the navigation component -> uses a custom navigation button instead
  const goHome = () => {
    navigation.navigate('Home')
  }

  // accessing and pinpointing data

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Google Maps tap to view section */}
        {/* <GoogleMapsMenuSection /> */}

        {/* Menu list containing food items */}
        <View style={styles.restaurantCard}>
          <FlatList
            ListHeaderComponent={
              <>
              {/* Pressable for the purpose of using an icon to go back home  */}
                <Pressable style={styles.goBackButton} onPress={goHome}>
                  <Feather name="arrow-left-circle" size={40} color="white" />
                </Pressable>

                <Image style={styles.image} source={route.params.foodImage} />
                <Text style={styles.title}>{route.params.name}</Text>
                <View style={styles.description}>
                  <Text style={styles.textDescription}>
                    {route.params.description}
                  </Text>
                </View>
                <View style={styles.marginSet}>
                  <Text style={styles.titleOfMenu}>Full Menu</Text>
                  <Text style={styles.timeOfMenu}>10:30 am - 11:20 pm</Text>
                </View>
              </>
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // pass in the menu list coming from the route.params of the restaurants items which we can access through params
            data={route.params.menu}
            renderItem={({ item }) => {
              return <MenuItemCard foodItem={item} />
              
            }}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  titleOfMenu: {
    fontSize: 20,
    fontWeight: 'bold',
    // fontFamily: 'monospace',
    paddingLeft: 10,
    marginTop: 10,
  },
  timeOfMenu: {
    fontSize: 15,

    paddingLeft: 10,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingBottom: 25,
  },
  marginSet: {
    marginBottom: 25,
  },
  restaurantCard: {
    flex: 1,
  },
  goBackButton: {
    zIndex: 2,
    margin: 20,
    marginTop: 40,
  },
  description: {
    flex: 0,

    marginHorizontal: 20,
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: -105,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    // fontFamily: 'monospace',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 30,
    marginLeft: 10,
    flex: 0,
  },
})
