import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

export default function RestaurantCategoryCard(props) {
  
// stores the property styles for the category card whether it has been clicked or not by matching the id with the id of the selected category
  let touchButton = {
    style: props.restaurantItem.key !== props.foodId ? styles.foodCategoryStyle : styles.btnPress,
  }

  return (
    // note: this card is to filter the categories displayed on the screen
    <TouchableOpacity
      id={props.restaurantItem.key}
      // grabbing the styles from the object touchButton
      {...touchButton}
      // grab the function to call when the touchable is clicked and pass the key to the function located in the categoryscroll bar
      onPress={() => {
        props.handlePress(props.restaurantItem.key)
        
        
      }}
    >
      <View>
        <Image source={props.restaurantItem.foodType} />
        <Text style={styles.categoryText}>{props.restaurantItem.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({ 
  btnPress: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#b8eaff',
    borderRadius: 16,
    margin: 10,
    padding: 12,
  },
  categoryText: {
    textAlign: 'center',
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    margin: 10,
    padding: 12,
  },
})
