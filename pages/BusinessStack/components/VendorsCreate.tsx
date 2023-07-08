import {
  SafeAreaView,
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
import { itemType } from "../../../typeDefinitions/interfaces/item.interface";
import BusinessCard from "cards/Home/BusinessCard";
import SelectingCategory from "components/vendors/SelectingCategory";
import { time } from "../../../typeDefinitions/interfaces/IVendor/time";
import { vendorTime } from "constants/vendorTime";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import usePhotoHandler from "hooks/handleVendors/usePhotoHandler";
import { makeImagePostRequest } from "../../../config/axios.config";
import CreateCategories from "./vendorCreate/CreateCategories";

/**
 *
 *
 */

const VendorsCreate = () => {
  const { upload, openImageLibrary } = usePhotoHandler();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [menuStructure, setMenuStructure] = useState<itemType[]>([]);
  const [timeStructure, setTimeStructure] = useState<time[]>(vendorTime);
  const [structure, setStructure] = useState<vendorStructure>({
    name: "",
    image: "",
    // Replace with announcements later when vendor pages are finished
    announcements: {
      cards: [],
      toggle: false,
    },
    location: {
      longitude: "",
      latitude: "",
    },
    itemCategories: [],
    times: vendorTime,
    category: {
      name: "",
      id: 0,
    },
    item: menuStructure,
    uid: "",
    rating: 0,
    trending: "",
    status: {
      text: "",
      color: "",
    },
  });

  const handlePropertyChange = (property: string, text: string | object) => {
    setStructure((prevStructure) => ({
      ...prevStructure,
      [property]: text,
    }));
  };
  const handleImageChange = async () => {
    const response: string = await openImageLibrary();
    handlePropertyChange("image", response);
  };

  return (
    <SafeAreaView style={styles.page}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        <AntDesign name="arrowleft" size={30} color="#000" />
      </TouchableOpacity>
      <View style={styles.cardPreview}>
        <BusinessCard
          disabled={true}
          businessItem={structure}
          checkForStyleChange={true}
          create={true}
        />
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text>Store Name: </Text>
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
        <SelectingCategory
          chooseCategory={handlePropertyChange}
          form={structure}
        />
        <CreateCategories
          chooseCategory={handlePropertyChange}
          form={structure}
        />
        {/* <SelectingTime times={structure.times} chooseTime={handlePropertyChange}/> */}
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.upload}
            onPress={async () =>
              await upload(
                structure.image,
                "/business/uploadStore",
                makeImagePostRequest,
                { payload: structure }
              )
            }
          >
            <Text style={styles.uploadText}>Create Store</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <FlatList 
        data={}

    /> */}
    </SafeAreaView>
  );
};

export default VendorsCreate;

const styles = StyleSheet.create({
  cardPreview: {
    flex: 1,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  uploadContainer: {
    flex: 1,
    alignSelf: "center",
  },
  upload: {
    padding: "5%",
    paddingHorizontal: "35%",
    borderRadius: 10,
    backgroundColor: "#78dbff",
  },
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
    flex: 1.75,
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
  },
});
