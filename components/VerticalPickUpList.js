/**
 * Purpose of the file: It is used to display the restaurants and its content by rendering multiple restaurants and multiple horizontal list for each restaurant
 */

import { StyleSheet, Text } from 'react-native'
import React from 'react'
import useFoodItemData from '../data/useFoodItemData'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import PickUpHorizontalList from './PickUpHorizontalList'

export default function VerticalPickUpList() {
  // grabbing the data of the trendingFood from the data folder
  const { trendingFood } = useFoodItemData()
  // mapping through the data and getting our restaurntList which contains all the restaurant items and remove the extra array wrapping the data with the flat() method
  let getRestaurant = trendingFood
    .map((restaurant) => restaurant.restaurantList)
    .flat()

  return (
    // Used BottomSheetFlatList so the user can close the tab through the vertical scrollbar
    <BottomSheetFlatList
      ListHeaderComponent={<Text>Restaurants Near You</Text>}
      data={getRestaurant}
      style={{ flex: 1 }}
      renderItem={({ item }) => {
        return (
          <>
            {/* Containing the name of the restaurant  */}
            <Text style={styles.headerTitle}>{item.name}</Text>
            {/* Pass in the menu from the restaurant through props  */}
            <PickUpHorizontalList
              style={{ flex: 1 }}
              restaurantItem={item.menu}
            />
          </>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
})
