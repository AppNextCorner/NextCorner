import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function FoodCategoryCard({ foodCategory }) {
  return (
    <TouchableOpacity style={styles.foodCategoryStyle}>
      <View>
        <Image source={foodCategory.foodType} />
        <Text style={styles.categoryText}>{foodCategory.text}</Text>
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
    padding: 7
  },
})
