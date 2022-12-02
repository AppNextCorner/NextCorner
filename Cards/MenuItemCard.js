import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function MenuItemCard({ foodItem }) {
  const navigation = useNavigation()

  return (
    // Each card is going to have a different data source, so we need to create a custom button being the touchable opacity in order to navigate through the cards and as well as pass in data through the cards with navigation
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodDetails', foodItem)}
      
      style={styles.foodCategoryStyle}
    >
        <Text>LOL</Text>
        {/* TITLE, IMAGE, PRICE
      <View style={styles.card}>
        <Image style={styles.foodImages} source={foodItem.image} />
        <View style={styles.foodTexts}>
          <Text style={styles.categoryText}>{foodItem.title}</Text>
          <Text style={styles.priceText}>{foodItem.price}</Text>
        </View>
      </View> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 15,
    textAlign: 'center',
    flex: 4,
  },
  foodImages: {
    width: '100%',
    borderRadius: 16,
  },
  card: {
    width: 300,
    heigth: 300,
  },
  priceText: {
    flex: 1,
    alignContent: 'flex-end',
    color: '#97989F',
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
