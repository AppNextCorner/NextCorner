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
import usePhotoHandler from "hooks/handleVendors/usePhotoHandler";
import SelectingCategory from "components/vendors/SelectingCategory";

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
    category: "",
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
  const handleImageChange = async() => {
    const response: string = await openImageLibrary() 
    handlePropertyChange('image', response)
  }
  const { openImageLibrary } = usePhotoHandler();
  return (
    <View style={styles.page}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>

      <BusinessCard
        disabled={true}
        businessItem={structure}
        checkForStyleChange={true}
      />
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text>Name: </Text>
          <TextInput
            value={structure.name}
            onChangeText={(text) => handlePropertyChange("name", text)}
            placeholder="John Doe's Stand"
          />
        </View>

        <TouchableOpacity onPress={handleImageChange}>
          <View style={styles.imageForm}>
            <Text>Add Image</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text>Hello</Text>
          <SelectingCategory chooseCategory={handlePropertyChange}/>
          
        </View>
      </View>

      {/* <FlatList 
        data={}

    /> */}
    </View>
  );
};

export default VendorsCreate;

const styles = StyleSheet.create({
  imageForm: {
    marginHorizontal: "5%",
    padding: "5%",
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
  },
  inputContainer: {
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    backgroundColor: "#fff",
    padding: "4%",
    margin: "5%",
    flexDirection: "column",
  },
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
