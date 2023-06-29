import { FlatList, View } from "react-native";
import React from "react";
import MenuItemCard from "./MenuItemCard";
// import { useRoute } from "@react-navigation/native"; not used
import { itemType } from "../../types/interfaces/item.interface";

/**
 *  TO DOO
 *  is menuItem a list of itemTypes?
 *
 *  location is what?
 */
interface Props {
  menuItem: itemType[];
  type: string;
  businessName: string;
  location: any;
}

interface foodItem {
  item: itemType;
}
const MenuTypeList = React.memo(
  ({ menuItem, type, businessName, location }: Props) => {
    // type is a string that represents the type of food that the menu item represents: ex: Burger, Pizza, etc.

    // Optimized: Memoize the filtered array using React.useMemo
    const getItemsThatMatchType = React.useMemo(
      () => menuItem.filter((item) => item.category === type),
      [menuItem, type]
    );

    // Optimized: Memoize the renderItem function using React.useCallback
    const renderItem = React.useCallback(
      ({ item }: foodItem) => (
        <View>
          <MenuItemCard
            foodItem={item}
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
