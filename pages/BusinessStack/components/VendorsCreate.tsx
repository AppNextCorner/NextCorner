import {
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
    times: vendorTime,
    category: [
      {
        name: "",
        id: 0,
      },
    ],
    menu: menuStructure,
    uid: "",
    rating: 0,
    trending: "",
    storeStatus: "Not Approved",
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
    <View style={styles.page}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        <AntDesign name="arrowleft" size={30} color="#000" />
      </TouchableOpacity>

      <BusinessCard
        disabled={true}
        businessItem={structure}
        checkForStyleChange={true}
        create={true}
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
        <SelectingCategory
          chooseCategory={handlePropertyChange}
          form={structure}
        />
        {/* <SelectingTime times={structure.times} chooseTime={handlePropertyChange}/> */}

        <TouchableOpacity
          onPress={async () =>
            await upload(
              structure.image,
              "/business/uploadStore",
              makeImagePostRequest,
              { payload: structure }
            )
          }
        >
          <Text>Upload Store</Text>
        </TouchableOpacity>
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
  },
});
