import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import AnnouncementCard from '../../Cards/MenuCards/AnnouncementCard'

const AnnouncementList = (props) => {
  const { announcementData, horizontal } = props
  const [announcement, setAnnouncement] = useState(announcementData)

  return (
    <>
      {announcement.length > 0 ? (
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
      ) : (
        <View style={styles.cardNullContainer}></View>
      )}
    </>
  )
}

export default AnnouncementList

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    //flexDirection: 'row',
  },
  cardNullContainer: {
    flex: 1,
    marginTop: 50,
    //flexDirection: 'row',
  },
  timeOfMenu: {
    marginLeft: '10%',
    marginBottom: '-5%',
    color: '#fff',
    fontWeight: '600'
  },
})
