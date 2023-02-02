import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useOrderButton from '../../hooks/useOrderButton';

const FeaturedTypeCard = (props) => {
    const { setOrder, order} = useOrderButton();
  const { menuItem, businessName } = props
  console.log("businessName: " + businessName)
  const navigation = useNavigation()
  const nameSplice = menuItem.name.substring(0, 15) + '...'
  console.log('menuItem', menuItem)
  const goToFoodDetails = () => {
    setOrder(false);
    navigation.navigate('FoodDetails',  {business: businessName, foodItem: menuItem})
  }
  return (
    <TouchableOpacity onPress={() => goToFoodDetails()}>
      <View style={styles.container}>
        <View>
          <Image
            source={menuItem.image}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </View>

        <View style={styles.itemDescription}>
          <Text>{nameSplice}</Text>
          <Text>{menuItem.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default FeaturedTypeCard

const styles = StyleSheet.create({
  itemDescription: {
    flex: 1,
    width: '95%',
    //marginTop: 20
  },
  container: {
    marginLeft: 10,
    flex: 1,
  },
})
