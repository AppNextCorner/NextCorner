import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";
import RestaurantCategoryCard from "../Cards/RestaurantCategoryCard";

export default function CategoryScrollBar(props) {
  const { categoryList, showItem, itemId } = props;
  return (
    <View style={styles.category}>
      <Text style={styles.title}>Category</Text>

      <View style={styles.list}>
        {/* Scroll View used to be able to quickly scroll horizontally with properties allowing it to do */}
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* Gets data from the category list above to filter the food "menu" */}
          <FlatList
            numColumns={categoryList.length}
            data={categoryList}
            renderItem={({ item }) => (
              <RestaurantCategoryCard
                handlePress={showItem}
                restaurantItem={item}
                foodId={itemId}
              />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedCategory: {
    backgroundColor: "blue",
  },
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
