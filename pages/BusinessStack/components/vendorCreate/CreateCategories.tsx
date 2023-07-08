/**
 * Purpose of the component: It is used to display the list of categories that will filter the list of business that match the category selected by the user
 */

import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { Foundation } from "@expo/vector-icons";
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
interface IProps {
  chooseCategory: (property: string, text: string | object) => void;
  form: vendorStructure;
}
export default function CreateCategories(props: IProps) {
  const { chooseCategory, form } = props;
  const [handleText, setHandleText] = useState("");

  return (
    <View style={styles.chipContainer}>
      <FlatList
        scrollEnabled={false}
        ListHeaderComponent={
          <>
            <Text style={styles.header}>Add categories for your items</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={handleText}
                onChangeText={(text: string) => setHandleText(text)}
                placeholder="Fresh Drinks"
              />
              <TouchableOpacity
                onPress={() =>
                  chooseCategory(
                    "itemCategories",
                    form.itemCategories.concat(handleText)
                  )
                }
                style={styles.add}
              >
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        showsHorizontalScrollIndicator={false}
        numColumns={4}
        data={form.itemCategories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chip}
            onPress={() =>
              chooseCategory(
                "itemCategories",
                form.itemCategories.filter((chip) => chip !== item)
              )
            }
          >
            <View style={styles.chipContent}>
              <Text>{item}</Text>
              <Foundation name="x-circle" size={24} color="#f2f0f0" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chipContent: {
    display: "flex",
    flexDirection: "row",
  },
  chip: {
    backgroundColor: "#fff",
    padding: "2%",
    paddingHorizontal: "3%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    margin: "2%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
  },
  add: {
    padding: "2%",
    paddingHorizontal: "5%",
    backgroundColor: "#78dbff",
  },
  header: {
    color: "#a1a1a1",
    margin: "2%",
  },
  chipContainer: {
    flex: 2,
  },
});
