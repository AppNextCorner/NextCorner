import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const AnnouncementCard = (props) => {
  const { announcementData } = props
  console.log('announcementData', announcementData)
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
  const backgroundTextStyle = {
    backgroundColor: announcement.backgroundColor,
    width: 230,
    height: 100,
    margin: 10,
  }
  const buttonStyle = {
    backgroundColor: announcement.backgroundColor,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
  }
  return (
    <TouchableOpacity style={buttonStyle} disabled={true}>
      <View style={backgroundTextStyle}>
        <Text style={styles.header}>{announcement.header}</Text>
        <Text style={styles.text}>{announcement.text}</Text>
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
  },
  cardButton: {
    backgroundColor: 'red',
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
    flex: 2,
    margin: 10,
  },
})
