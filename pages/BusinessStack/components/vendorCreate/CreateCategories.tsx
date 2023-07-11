/**
 * Purpose of the component: It is used to display the list of categories that will filter the list of business that match the category selected by the user
 */

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
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
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  return (
    <View style={styles.chipContainer}>
      <FlatList
        scrollEnabled={true}
        ListHeaderComponent={
          <>
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1 }}
              enabled
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <Text style={styles.header}>Add categories for your items</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={handleText}
                  onChangeText={(text: string) => setHandleText(text)}
                  placeholder="Fresh Drinks"
                />
                <TouchableOpacity
                  onPress={() => {
                    chooseCategory(
                      "itemCategories",
                      form.itemCategories.concat(handleText)
                    );
                    setHandleText("");
                  }}
                  style={styles.add}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </>
        }
        showsHorizontalScrollIndicator={false}
        numColumns={4}
        data={form.itemCategories}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.chip}
            onPress={() =>
              chooseCategory(
                "itemCategories",
                form.itemCategories.filter(
                  (_chip, itemIndex) => itemIndex !== index
                )
              )
            }
          >
            <View style={styles.chipContent}>
              <Foundation name="x-circle" size={24} color="#f2f0f0" />
              <Text style={styles.chipText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chipText: {
    fontSize: 16,

  },
  chipContent: {
    flexDirection: "row",
    padding: '1%',
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
  },
  input: {
    flex: 1,
  },
  add: {
    padding: "2%",
    paddingHorizontal: "5%",
    backgroundColor: "#78dbff",
    borderRadius: 5,
  },
  header: {
    color: "#a1a1a1",
    margin: "2%",
  },
  chipContainer: {
    flex: 1.5,
    borderRadius: 10,
    //backgroundColor: 'red'
  },
});
