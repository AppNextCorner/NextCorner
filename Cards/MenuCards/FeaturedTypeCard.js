import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useOrderButton from '../../hooks/useOrderButton'
import { AntDesign } from '@expo/vector-icons'

const FeaturedTypeCard = (props) => {
  const { setOrder, order } = useOrderButton()
  const { menuItem, businessName, location, logo } = props

  const navigation = useNavigation()


  const goToFoodDetails = () => {
    setOrder(false)
    navigation.navigate('FoodDetails', {
      business: businessName,
      foodItem: menuItem,
      location: location,
      logo: logo,
    })
  }
  return (
    <View style={[styles.cardContainer, styles.shadowBox]}>
      <TouchableOpacity onPress={() => goToFoodDetails()}>
        <View style={styles.container}>
          <View style={styles.ratingContainer}>
            <AntDesign
              style={styles.star}
              name="star"
              size={20}
              color="#ffc247"
            />
            <Text style={styles.rating}>{menuItem.rating}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={menuItem.image} style={styles.image} />
          </View>

          <View style={styles.itemDescription}>
            <Text style={styles.menuItemName}>{menuItem.name}</Text>
            <Text style={styles.descriptionText}>
              {menuItem.description.slice(0, 45) + '...'}
            </Text>
            
          </View>
          <View style={styles.priceContainer}>
          <Text style={styles.menuItemPrice}>${menuItem.price}</Text>
            </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default FeaturedTypeCard

const styles = StyleSheet.create({
  shadowBox: {
    shadowOffset: { width: -2, height: 3 },
    shadowColor: '#171717',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  star: {
    paddingVertical: 5,

  },
  rating: {
    flex: 1,
    margin: '2%',
  },
  ratingContainer: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  descriptionText: {
    marginVertical: '2%',
    fontSize: 10,
    color: '#9c9c9c',
  },
  imageContainer: {
    flex: 2,
  },
  menuItemPrice: {
    marginTop: 5,
    color: '#818281',
    fontWeight: '600',
  },
  menuItemName: {
    fontWeight: '600',
    fontSize: 16,
  },
  // image styles for card
  image: {
    width: '100%',
    height: 125,
    borderRadius: 5,
    flex: 1,
  },
  // description of the card styles
  itemDescription: {
    flex: 1,
    width: 150,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  priceContainer: {
    flex: 0.5,
    
  },
  container: {
    marginHorizontal: 10,
    flex: 1,
    width: 155,
    height: 200,
  },
})
