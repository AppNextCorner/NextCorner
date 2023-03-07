import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

/**
 * 
 * @param {*} props - Data from the restaurant main component 
 * @returns 
 */
const AnnouncementCard = (props) => {
  const { announcementData } = props
 
  /**
   * Preset data for the announcement images due as it looks better than the faker data
   */
  const [announcement, setAnnouncement] = useState(announcementData)
  const imageList = [
    {
      image: require('../../assets/CategoryIcons/burrito.png'),
    },
    {
      image: require('../../assets/CategoryIcons/pizza.png'),
    },
    {
      image: require('../../assets/CategoryIcons/bread.png'),
    },
  ]
  // Experimental styles that previously used faker.js colors, but restored to preset default styles
  const backgroundTextStyle = {
    backgroundColor: '#78DBFF',
    width: 210,
    height: 125,
    margin: 10,
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  }
  const buttonStyle = {
    backgroundColor: '#78DBFF',
    flexDirection: 'row',
    marginVertical: 20,
    margin: 10,
    borderRadius: 10,
    flex: 1,
    zIndex: 3,
    marginHorizontal: 20,
    alignItems: 'center',
    
  }
  return (
    <TouchableOpacity style={buttonStyle} disabled={true}>
      <View style={backgroundTextStyle}>
        <Text style={styles.header}>{announcement.header.slice(0, 16) + '...'}</Text>
        <Text style={styles.text}>{announcement.text.slice(0, 75)}</Text>
      </View>
      <Image
        style={styles.announcementImageContainer}
        source={imageList[Math.floor(Math.random() * imageList.length)].image}
      />
    </TouchableOpacity>
  )
}

export default AnnouncementCard

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    flex: 0.5,
    marginTop: '15%',
    width: 225,
  },
  text: {
    color: 'white',
    flex: 1,
    width: 225,
    height: 50,
  },
  cardButton: {
    color: 'white',
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
  },
  cardContainer: {
    flex: 1,
  },
  announcementImageContainer: {
    width: 100,
    height: 100,
    flex: 1,
    margin: 10,
  },
})
