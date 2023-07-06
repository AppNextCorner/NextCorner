/**
 * Purpose of the component: It is used to display the list of categories that will filter the list of business that match the category selected by the user
 */

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { foodCategories } from "constants/vendorCategories";
interface IProps {
  chooseCategory: (property: string, text: string) => void;
}
export default function SelectingCategory(props: IProps) {
  const { chooseCategory } = props;
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={foodCategories}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chip} onPress={() => chooseCategory('category', item.text)}>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    chip: {
        padding: '2%',
        paddingHorizontal: '3%'
    }
})
