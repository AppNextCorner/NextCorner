import { FlatList, View } from "react-native";
import React from "react";
// import { useRoute } from "@react-navigation/native"; not used
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
import MenuItemCard from "./MenuItemCard";
import { location } from "../../typeDefinitions/interfaces/location.interface";

interface Props {
  menu: Iitem[];
  category: string;
  vendorName: string;
}

interface menuItem {
  item: Iitem;
}
const MenuList = React.memo(
  ({ menu, category, vendorName }: Props) => {
    // category is a string that represents the category of food that the menu item represents: ex: Burger, Pizza, etc.

    // Optimized: Memoize the filtered array using React.useMemo
    const getItemsThatMatchcategory = React.useMemo(
      () => menu.filter((item) => item.category === category),
      [menu, category]
    );

    // Optimized: Memoize the renderItem function using React.useCallback
    const renderItem = React.useCallback(
      ({ item }: menuItem) => (
        <View>
          <MenuItemCard
            menuItem={item}
            vendorName={vendorName}
          />
        </View>
      ),
      [vendorName]
    );

    // Optimized: Memoize the keyExtractor function using React.useCallback

    return <FlatList data={getItemsThatMatchcategory} renderItem={renderItem} />;
  }
);

export default MenuList;

// const styles = StyleSheet.create({}); not used
