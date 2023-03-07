import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

export default function FoodsCard({ restaurantItem, checkForStyleChange }) {
  const changeStyle = (checkForStyleChange) => {
    let change =
      checkForStyleChange === true
        ? {
            // For the category restaurant list
            height: 250,
            width: '100%',
          }
        : // for the default restaurant list on home screen to display it smaller then the category restaurant list
          {
            height: 200,
            width: 275,
          }
    return change
  }

  const navigation = useNavigation()

  return (
    // Each card is going to have a different data source, so we need to create a custom button being the touchable opacity in order to navigate through the cards and as well as pass in data through the cards with navigation
    <TouchableOpacity
      // pass in data of restaurant items / all of restaurants, but pin pointing which restaurant data to get
      onPress={() =>
        navigation.navigate('MenuList', { restaurant: restaurantItem })
      }
      style={styles.foodCategoryStyle}
    >
      <View style={changeStyle(checkForStyleChange)}>
        <Image style={styles.foodImages} source={restaurantItem.image} />

        <View style={styles.foodTexts}>
          <MaterialIcons name="store" size={24} color="#606160" />
          <Text style={styles.restaurantText}>{restaurantItem.name}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{restaurantItem.rating}</Text>
          <AntDesign name="star" size={12} color="#9a9c9a" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginLeft: '3%',
  },
  ratingText: {
    color: '#9a9c9a'
  },
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
  },
  restaurantText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#606160',
    flex: 1,
  },
  foodImages: {
    width: '100%',
    flex: 0,
    height: '75%',
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
    marginLeft: '2%',
    marginVertical: '1%',
    alignItems: 'center',
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    borderColor: '#f2f0f0',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 15,
    paddingBottom: 7,
  },
})
