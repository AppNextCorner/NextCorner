import { StyleSheet, View, Text, FlatList } from 'react-native'
import React from 'react'
import useFoodItemData from '../data/useFoodItemData'
import  {
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet'
import PickUpHorizontalList from './PickUpHorizontalList'

export default function VerticalPickUpList() {

    const { trendingFood } = useFoodItemData()
    let getRestaurant = trendingFood
      .map((restaurant) => restaurant.restaurantList)
      .flat();

  return (
    
    <BottomSheetFlatList
      
        ListHeaderComponent={
          <Text >Restaurants Near You</Text>
        }
      // style={{flex: 1}}
        data={getRestaurant}
        style={{ flex: 1}}
        renderItem={({ item }) => {
          
          return (
            <>
              <Text style={styles.headerTitle}>{item.name}</Text>
              <PickUpHorizontalList
              style={{ flex: 1}} restaurantItem={item.menu} />
              
            </>
          )
        }}
      />
     
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
textAlign: 'center'
  }
})