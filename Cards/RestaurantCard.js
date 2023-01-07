import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function FoodsCard({ restaurantItem, checkForStyleChange }) {

  const changeStyle = (checkForStyleChange) => {
    let change =
      checkForStyleChange === true
        ? {
            // For the category restaurant list
            height: 250,
            width: '98%',
          }
        : // for the default restaurant list on home screen to display it smaller then the category restaurant list
          {
            height: 175,
            width: 250,
          }
    return change
  }

  const navigation = useNavigation()

  return (
    // Each card is going to have a different data source, so we need to create a custom button being the touchable opacity in order to navigate through the cards and as well as pass in data through the cards with navigation
    <TouchableOpacity

    // pass in data of restaurant items / all of restaurants, but pin pointing which restaurant data to get
      onPress={() => navigation.navigate('MenuList', {restaurant:restaurantItem})}
      style={styles.foodCategoryStyle}
     
    >
      <View style={changeStyle(checkForStyleChange)}>
        <Image style={styles.foodImages} source={restaurantItem.image} />
        <View style={styles.foodTexts}>
          <Text style={styles.restaurantText}>{restaurantItem.name}</Text>
        </View>

        <Text style={styles.distanceText}>0.1 m</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
  },
  restaurantText: {
    fontSize: 11,
    fontWeight: 'bold',
    // fontFamily: 'monospace',
    flex: 0,
  },
  foodImages: {
    width: '100%',
    flex: 0,
    height: '75%',
    borderRadius: 5,
  },
  card: {
    width: 250,
    height: 250,
    flex: 1,
  },
  priceText: {
    flex: 1,
    alignContent: 'flex-end',
    color: '#97989F',
  },
  foodTexts: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',

    borderRadius: 5,

    marginLeft: 10,
    marginBottom: 15,
    paddingBottom: 7,
  },
})
