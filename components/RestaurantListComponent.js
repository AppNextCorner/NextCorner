import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import FoodsCard from "../Cards/RestaurantCard";

export default function RestaurantListComponent(props) {
  console.log("LOOk" + props.categoryItems);
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
          data={props.categoryItems}
          renderItem={({ item }) => <FoodsCard foodCategory={item} />}
        />
      </View>
      {/* For dividing each section of the trending categories */}
      <Text style={styles.margin}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    marginTop: 10,
  },
  margin: {
    backgroundColor: "#f2f3f5",
    flex: 1,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  category: {
    paddingVertical: 25,
    flex: 0,
    alignContent: "center",
  },
  list: {
    alignContent: "center",
    flex: 0,
  },
});
