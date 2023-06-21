import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import {IP} from '@env'

export default function FoodsCard({ businesItem, checkForStyleChange }) {
  // The style is changed when a category is selected on the home page 
  console.log('image from card: ', `http://${IP}:4020/src/${businesItem.image.toString()}`)
  const changeStyle = (checkForStyleChange) => { 
    let change =
      checkForStyleChange === true
        ? {
            // For the category business list
            height: 250,
            width: '100%',
          }
        : // for the default business list on home screen to display it smaller then the category business list
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
      // pass in data of business items / all of business, but pin pointing which business data to get
      onPress={() =>
        navigation.navigate('MenuList', { business: businesItem })
      }
      style={styles.foodCategoryStyle}
    >
      <View style={changeStyle(checkForStyleChange)}>
        <Image style={styles.foodImages} source={{uri:`http://${IP}:4020/${businesItem.image.toString()}`}} />

        <View style={styles.foodTexts}>
          <MaterialIcons name="store" size={24} color="#606160" />
          <Text style={styles.businesText}>{businesItem.name}</Text>
        </View>
        <View style={styles.ratingContainer}>
        <AntDesign name="star" size={12} color="#ffc247" />
          <Text style={styles.ratingText}>{businesItem.rating}</Text>
          
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
  businesText: {
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
