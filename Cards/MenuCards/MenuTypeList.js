import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import MenuItemCard from '../MenuItemCard';
import { useRoute } from '@react-navigation/native';

const MenuTypeList = React.memo(({ menuItem, type, businessName, location }) => {
  // type is a string that represents the type of food that the menu item represents: ex: Burger, Pizza, etc.
  
  // Optimized: Memoize the filtered array using React.useMemo
  const getItemsThatMatchType = React.useMemo(() => menuItem.filter(item => item.category === type), [
    menuItem,
    type,
  ]);

  // Optimized: Memoize the renderItem function using React.useCallback
  const renderItem = React.useCallback(({ item }) => (
    <View>
      <MenuItemCard foodItem={item} businessName={businessName} location={location} />
    </View>
  ), [businessName, location]);

  // Optimized: Memoize the keyExtractor function using React.useCallback

  return (
    <FlatList
      data={getItemsThatMatchType}
      renderItem={renderItem}

    />
  );
});

export default MenuTypeList;

const styles = StyleSheet.create({});
