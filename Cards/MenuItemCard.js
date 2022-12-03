import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

export default function MenuItemCard({ foodItem }) {
  const navigation = useNavigation()
  const route = useRoute()

  return (
    // Each card is going to have a different data source, so we need to create a custom button being the touchable opacity in order to navigate through the cards and as well as pass in data through the cards with navigation
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodDetails', foodItem)}
      style={styles.foodCategoryStyle}
    >
      <View style={styles.card}>
        <View style={styles.foodTexts}>
          <Text style={styles.categoryText}>{foodItem.title}</Text>
          <Text style={styles.priceText}>{foodItem.price}</Text>
        </View>
        {/* Store image with button  */}
        <View style={styles.imageBox}>
          <Image style={styles.foodImages} source={foodItem.image} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },  
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
    flex: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    flex: 1,
  },
  foodImages: {
    width: '50%',
    flex: 1,

    // Increase the image size
    padding: '30%',
    marginLeft: 25,
    marginTop: '25%',
    marginBottom: '60%',
    borderRadius: 10,
  },
  card: {
    width: 250,
    height: 135,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  priceText: {
    flex: 1,
    alignContent: 'flex-end',
    color: '#97989F',
  },
  foodTexts: {
    flex: 2,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: 'red'
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    margin: 15,
    
  },
})
