import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { vendor } from "../../../typeDefinitions/interfaces/vendor.interface";
import { itemType } from "../../../typeDefinitions/interfaces/item.interface";
import BusinessCard from "cards/Home/BusinessCard";
/**
 *
 *
 */

const VendorsCreate = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [menuStructure, setMenuStructure] = useState<itemType[]>([]);
  const [structure, setStructure] = useState<vendor>({
    name: "",
    image: "",
    // Replace with announcements later when vendor pages are finished
    announcementCards: [],
    location: {
      longitude: "",
      latitude: "",
    },
    open: "",
    close: "",
    category: {
      category: "",
    },
    item: menuStructure,
    userId: 0,
    categoryId: 0,
    trendingCategory: "",
    rating: 0,
    trending: "",
    status: {
      text: "",
      color: "",
    },
    id: "",
  });

  const handlePropertyChange = (property: string, text: string) => {
    setStructure((prevStructure) => ({
      ...prevStructure,
      [property]: text,
    }));
  };
  return (
    <View style={styles.page}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>

      <BusinessCard businessItem={structure} checkForStyleChange={true} />
      <View style={styles.form}>
        <Text>Name: </Text>
        <TextInput
          value={structure.name}
          onChangeText={(text) => handlePropertyChange("name", text)}
          placeholder="John Doe's Stand"
        />
      </View>

      {/* <FlatList 
        data={}

    /> */}
      <Text>VendorsCreate</Text>
    </View>
  );
};

export default VendorsCreate;

const styles = StyleSheet.create({
  form: {
    flex: 2,
  },
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  goBackButton: {
    marginTopLeft: "5%",
    marginLeft: "5%",
    marginTop: "10%",
    borderRadius: 20,
    padding: "2%",
    width: "12.5%",
    backgroundColor: "#78DBFF",
  },
});
