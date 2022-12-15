/**
 * Purpose of the File: It is used to display each individual food item from the restaurant through a horizontal list to be rendered multiple times per restaurant in the bottom sheet
 */

import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import PickUpMenuItemCard from '../Cards/PickUpMenuItemCard'

export default function PickUpHorizontalList(props) {
  return (
    <>
      {/* props is used to allow the use of multiple cards of */}

      {/* In order for the display to be a role, each card will need its own column and got this from the amount of cards there are */}

      {/* Flat List is used so we can scroll inside the Bottom sheet and not having seperate components with the vertical and horizontal flat list 
        - flatlist -> scroll inside the bottom sheet
        - BottomSheetFlatList -> scroll the bottom sheet to exist and go in with the snap points 
      */}
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // Restaurant Item is the menu of the restaurant
        data={props.restaurantItem}
        renderItem={({ item }) => {
          // Similar to that of Restaurant Card, however we use a different component because we want to display the food item rather than the restaurant item itself
          return <PickUpMenuItemCard foodItem={item} />
        }}
      />

      {/* For dividing each section of the trending categories */}
      <View style={styles.margin}></View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
  },
  margin: {
    backgroundColor: '#f2f3f5',

    paddingVertical: 5,
  },

  list: {},
})
