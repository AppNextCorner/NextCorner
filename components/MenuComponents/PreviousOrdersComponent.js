import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { useAppSelector } from '../../store/hook'
import { getOrders } from '../../store/slices/addToOrders'
import PreviousOrderCard from '../../Cards/MenuCards/PreviousOrderCard'
import { useNavigation } from '@react-navigation/native'
import useOrderButton from '../../hooks/useOrderButton'

const PreviousOrdersComponent = (props) => {
  const { businessName, listData,  location, logo } = props
  // const previousOrders = useAppSelector(getOrders)

  // accessing the list containing the cardData and restaurant information

  console.log('listdata', listData)

  return (
    <View>
      {listData.length > 0 ? (
        <>
          <Text style={styles.featuredText}>
            Order your favorite items again
          </Text>
          <FlatList
            decelerationRate={0}
            snapToInterval={200} //your element width
            snapToAlignment={'start'}
            data={listData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <PreviousOrderCard
                previousOrders={item}
                businessName={businessName}
          
                location={location}
                logo={logo}
              />
            )}
          />
          <View style={styles.margin}></View>
        </>
      ) : null}
    </View>
  )
}

export default PreviousOrdersComponent

const styles = StyleSheet.create({
  margin: {
    backgroundColor: '#f2f3f5',
    //flex: 1,
    paddingVertical: 5,
  },
  featuredText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: '3%',
  },
})
