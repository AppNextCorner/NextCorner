import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React from "react";
import AnnouncementCard from "cards/Menu/AnnouncementCard";
import { vendor }  from "../../types/interfaces/vendor.interface";

interface Props {
  vendor: vendor;
}
const AnnouncementList = (props: Props) => {
  // Grabbing the data and the direction of the announcement list
  const { vendor } = props;
  const announcements = vendor.announcementCards
  return (
    <>
      {announcements.length > 0 ? (
        <>
          <FlatList
            style={styles.cardContainer}
            horizontal={true}
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").width}
            showsHorizontalScrollIndicator={false}
            data={announcements}
            renderItem={({ item }) => (
              <View>
                <AnnouncementCard announcement={item} />
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
