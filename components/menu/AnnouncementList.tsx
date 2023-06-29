import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import AnnouncementCard from "cards/Menu/AnnouncementCard";

/**
 * What is open?
 * What is close?
 * What is announcementData?
 */
interface Props {
  announcementData: any;
  horizontal: boolean;
  open?: any;
  close?: any;
}
const AnnouncementList = (props: Props) => {
  // Grabbing the data and the direction of the announcement list
  const { announcementData, horizontal } = props;

  const [announcement, setAnnouncement] = useState(
    announcementData.announcementCards
  );
  return (
    <>
      {announcement.length > 0 ? (
        <>
          <FlatList
            style={styles.cardContainer}
            horizontal={horizontal}
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").width}
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
  );
};

export default AnnouncementList;

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
    marginLeft: "10%",
    marginBottom: "-5%",
    color: "#fff",
    fontWeight: "600",
  },
});
