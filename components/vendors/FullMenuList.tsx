import { FlatList, Text, View } from "react-native";
import React from "react";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
import { location } from "../../typeDefinitions/interfaces/location.interface";
import MenuItemCard from "cards/Menu/MenuItemCard";
import EditingMenuItemCard from "cards/Vendors/EditingMenuItemCard";
import { vendorStructure } from "../../typeDefinitions/interfaces/IVendor/vendorStructure";

interface Props {
  menu: Iitem[];
  vendor: vendorStructure;
  location: location;
  create: boolean;
}

const FullMenuList = ({ menu, vendor, create }: Props) => {
  const checkForNoCategory: Iitem[] = menu.filter(
    (item) => item.category !== "" || item.category !== null
  );
  const renderItem = ({ item }: { item: Iitem }) => {
    return (
      <>
        {create ? (
          <EditingMenuItemCard
            menuItem={item}
            vendor={vendor}
            disabled={false}
          />
        ) : (
          <MenuItemCard
            menuItem={item}
            vendorName={vendor.name}
          />
        )}
      </>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ marginLeft: "5%" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>No Category</Text>
        </View>
      }
      data={checkForNoCategory}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
    />
  );
};

export default FullMenuList;
