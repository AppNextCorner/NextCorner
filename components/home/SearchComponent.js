/**
 * Purpose of the component: It contains right now only the UI, but it woulc be used to search for businesses the user may now and look for without having to look through the whole app to find a business that they know
 * - Going to implement a filter for this to work or another expo npm library
 */

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/hook";
import { getBusinesses } from "../../store/slices/BusinessSlice/businessSessionSlice";
// import { getBusiness } from "../../store/slices/BusinessSlice/businessSlice";

export default function SearchComponent() {
  const [showStores, setShowStores] = useState("");

  const vendors = useAppSelector(getBusinesses);
  const navigation = useNavigation();
  const filteredStores = [];
  const mapStores = vendors.map((il) => il.name);

  // goes through all the businesses and checks if the user that typed the store is filtered and if so, add to the list
  for (let i = 0; i < mapStores.length; i++) {
    // grabs the business from an index from the whole businesses list and takes a slice and compares them with the user input to determine which business to show
    if (mapStores[i].slice(0, showStores.length) === showStores) {
      filteredStores.push(vendors[i]);
    }
  }

  // pass the business data which includes the menu
  const goToMenuPage = (item) => {
    navigation.navigate("MenuList", { business: item });
  };

  return (
    <View style={styles.menu}>
      <View style={styles.textInputBox}>
        <View style={styles.magnifyIcon}>
          <Foundation name="magnifying-glass" size={24} color="#f0efed" />
        </View>
        <TextInput
          readOnly={false}
          style={styles.textInput}
          placeholder="Search for Street Vendors"
          value={showStores}
          onChangeText={(text) => {
            // Capitalize the first character of the search term to be able to distinguish the many business
            setShowStores(
              text
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            );
          }}
        />
      </View>
      {showStores !== "" ? (
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="never">
          {filteredStores.map((store, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => goToMenuPage(store)}
              >
                <View style={styles.businesContainer}>
                  <Text style={styles.businesText}>{store.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    height: 125,
  },
  businesText: {
    color: "#6a6b6a",
  },

  businesContainer: {
    padding: "5%",
    borderColor: "#adadad",
    borderBottomWidth: 1,
  },
  // Input box style
  textInputBox: {
    borderWidth: 2,
    borderColor: "#f0efed",
    backgroundColor: "#fff",
    flexDirection: "row",
    marginBottom: 10,
  },
  magnifyIcon: {
    flex: 0.75,
    justifyContent: "center",
    marginLeft: "5%",
  },
  textInput: {
    flex: 6,
    padding: 15,
    
    alignContent: "flex-start",
  },
  menu: {
    paddingHorizontal: '7.5%',
    paddingTop: 5,
    overflow: "hidden",
  },
});
