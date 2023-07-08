/**
 * Purpose of the component: It is used to display the list of categories that will filter the list of business that match the category selected by the user
 */

import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

import { foodCategories } from "constants/vendorCategories";
import { vendorStructure } from "../../typeDefinitions/interfaces/IVendor/vendorStructure";
interface IProps {
  chooseCategory: (property: string, text: string | object) => void;
  form: vendorStructure;
}
export default function SelectingCategory(props: IProps) {
  const { chooseCategory, form } = props;

  // Check if each chip is selected
  const toggleChip = (category: string): StyleProp<ViewStyle> => {
    let change: StyleProp<ViewStyle> = {
      backgroundColor: form.category.name.includes(category) ? "#78dbff" : "#fff",
      padding: "2%",
      paddingHorizontal: "3%",
      borderRadius: 20,
      borderWidth: 3,
      borderColor: "#f2f0f0",
      margin: "2%",
    };
    return change;
  };
  return (
    <View style={styles.chipContainer}>
      <FlatList
        scrollEnabled={false}
        ListHeaderComponent={
          <Text style={styles.header}>
            Select what category your store fits:
          </Text>
        }
        showsHorizontalScrollIndicator={false}
        numColumns={4}
        data={foodCategories.slice(0, 10)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={toggleChip(item.text)}
            onPress={() => chooseCategory("category", {name: item.text, id: item.key})}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "#a1a1a1",
    margin: "2%",
  },
  chipContainer: {
    alignSelf: "center",
    flex: 1
  },
});
