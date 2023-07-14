import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
import { location } from "../../typeDefinitions/interfaces/location.interface";
import MenuItemCard from "cards/Menu/MenuItemCard";
import EditingMenuItemCard from "cards/Vendors/EditingMenuItemCard";

interface Props {
  menu: Iitem[];
  vendorName: string;
  location: location;
}

const FullMenuList = ({ menu, vendorName, location }: Props) => {
  const checkForNoCategory: Iitem[] = menu.filter(
    (item) => item.category !== "" || item.category !== null
  );
  console.log(checkForNoCategory);
  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ marginLeft: "5%" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>No Category</Text>
        </View>
      }
      data={checkForNoCategory}
      renderItem={({ item }) => (
        <EditingMenuItemCard
          menuItem={item}
         
          disabled={false}
        />
      )}
    />
  );
};

export default FullMenuList;
