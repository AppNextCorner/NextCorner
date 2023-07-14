import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useNavigation } from "@react-navigation/native";
// import { AntDesign } from "@expo/vector-icons";
import BusinessCard from "cards/Home/BusinessCard";
import SelectingCategory from "components/vendors/SelectingCategory";
// import { time } from "../../../typeDefinitions/interfaces/IVendor/time";
import { vendorTime } from "constants/vendorTime";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import usePhotoHandler from "hooks/handleVendors/usePhotoHandler";
import { makeImagePostRequest } from "../../../config/axios.config";
import { Iitem } from "../../../typeDefinitions/interfaces/item.interface";
import CreateCategories from "./vendorCreate/CreateCategories";
import { useAppSelector } from "../../../store/hook";
import { getUser } from "../../../store/slices/userSessionSlice";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";

/**
 *
 *
 */
const VendorsCreate = () => {
  const { upload, openImageLibrary } = usePhotoHandler();
  const user = useAppSelector(getUser)

  // const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [menuStructure] = useState<Iitem[]>([]);
  // const [timeStructure, setTimeStructure] = useState<time[]>(vendorTime);
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
    menu: menuStructure,
    uid: user?._id,
    rating: 0,
    trending: "",
    storeStatus: "Not Approved",
    status: {
      text: "",
      color: "",
    },
  });

  const handlePropertyChange = (property: string, text: any) => {
    setStructure((prevStructure) => ({
      ...prevStructure,
      [property]: text,
    }));
  };
  const handleImageChange = async () => {
    const response: string | null = await openImageLibrary();
    handlePropertyChange("image", response);
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  return (
    <View style={{ flex: 1, paddingTop: '5%', backgroundColor: '#fff' }}>
      <NextCornerVendorHeader />
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.page}
        enabled={Platform.OS === "ios" ? true : false}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
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
          <View style={styles.categoriesContainer}>
            <SelectingCategory
              chooseCategory={handlePropertyChange}
              form={structure}
            />
            <CreateCategories
              chooseCategory={handlePropertyChange}
              form={structure}
            />
          </View>

          {/* <SelectingTime times={structure.times} chooseTime={handlePropertyChange}/> */}
        </View>
      </KeyboardAvoidingView>
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.upload}
          onPress={() =>
            upload(
              structure.image,
              "/business/createStore",
              makeImagePostRequest,
              { payload: structure },
              user?._id!,
            )
          }
        >
          <Text style={styles.uploadText}>Create Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VendorsCreate;
const styles = StyleSheet.create({
  categoriesContainer: {
    flex: 1,
  },
  cardPreview: {
    flex: 1.5,
    maxHeight: "30%",
    marginBottom: 20,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  uploadContainer: {
    paddingBottom: '7.5%',
    backgroundColor: '#fff',
  },
  upload: {
    
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#78dbff",
  },
  imageForm: {
    marginHorizontal: 5,
    padding: "2.5%",
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    marginBottom: 20,
  },
  inputContainer: {
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  goBackButton: {
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
    width: 40,
    alignItems: "center",
  },
});
