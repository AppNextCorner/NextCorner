import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import { useRoute } from "@react-navigation/native";
import { IOptions } from "../../../../typeDefinitions/interfaces/options.interface";
import CustomContainer from "components/vendors/create/CustomContainer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import {
  setCustomizations,
  getCustomizations,
  editCustomizations,
} from "../../../../store/slices/BusinessSlice/menuCreateSlice";
import { debounce } from "hooks/components/handleTimeout";
import { handlePropertyChange } from "hooks/components/handleChangeProperty";
import { checkObjectProperties } from "hooks/components/helpers/checkForProp";
import InputBox from "components/global/InputBox";
import { customizationBoilerplate } from "constants/components/boilerplates";
import CustomizationForm from "components/vendors/create/CustomizationForm";

interface IRoute {
  custom: IOptions[];
}

// TODO: Fix Editing Configurations of customizaiton

const CreateCustomizations = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const customizations = useAppSelector(getCustomizations);
  const { custom }: IRoute = route.params as IRoute;

  const [selected, setSelected] = useState<IOptions[]>(
    customizations || custom
  );
  console.log("selected:", selected);
  const [edit, setEdit] = useState<any | null>(null);
  const [editModel, setEditModel] = useState<any>(customizationBoilerplate);


  const debouncedDispatch = debounce((customizations: any) => {
    console.log("Dispatching customizations:", customizations);
    if (customizations.index === null || undefined){
      console.log('editing an object with customizations')
      dispatch(editCustomizations(customizations));
    }
    dispatch(setCustomizations(customizations));
  }, 500);

  useEffect(() => {
    {editModel !== null}{
      debouncedDispatch(editModel);
    }
    debouncedDispatch(selected);
  }, [selected, debouncedDispatch]);

  return (
    <View style={styles.page}>
      <NextCornerVendorHeader />
      <View style={styles.page}>
        {/* Preview Container */}
        <CustomContainer customizations={selected} setEditModel={setEditModel} />

        {/* Form  */}
        <View style={styles.form}>
          {edit == null ? (
            // Name
            // <View style={styles.add}>
            //   <View style={styles.inputContainer}>
            //     <InputBox
            //       value={editModel.name}
            //       setState={setEditModel}
            //       property={"name"}
            //     />
            //   </View>

            //   {/* Option type */}
            //   <View style={styles.container}>
            //     <View style={styles.subContainer}>
            //       <Text style={styles.optionText}>Option Type</Text>
            //       <View style={styles.optionTypes}>
            //         {types.map((type: string, index: number) => (
            //           <TouchableOpacity
            //             onPress={() =>
            //               handlePropertyChange(setEditModel, "type", type)
            //             }
            //             key={index}
            //             style={styles.chip}
            //           >
            //             <Text style={styles.optionTypeText}>{type}</Text>
            //           </TouchableOpacity>
            //         ))}
            //       </View>
            //     </View>

            //     {/* Optional status */}
            //     <View style={styles.subContainer}>
            //       <Text style={styles.optionText}>Optional</Text>
            //       <TouchableOpacity
            //         style={styles.chip}
            //         // onPress={() => setEdit({ ...editModel, optional: !editModel.optional })}
            //       >
            //         <Text style={styles.optionalButtonText}>*</Text>
            //       </TouchableOpacity>
            //     </View>
            //   </View>

            //   {/* Upload Items */}

            //   <TouchableOpacity
            //     onPress={() => {
            //       if (!checkObjectProperties(editModel)) return;
            //       setSelected([
            //         ...selected,
            //         JSON.parse(JSON.stringify(editModel)),
            //       ]);
            //       setEditModel(customizationBoilerplate); // Reset values
            //     }}
            //     style={styles.addItemButton}
            //   >
            //     <Text style={styles.addItemButtonText}>Add Item</Text>
            //   </TouchableOpacity>
            // </View>
            <CustomizationForm editModel={editModel} setEditModel={setEditModel} addToSelector={setSelected} selector={selected}/>
          ) : (
            <CustomizationForm editModel={editModel} setEditModel={setEditModel} addToSelector={setSelected} editing={true}/>
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateCustomizations;

const styles = StyleSheet.create({
  inputContainer: { marginHorizontal: "5%" },
  page: { flex: 1, backgroundColor: "#fff" },
  add: { backgroundColor: "#fff" },
  form: { flex: 2, backgroundColor: "#fff" },
  editText: { fontSize: 20, fontWeight: "bold" },
    optionText: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  subContainer: { margin: "5%", alignItems: "center" },
  container: { flexDirection: "row" },
  optionTypes: { flexDirection: "row" },
  chip: {
    backgroundColor: "#fff",
    padding: "2%",
    paddingHorizontal: "3%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    margin: "2%",
    alignItems: "center",
  },
  optionTypeText: { fontSize: 16 },
  optionalText: { fontSize: 16, marginBottom: 10 },
  optionalButton: { backgroundColor: "#f2f2f2" },
  optionalButtonText: { fontSize: 16 },
  addItemButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#78dbff",
  },
  addItemButtonText: { color: "#fff", fontSize: 16 },
});
