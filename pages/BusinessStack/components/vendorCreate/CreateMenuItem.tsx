import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Iitem } from "../../../../typeDefinitions/interfaces/item.interface";
import { useNavigation, useRoute } from "@react-navigation/native";
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { TextInput } from "react-native-gesture-handler";
import usePhotoHandler from "hooks/handleVendors/usePhotoHandler";
import SelectCategoryDropDown from "components/vendors/SelectCategoryDropDown";
import { makeImagePostRequest } from "../../../../config/axios.config";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import EditingMenuItemCard from "cards/Vendors/EditingMenuItemCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { handlePropertyChange } from "hooks/components/handleChangeProperty";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import {
  getModel,
  setCustomizations,
  setModel,
  setModelCustomizations,
} from "../../../../store/slices/BusinessSlice/menuCreateSlice";
import { debounce } from "hooks/components/handleTimeout";
import { vendorBoilerplate } from "constants/components/boilerplates";
import { getUserBusiness } from "../../../../store/slices/BusinessSlice/businessSessionSlice";

interface RouteParams {
  store: { store: vendorStructure };
  update?: boolean;
  updateItem?: Iitem;
}

const CreateMenuItem = () => {
  const route = useRoute();
  const [debouncer, setDebouncer] = React.useState(false);
  const userStore = useAppSelector(getUserBusiness)
  // vendor is vendorStructure type
  const store = userStore![0]
  console.log('store: ', store)
  const { update, updateItem }: RouteParams =
    route.params as RouteParams;

  // Hooks

  const model = !updateItem ? useAppSelector(getModel) : updateItem;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { openImageLibrary } = usePhotoHandler();
  const { upload } = usePhotoHandler();

  const [item, setItem] = useState<Iitem>(model);
  const [debouncedItem, setDebouncedItem] = useState<Iitem>(item);
  const [requestSent, setRequestSent] = React.useState(false); // State to track if the request has been sent

  const handleDebouncedUpload = async () => {
    try {
      // Add store info to the menu item
      handlePropertyChange(setItem, "storeInfo", {
        storeName: store.name,
        storeId: store.id,
        storeOwner: store.uid
      });

      // Reset values for the whole menu item
      await upload(
        item.image,
        "item",
        // Check if the item is being updated or uploaded
        makeImagePostRequest,
        {
          payload: { store: store, newMenu: [debouncedItem] },
        },
        store.uid!
      );
      dispatch(setModel(vendorBoilerplate));
      dispatch(setCustomizations([]));

      // Set requestSent to true to indicate the request has been sent
      setRequestSent(true);
    } catch (error) {
      // Handle any errors if necessary
      console.error("Error during upload:", error);
    }
  };
  const debouncedUpload = () => {
    if (!debouncer) {
      // If debouncer is false, set it to true and perform the action
      console.log('please wait...')
      setDebouncer(true);


      // Call the handleDebouncedUpload function only if the request has not been sent yet
      if (!requestSent) {
        handleDebouncedUpload();
      }
    }
  };


  React.useEffect(() => {
    const debouncedDispatch = debounce((updatedItem: Iitem) => {
      console.log("Debounced item has changed:", updatedItem);
      
      dispatch(setModel(updatedItem));
      dispatch(setModelCustomizations());
    }, 300); // Set the debounce delay as per your needs (e.g., 300ms)

    debouncedDispatch(debouncedItem);

    // Cleanup the debounce function
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedItem, dispatch]);

  // Update debouncedItem whenever item changes
  React.useEffect(() => {
    setDebouncedItem(item);
  }, [item]);
  // Change a menu item property

  // Image handler changer
  const handleImageChange = async () => {
    const response: string | null = await openImageLibrary();
    handlePropertyChange(setItem, "image", response);
  };

  const handleNavigationChange = (route: string, data: null | any) => {
    navigation.navigate(route, data !== null ? { data: data } : null);
  };
  return (
    <>
      <NextCornerVendorHeader />
      <ScrollView style={styles.page}>
        <View style={styles.previewContainer}>
          <EditingMenuItemCard menuItem={item} vendor={store} />
        </View>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>General Info: </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text>Item Name: </Text>
            <TextInput
              style={styles.inputElement}
              value={item.name}
              onChangeText={(text) =>
                handlePropertyChange(setItem, "name", text)
              }
              placeholder="Taco"
            />
          </View>

          <View style={styles.timeContainer}>
            {/* TODO: Fix on checking the correct image */}
            <Pressable onPress={handleImageChange}>
              <View style={styles.imageForm}>
                <Text>Add Image</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                handleNavigationChange("VendorCustomizationCreate", {
                  custom: item.customizations,
                });
              }}
            >
              <View style={styles.imageForm}>
                <Text>Add Customizations</Text>
              </View>
            </Pressable>
          </View>

          {/* Price and time to prepare */}
          <View>
            <View style={styles.input}>
              <Text>Price: </Text>
              <View style={styles.container}>
                <Text>$</Text>
                <TextInput
                  style={styles.inputElement}
                  keyboardType="numeric"
                  value={item.price.toString()}
                  onChangeText={(text) => {
                    const numericValue = parseFloat(
                      text.replace(/[^0-9.]/g, "")
                    );
                    handlePropertyChange(
                      setItem,
                      "price",
                      isNaN(numericValue) ? 0 : numericValue
                    );
                  }}
                  placeholder="1.30"
                />
              </View>
            </View>
            <View>
              <View>
                <View style={styles.subHeaderContainer}>
                  <Text style={styles.subHeader}>Time to Prepare: </Text>
                </View>

                <View style={styles.timeContainer}>
                  <View style={[styles.container, styles.input]}>
                    <Text>Minutes: </Text>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.inputElement}
                      value={item?.time?.minutes?.toString() ?? ""}
                      onChangeText={(text) => {
                        const numericValue = parseInt(
                          text.replace(/[^0-9]/g, "")
                        );
                        handlePropertyChange(setItem, "time", {
                          minutes: isNaN(numericValue) ? 0 : numericValue,
                          seconds: item.time.seconds,
                        });
                      }}
                      placeholder="1"
                    />
                  </View>
                  <View style={[styles.container, styles.input]}>
                    <Text>Seconds: </Text>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.inputElement}
                      value={item?.time?.seconds?.toString() ?? ""}
                      onChangeText={(text) => {
                        const numericValue = parseInt(
                          text.replace(/[^0-9]/g, "")
                        );
                        handlePropertyChange(setItem, "time", {
                          minutes: item.time.minutes,
                          seconds: isNaN(numericValue) ? 0 : numericValue,
                        });
                      }}
                      placeholder="1"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Category Dropdown*/}
          <View style={styles.dropdown}>
            <SelectCategoryDropDown
              store={store}
              handlePropertyChange={handlePropertyChange}
              setItem={setItem}
            />
          </View>

          {/* Description */}
          <View style={styles.input}>
            <Text>Description: </Text>
            <TextInput
              style={[
                styles.inputElement,
                { height: 100, textAlignVertical: "top" },
              ]}
              multiline={true}
              numberOfLines={4}
              value={item.description}
              onChangeText={(text) =>
                handlePropertyChange(setItem, "description", text)
              }
              placeholder="Handmade tacos from..."
            />
          </View>
          <Pressable
            style={styles.upload}
            onPress={() => {
              debouncedUpload();
            }}
          >
            <Text style={{ color: "#fff" }}>
              {update ? "Edit" : "Upload Item"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default CreateMenuItem;

const styles = StyleSheet.create({
  upload: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#78dbff",
  },
  dropdown: { flex: 1 },
  subHeaderContainer: { marginLeft: "5%" },
  subHeader: { fontWeight: "700" },
  inputElement: { flex: 1, backgroundColor: "#fff" },
  timeContainer: { flexDirection: "row", justifyContent: "center" },
  container: { flexDirection: "row", flex: 1 },
  imageForm: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    padding: "5%",
    flex: 1,
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
  },
  form: { flex: 1, backgroundColor: "#fff" },
  page: { flex: 1, backgroundColor: "#fff" },
  previewContainer: {
    flex: 1,
    margin: "5%",
    borderColor: "#d6d6d6",
    borderStyle: "solid",
    borderWidth: 2,
  },
  input: {
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: "5%",
    marginVertical: 5,
    flexDirection: "column",
    flex: 1,
  },
});
