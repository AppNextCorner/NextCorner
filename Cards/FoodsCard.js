import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function FoodsCard({ foodCategory }) {
  return (
    <TouchableOpacity style={styles.foodCategoryStyle}>
      <View>
        <Image source={foodCategory.foodImage} />
        <View style={styles.foodTexts}>
          <Text style={styles.categoryText}>{foodCategory.name}</Text>
          <Text style={styles.priceText}>{foodCategory.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  priceText: {
    marginLeft: 35,
    color: '#97989F'
  },
  foodTexts: {
    flexDirection: 'row',
    margin: 10,
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    margin: 15,
    paddingBottom: 7,
  },
})
