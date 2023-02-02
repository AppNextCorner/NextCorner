import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import FeaturedTypeCard from '../../Cards/MenuCards/FeaturedTypeCard';

const FeaturedList = (props) => {
    const { menuData, businessName } = props;
    console.log('menuData', menuData);
    const findFeaturedList = menuData.filter(item => item.featured === true);
    console.log("featuredList", findFeaturedList);
    console.log('featured businessName', businessName);
  return (
   <>
    <Text style={styles.featuredText}>Items Featured</Text>
    <FlatList
        horizontal={true}
        data={findFeaturedList}
        
        renderItem={({item}) => {

            return(
                <FeaturedTypeCard 
                menuItem={item} businessName={businessName}/>
            )
        }}
    />
   </>
  )
}

export default FeaturedList

const styles = StyleSheet.create({
    featuredText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: '3%'
    }
})