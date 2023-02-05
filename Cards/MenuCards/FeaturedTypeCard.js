import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useOrderButton from '../../hooks/useOrderButton';

const FeaturedTypeCard = (props) => {
    const { setOrder, order} = useOrderButton();
  const { menuItem, businessName, location, logo  } = props
  console.log("businessName: " + businessName)
  const navigation = useNavigation()
  const nameSplice = menuItem.name.substring(0, 20) + '...'
  console.log('menuItem', menuItem)
  console.log('location: ' + location)
  const goToFoodDetails = () => {
    setOrder(false);
    navigation.navigate('FoodDetails',  {
      business: businessName,
      foodItem: menuItem,
      location: location,
      logo: logo
    })
  }
  return (
    <TouchableOpacity onPress={() => goToFoodDetails()}>
      <View style={styles.container}>
        <View>
          <Image
            source={menuItem.image}
            style={styles.image}
          />
        </View>

        <View style={styles.itemDescription}>
          <Text style={styles.menuItemName}>{menuItem.name}</Text>
          <Text style={styles.menuItemPrice}>${menuItem.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default FeaturedTypeCard

const styles = StyleSheet.create({
  menuItemPrice: {
    marginTop: 5,
  },
  menuItemName: {
    fontWeight: 'bold',
  },
  // image styles for card
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  // description of the card styles
  itemDescription: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
   
  },
  container: {
    marginLeft: 10,
    flex: 1,
    width: 150,
    
  },
})
