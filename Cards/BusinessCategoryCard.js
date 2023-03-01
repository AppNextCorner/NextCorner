import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function BusinessCategoryCard(props) {
  // stores the property styles for the category card whether it has been clicked or not by matching the id with the id of the selected category
  let touchButton = {
    style:
      props.businesItem.key !== props.foodId
        ? styles.foodCategoryStyle
        : styles.btnPress,
  }
  let imageBackground = {
    style:
      props.businesItem.key !== props.foodId
        ? styles.defaultImageContainer
        : styles.activeImageContainer,
  }
  let categoryTextStyle = {
    style:
      props.businesItem.key !== props.foodId
        ? styles.defaultCategoryText
        : styles.activeCategoryText,
  }

  return (
    // note: this card is to filter the categories displayed on the screen
    <TouchableOpacity
      id={props.businesItem.key}
      // grabbing the styles from the object touchButton
      {...touchButton}
      // grab the function to call when the touchable is clicked and pass the key to the function located in the categoryscroll bar
      onPress={() => {
        props.handlePress(props.businesItem.key)
      }}
    >
      <View style={styles.cardContainer}>
        <View {...imageBackground}>
          <Image style={styles.icon} source={props.businesItem.foodType} />
        </View>
        <View style={styles.defaultCategoryTextContainer}>
          <Text {...categoryTextStyle}>{props.businesItem.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  // setting default uniform weight and height for icon to fit on the category cards
  icon: {
    width: 50,
    height: 50,
  },
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
    backgroundColor: '#78DBFF',
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
    shadowColor: '#78DBFF',
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
