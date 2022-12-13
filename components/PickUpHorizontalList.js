import { StyleSheet, View, Text, FlatList } from 'react-native'
import React from 'react'
import RestaurantCard from '../Cards/RestaurantCard'
import PickUpMenuItemCard from '../Cards/PickUpMenuItemCard'
import useFoodItemData from '../data/useFoodItemData'
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet'

export default function PickUpHorizontalList(props) {
 

  // const mapFood = trendingFood.map(food => food.category)

  console.log(props.restaurantItem)
  return (
    <>
      {/* props is used to allow the use of multiple cards of */}

      {/* In order for the display to be a role, each card will need its own column and got this from the amount of cards there are */}
      <BottomSheetFlatList
                // style={{flex: 1}}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={props.restaurantItem}
                renderItem={({ item }) => {
                  console.log('listed Item:', item)
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
