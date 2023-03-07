import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

export default function RestaurantCategoryCard(props) {
  // stores the property styles for the category card whether it has been clicked or not by matching the id with the id of the selected category
  let touchButton = {
    style:
      props.restaurantItem.key !== props.foodId
        ? styles.foodCategoryStyle
        : styles.btnPress,
  }
  let imageBackground = {
    style:
      props.restaurantItem.key !== props.foodId
        ? styles.defaultImageContainer
        : styles.activeImageContainer,
  }
  let categoryTextStyle = {
    style:
      props.restaurantItem.key !== props.foodId
        ? styles.defaultCategoryText
        : styles.activeCategoryText,
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
      <View style={styles.cardContainer}>
        <View {...imageBackground}>
          <Image source={props.restaurantItem.foodType} />
        </View>
        <View style={styles.defaultCategoryTextContainer}>
          <Text {...categoryTextStyle}>{props.restaurantItem.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,

    alignItems: 'center',
  },

  // image styles for on and off button
  defaultImageContainer: {
    backgroundColor: '#f7fafa',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    padding: '70%',
    borderRadius: 15,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#c2c3c4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  activeImageContainer: {
    backgroundColor: '#515152',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    padding: '70%',
    borderRadius: 15,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

    // shadow box for both IOS and Android with elevation
    shadowColor: '#3d3d3d',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  btnPress: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',

    borderRadius: 16,
    margin: 5,
    padding: 12,
  },
  categoryText: {
    textAlign: 'center',
  },
  defaultCategoryTextContainer: {
    marginTop: 10,
    color: '#bfbfbf',
  },
  defaultCategoryText: {

    color: '#bfbfbf',
  },
  activeCategoryText: {

    color: '#3d3d3d',
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',

    borderRadius: 16,
    margin: 5,
    padding: 12,
  },
})
