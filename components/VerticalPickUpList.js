import { StyleSheet, View, Text, FlatList } from 'react-native'
import React from 'react'
import RestaurantCard from '../Cards/RestaurantCard'
import PickUpMenuItemCard from '../Cards/PickUpMenuItemCard'
import useFoodItemData from '../data/useFoodItemData'
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import PickUpHorizontalList from './PickUpHorizontalList'

export default function VerticalPickUpList() {

    const { trendingFood } = useFoodItemData()
    let getRestaurant = trendingFood
      .map((restaurant) => restaurant.restaurantList)
      .flat()
    let getFoodItem = getRestaurant.map((restaurantList) => restaurantList.menu).flat();
  
    console.log(getFoodItem)


  return (
    <BottomSheetFlatList
      
      
      // style={{flex: 1}}
        data={getRestaurant}
        renderItem={({ item }) => {
          return (
            <>
              <Text style={{marginBottom: 100}}>{item.name}</Text>
              <PickUpHorizontalList restaurantItem={getFoodItem} />
              
            </>
          )
        }}
      />
  )
}