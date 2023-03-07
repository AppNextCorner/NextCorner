import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AnnouncementCard from '../../Cards/MenuCards/AnnouncementCard'

const AnnouncementList = (props) => {
  const { announcementData, horizontal } = props
  const [announcement, setAnnouncement] = useState(announcementData)

  console.log('announce list: ', announcement)
  return (
    <>
      <FlatList
        style={styles.cardContainer}
        horizontal={horizontal}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').width}
        showsHorizontalScrollIndicator={false}
        data={announcement}
        renderItem={({ item }) => (
          <View>
            <AnnouncementCard announcementData={item} />
          </View>
        )}
      />
    </>
  )
}

export default AnnouncementList

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    //flexDirection: 'row',
  },
})
