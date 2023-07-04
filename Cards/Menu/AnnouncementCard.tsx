import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { API } from "constants/API";

/**
 * announcementCard component displays an announcement with its data.
 * @param {*} props - Data from the business main component.
 * @returns {React.ReactNode} - Rendered component.
 */
const AnnouncementCard = (props: any) => {
  const { announcement } = props;

  // Styles for the announcement card
  const backgroundTextStyle = StyleSheet.create({
    background: {
      backgroundColor: announcement.color,
      width: 210,
      height: 125,
      margin: 10,
      flex: 2,
      flexDirection: "column",
      justifyContent: "center",
    },
  });

  const buttonStyle = StyleSheet.create({
    button: {
      backgroundColor: announcement.color,
      flexDirection: "row",
      marginVertical: 20,
      margin: 10,
      borderRadius: 10,
      flex: 1,
      zIndex: 3,
      marginHorizontal: 20,
      alignItems: "center",
    },
  });

  // Render the announcementCard component
  return (
    <TouchableOpacity style={buttonStyle.button} disabled={true}>
      <View style={backgroundTextStyle.background}>
        <Text style={styles.header}>
          {announcement.header.slice(0, 16) + "..."}
        </Text>
        <Text style={styles.text}>{announcement.description.slice(0, 75)}</Text>
      </View>
      <Image
        style={styles.announcementImageContainer}
        source={{
          uri: `${API}/${announcement.image.toString()}`,
        }}
      />
    </TouchableOpacity>
  );
};

export default AnnouncementCard;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    flex: 0.5,
    marginTop: "15%",
    width: 225,
  },
  text: {
    color: "white",
    flex: 1,
    width: 225,
    height: 50,
  },
  cardButton: {
    color: "white",
    flexDirection: "row",
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
});
