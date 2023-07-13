import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import MenuItemCard from "cards/Menu/MenuItemCard";
import { Iitem } from "../../../../typeDefinitions/interfaces/item.interface";
import { useRoute } from "@react-navigation/native";
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import usePhotoHandler from "hooks/handleVendors/usePhotoHandler";
import SelectCategoryDropDown from "components/vendors/SelectCategoryDropDown";
import { makeImagePutRequest } from "../../../../config/axios.config";

interface RouteParams {
  store: { store: vendorStructure };
}

const CreateMenuItem = () => {
  // Hooks
  const route = useRoute();
  const { openImageLibrary } = usePhotoHandler();
  const { upload } = usePhotoHandler();
  // vendor is vendorStructure type
  const { store }: RouteParams = route.params as RouteParams;
  const [item, setItem] = useState<Iitem>({
    name: "",
    time: {
      minutes: 0,
      seconds: 0,
    },
    image: "",
    price: 0,
    description: "",
    customizations: [],
    category: "",
    featured: false,
    amountInCart: 0,
    rating: 0,
    storeInfo: {
      storeName: store.store.name,
      storeId: store.store.id,
    },
  });
  // Change a menu item property
  const handlePropertyChange = (
    setState: Dispatch<SetStateAction<any>>,
    property: string,
    text: string | object
  ) => {
    setState((prevStructure: any) => ({
      ...prevStructure,
      [property]: text,
    }));
    console.log('new item: ', item)
  };

  // Image handler changer
  const handleImageChange = async () => {
    const response: string = await openImageLibrary();
    console.log("here is image response: ", response);
    handlePropertyChange(setItem, "image", response);
  };
  interface tim {

      minutes: number;
      seconds: number;

  }

  const TimeInput = ({ format }: { format: 'seconds' | 'minutes' }) => {
    const [time, setTime] = useState<tim>({ seconds:0, minutes:0 }); // Initial time values
  
    const value = time && time[format] ? time[format].toString() : '';
  
    return (
      <View style={[styles.container, styles.input]}>
        <TextInput
          keyboardType="numeric"
          style={styles.inputElement}
          value={value}
          onChangeText={(text) => {
            const numericValue = parseInt(text.replace(/[^0-9]/g, ""));
            setTime((prevTime) => ({
              ...prevTime,
              [format]: isNaN(numericValue) ? 0 : numericValue,
            }));
            //handlePropertyChange(setItem, 'time',value)
          }}
          placeholder="1"
        />
        <Text> {format}</Text>
      </View>
    );
  };
  
  

  return (
    <ScrollView style={styles.page}>
      <View style={styles.previewContainer}>
        <MenuItemCard menuItem={item} disabled={true} />
      </View>
      <View style={styles.form}>
        <View style={styles.input}>
          <Text>Item Name: </Text>
          <TextInput
            value={item.name}
            onChangeText={(text) => handlePropertyChange(setItem, "name", text)}
            placeholder="Taco"
          />
        </View>

        {/* TODO: Fix on checking the correct image */}
        <TouchableOpacity onPress={handleImageChange}>
          <View style={styles.imageForm}>
            <Text>Add Image</Text>
          </View>
        </TouchableOpacity>

        {/* Price and time to prepare */}
        <View>
          <View style={styles.input}>
            <Text>Price: </Text>
            <View style={styles.container}>
              <Text>$</Text>
              <TextInput
                // TODO: Test with price
                //keyboardType="numeric"
                value={item.price.toString()}
                onChangeText={(text) =>
                  handlePropertyChange(
                    setItem,
                    "price",
                    text.replace(/[^0-9]/g, "")
                  )
                }
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
                <TimeInput format={"minutes"} />
                <TimeInput format={"seconds"} />
              </View>
            </View>
          </View>
        </View>
        {/* Category Dropdown*/}
        <View style={styles.dropdown}>
          <SelectCategoryDropDown
            store={store.store}
            handlePropertyChange={handlePropertyChange}
            setItem={setItem}
          />
        </View>

        {/* Description */}
        <View style={styles.input}>
          <Text>Description: </Text>
          <TextInput
            style={{ height: 150, textAlignVertical: "top" }}
            multiline={true}
            numberOfLines={4}
            value={item.description}
            onChangeText={(text) =>
              handlePropertyChange(setItem, "description", text)
            }
            placeholder="Handmade tacos from..."
          />
        </View>
        <TouchableOpacity
          style={styles.upload}
          onPress={() =>
            upload(
              item.image,
              "/business/updateMenu",
              makeImagePutRequest,
              { 
                payload: {store: store.store, newMenu: [item] },

               },
              store.store.uid!
            )
          }
        >
          <Text>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateMenuItem;

const styles = StyleSheet.create({
  upload: {
    borderRadius: 7.5,
    padding: "5%",
    borderWidth: 3,
    borderColor: "#f2f0f0",
    marginHorizontal: "5%",
    flex: 1,
  },
  dropdown: { flex: 1 },
  subHeaderContainer: { marginLeft: "5%" },
  subHeader: { fontWeight: "700" },
  inputElement: { flex: 1 },
  timeContainer: { flexDirection: "row" },
  container: { flexDirection: "row", flex: 1 },
  imageForm: {
    marginHorizontal: "5%",
    padding: "2.5%",
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    marginBottom: 20,
  },
  form: { flex: 1, backgroundColor: "#fff" },
  page: { flex: 1, backgroundColor: "#fff" },
  previewContainer: {
    flex: 1,
    margin: "5%",
    marginTop: "15%",
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
    marginBottom: 20,
  },
});
