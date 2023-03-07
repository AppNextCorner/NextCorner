import { StyleSheet, View, Text, TouchableOpacity, Image, Pressable } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

export default function MenuItemCard({ foodItem }) {
  const navigation = useNavigation()

  let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum placerat justo, nec consectetur diam pellentesque a."

  let limitTextAmount = text.slice(0, 75) + "...";
  return (
    // Each card is going to have a different data source, so we need to create a custom button being the touchable opacity in order to navigate through the cards and as well as pass in data through the cards with navigation
    <Pressable
      onPress={() => navigation.navigate('FoodDetails', foodItem)}
      style={styles.foodCategoryStyle}
      
    >
      <View style={styles.card}>
        <View style={styles.foodTexts}>
          <Text style={styles.categoryText}>{foodItem.title}</Text>
          <Text style={styles.descriptionOfItem}>{limitTextAmount}</Text>
          <Text style={styles.priceText}>{foodItem.price}</Text>
        </View>
        {/* Store image with button  */}
        <View style={styles.imageBox}>
          <Image style={styles.foodImages} source={foodItem.image} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  descriptionOfItem: {
    flex: 1,
    fontSize: 10,
    
    //fontFamily: 'monospace',
  },
  imageBox: {
    flex: 1,
    width: '100%',
    height: '100%',
    
  },  
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
    flex: 1,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: 'bold',
    //fontFamily: 'monospace',
    marginTop: 15,
    flex: 1,
    
  },
  foodImages: {
    width: '50%',
    flex: 1,

    // Increase the image size
    padding: '30%',
    marginLeft: 25,
    marginTop: '18%',
    marginBottom: '70%',
    borderRadius: 10,
  },
  card: {
    width: 250,
    height: 115,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    
  },
  priceText: {
    flex: 1,
    alignContent: 'flex-end',
    color: '#97989F',
    marginTop: 0,
  },
  foodTexts: {
    flex: 2,
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 5,
    
    
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderStyle: 'solid',
    
    borderBottomWidth: 1,
    
    
    marginBottom: -0.1,
    marginTop: 0,
    
  },
})
