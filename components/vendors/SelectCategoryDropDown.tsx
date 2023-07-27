import { StyleSheet, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { Dispatch, SetStateAction } from "react";
import { vendorStructure } from "../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";

interface IProps {
  store: vendorStructure;
  handlePropertyChange: (
    setState: Dispatch<SetStateAction<any>>,
    property: string,
    text: string | object
  ) => void;
  setItem: Dispatch<SetStateAction<Iitem>>;
}

const SelectCategoryDropDown = (props: IProps) => {
  const { store, setItem, handlePropertyChange } = props;
  console.log("here is store:", store);
  return (
    <SelectDropdown
      showsVerticalScrollIndicator={true}
      defaultButtonText="Item Category"
      buttonTextStyle={{ fontSize: 15 }}
      buttonStyle={styles.dropdown}
      dropdownStyle={{ backgroundColor: "#fff", borderRadius: 10 }}
      data={store.itemCategories}
      onSelect={(selected: string) => {
        handlePropertyChange(setItem, "category", selected);
      }}
      buttonTextAfterSelection={(selectedItem: any, _index: number) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item: any, _index: any) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
};

export default SelectCategoryDropDown;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: "#f2f0f0",
    width: "90%",
    marginHorizontal: "5%",
  },
});
