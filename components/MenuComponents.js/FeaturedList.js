import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import FeaturedTypeCard from '../../Cards/MenuCards/FeaturedTypeCard'

const FeaturedList = (props) => {
  const { menuData, businessName } = props
  console.log('menuData', menuData)
  const findFeaturedList = menuData.filter((item) => item.featured === true)
  console.log('featuredList', findFeaturedList)
  console.log('featured businessName', businessName)
  return (
    <>
      <Text style={styles.featuredText}>Featured</Text>
      <FlatList
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').width}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={findFeaturedList}
        style={styles.featuredList}
        renderItem={({ item }) => {
          return (
            <View style={styles.featuredCard}>
              <FeaturedTypeCard menuItem={item} businessName={businessName} />
            </View>
          )
        }}
      />
      <View style={styles.margin}></View>
    </>
  )
}

export default FeaturedList

const styles = StyleSheet.create({
  featuredCard: {},
  margin: {
    backgroundColor: '#f2f3f5',
    //flex: 1,
    paddingVertical: 5,
  },
  featuredText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: '3%',
  },
  featuredList: {
    marginBottom: '5%',
  },
})
