import { StyleSheet, View, Text, FlatList } from "react-native";
import React from "react";
import RestaurantCard from "../Cards/RestaurantCard";

export default function RestaurantListComponent(props) {

  return (
    <View>
      {/* props is used to allow the use of multiple cards of */}
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.list}>
        {/* In order for the display to be a role, each card will need its own column and got this from the amount of cards there are */}

        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={props.restaurants}
          renderItem={({ item }) => <RestaurantCard restaurantItem={item} />}
        />
      </View>
      
      {/* For dividing each section of the trending categories */}
      <View style={styles.margin}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    // fontFamily: 'monospace',
  },
  margin: {
    backgroundColor: "#f2f3f5",
    flex: 1,
    paddingVertical: 5,
  },

  list: {
    
  },
});
