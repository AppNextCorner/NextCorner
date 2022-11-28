import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function FoodCategoryCard(props) {
  
  return (
    // note: this card is to filter the categories displayed on the screen, still needs the functionality to do so
    <TouchableOpacity id={props.foodCategory.key} style={styles.foodCategoryStyle} onPress={() => props.handlePress(props.foodCategory.key)}>
      <View>
        <Image source={props.foodCategory.foodType} />
        <Text style={styles.categoryText}>{props.foodCategory.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
