import { FlatList, View } from "react-native";
import React from "react";
// import { useRoute } from "@react-navigation/native"; not used
import { itemType } from "../../types/interfaces/item.interface";
import MenuItemCard from "./MenuItemCard";

interface Props {
  menu: itemType[];
  type: string;
  businessName: string;
  location: {longitude: number; latitude: number};
}

interface menuItem {
  item: itemType;
}
const MenuTypeList = React.memo(
  ({ menu, type, businessName, location }: Props) => {
    // type is a string that represents the type of food that the menu item represents: ex: Burger, Pizza, etc.

    // Optimized: Memoize the filtered array using React.useMemo
    const getItemsThatMatchType = React.useMemo(
      () => menu.filter((item) => item.category === type),
      [menu, type]
    );

    // Optimized: Memoize the renderItem function using React.useCallback
    const renderItem = React.useCallback(
      ({ item }: menuItem) => (
        <View>
          <MenuItemCard
            menuItem={item}
            businessName={businessName}
            location={location}
          />
        </View>
      ),
      [businessName, location]
    );

    // Optimized: Memoize the keyExtractor function using React.useCallback

    return <FlatList data={getItemsThatMatchType} renderItem={renderItem} />;
  }
);

export default MenuTypeList;

// const styles = StyleSheet.create({}); not used
