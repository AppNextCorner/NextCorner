import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

export default function RestaurantCategoryCard(props) {
  

  let touchButton = {
    style: props.foodCategory.key !== props.foodId ? styles.foodCategoryStyle : styles.btnPress,
  }

  return (
    // note: this card is to filter the categories displayed on the screen, still needs the functionality to do so
    <TouchableOpacity
      id={props.foodCategory.key}
      {...touchButton}
      
      onPress={() => {
        props.handlePress(props.foodCategory.key)
        console.log("Clicked a category")
        
      }}
    >
      <View>
        <Image source={props.foodCategory.foodType} />
        <Text style={styles.categoryText}>{props.foodCategory.text}</Text>
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
