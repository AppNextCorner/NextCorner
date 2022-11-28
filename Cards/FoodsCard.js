import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function FoodsCard({ foodCategory }) {
  const navigation = useNavigation()

  return (
    // Each card is going to have a different data source, so we need to create a custom button being the touchable opacity in order to navigate through the cards and as well as pass in data through the cards with navigation
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodDetails', foodCategory)}
      
      style={styles.foodCategoryStyle}
    >
      <View style={styles.card}>
        <Image style={styles.foodImages} source={foodCategory.foodImage} />
        <View style={styles.foodTexts}>
          <Text style={styles.categoryText}>{foodCategory.name}</Text>
          <Text style={styles.priceText}>{foodCategory.price}</Text>
        </View>
      </View>
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
