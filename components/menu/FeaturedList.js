import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import FeaturedTypeCard from '@cards/Menu/FeaturedTypeCard'

const FeaturedList = (props) => {
  const { menuData, businessName, location } = props
  // grab all items from the business menu to get the menu items that are featured
  const findFeaturedList = menuData.filter((item) => item.featured === true)
 
  return (
    <>
      {findFeaturedList.length > 0 ? (
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
            renderItem={({ item, index }) => {
              return (
                <View style={styles.featuredCard} key={index}>
                  <FeaturedTypeCard
                    menuItem={item}
                    businessName={businessName}
                    location={location}
                  />
                </View>
              )
            }}
          />
          <View style={styles.margin}></View>
        </>
      ) : null}
     
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
