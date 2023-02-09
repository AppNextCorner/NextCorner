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
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import OrderButton from '../../components/OrderButton'
import { useAppSelector } from '../../store/hook'
import { getButton } from '../../store/slices/addToCart'
import MenuTypeList from '../../Cards/MenuCards/MenuTypeList'
import FeaturedList from '../../components/MenuComponents/FeaturedList'
import PreviousOrdersComponent from '../../components/MenuComponents/PreviousOrdersComponent'
import { getOrders } from '../../store/slices/addToOrders'

export default function MenuListPage() {
  const route = useRoute()
  const { restaurant } = route.params
  const [menuTypeData, setMenuTypeData] = useState(restaurant)
  const [menu, setMenu] = useState(restaurant.menu)
  const isClicked = useAppSelector(getButton)
  // using routes for getting the data and navigation to navigate through a different screen

  const navigation = useNavigation()

  // const updateCustomizations = (id, newCustomizations) => {
  //   const i = cart.map((item) => item.id).indexOf(id);

  //   if (i > -1){
  //     const temp = {...cart[i], customizations: newCustomizations}
  //     setCart(cart.filter((item, index) => {
  //       if(index === i){
  //         return temp
  //       }
  //       return item
  //     }))
  //   }

  // }

  // filter through all items in the cart and see if they match
  const previousOrders = useAppSelector(getOrders)
  const getSingleOrders = previousOrders
    .map((item) => item.singleOrderList)
    .flat()
  //.map(item => item.businessOrderedFrom);
  console.log('getSingleOrders', getSingleOrders.filter(val => val.businessOrderedFrom === restaurant.name)
  
  //.filter((item) => {
    //item.businessOrderedFrom === restaurant.name
  //})
  )
  console.log(restaurant.name.toString())
  const filterOrder = getSingleOrders.filter(val => val.businessOrderedFrom === restaurant.name)
  console.log('filter order', filterOrder)
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
        <FlatList
          ListHeaderComponent={
            <>
              {/* Pressable for the purpose of using an icon to go back home  */}
              <Pressable style={styles.goBackButton} onPress={goHome}>
                <Feather name="arrow-left-circle" size={40} color="white" />
              </Pressable>

              <Image style={styles.image} source={restaurant.image} />

              {/* Business Logo */}
              <Image style={styles.logoImage} source={restaurant.logo} />

              <Text style={styles.title}>{restaurant.name}</Text>
              <View style={styles.description}>
                <Text style={styles.textDescription}>
                  {restaurant.description}
                </Text>
              </View>
              <View style={styles.margin}></View>
              {/* Section for small google maps preview */}

              {/* Section for Featured Items*/}

              <FeaturedList
                menuData={menu}
                businessName={restaurant.name}
                location={restaurant.location}
                logo={restaurant.logo}
              />

              <PreviousOrdersComponent
                menuData={menu}
                location={restaurant.location}
                logo={restaurant.logo}
                
                listData={filterOrder}
                businessName={restaurant.name}
              />

              {/* ALL menu items located here */}
              <View style={styles.marginSet}>
                <Text style={styles.titleOfMenu}>Full Menu</Text>
                <Text style={styles.timeOfMenu}>
                  {restaurant.open} - {restaurant.close}
                </Text>
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // pass in the menu list coming from the route.params of the restaurants items which we can access through params
          data={menuTypeData.menuTypes}
          renderItem={({ item }) => {
            console.log('INformation on one menu item', item)
            return (
              <>
                <Text style={styles.typeText}>{item.type}</Text>
                <MenuTypeList
                  type={item.type}
                  menuItem={menu}
                  businessName={restaurant.name}
                  location={restaurant.location}
                  logo={restaurant.logo}
                />
                <View style={styles.margin}></View>
              </>
            )
          }}
        />
        <View style={styles.cartButton}>
          {isClicked === true ? <OrderButton /> : null}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  logoImage: {
    // similar to the go back button, we can put negative margins to this child element as the parent image element has overflow as hidden
    marginTop: '-10%',
    marginLeft: '5%',
    borderRadius: 50,
    width: 75,
    height: 75,
  },
  cartButton: {
    marginBottom: '10%',
  },
  margin: {
    backgroundColor: '#f2f3f5',
    //flex: 1,
    paddingVertical: 5,
  },
  // text for type styles
  typeText: {
    margin: '3%',
    marginTop: '5%',
    fontSize: 25,
    fontWeight: 'bold',
  },
  // menu header styles for business time
  titleOfMenu: {
    fontSize: 25,
    fontWeight: 'bold',
    // fontFamily: 'monospace',
    marginLeft: '3%',
    marginTop: 10,
  },
  timeOfMenu: {
    fontSize: 15,

    marginLeft: '3%',
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingBottom: 25,
  },
  marginSet: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
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
    overflow: 'hidden',
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
    marginTop: '2%',
    marginLeft: 10,
    flex: 0,
  },
})
