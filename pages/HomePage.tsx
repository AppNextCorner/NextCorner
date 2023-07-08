/**
 * Purpose of the file: It is used to be the first page the user has access to after opening the app / login in through the app
 * - Displays business based on location or depending on the section from either the category or default sections
 */
import { StyleSheet, View, FlatList } from "react-native";
import React, { useMemo } from "react";
import HeaderComponent from "components/home/HeaderComponent";
import { StatusBar } from "expo-status-bar";
import BusinessCard from "cards/Home/BusinessCard";
import BusinessListComponent from "components/home/BusinessListComponent";
import CategoryScrollBar from "components/home/CategoryScrollBar";
import OrderButton from "components/global/OrderButton";
import { useAppSelector } from "../store/hook";
import { getBusinesses } from "../store/slices/BusinessSlice/businessSessionSlice";
// import { getBusiness } from "../store/slices/BusinessSlice/businessSlice";
import { getButton } from "../store/slices/addToCart";
import useCategoryList from "hooks/handlePages/useCategoryList";
import { vendor } from "../typeDefinitions/interfaces/vendor.interface";
import { categories, foodCategories } from "constants/vendorCategories";
export default function HomePage() {
  const {
    categoryWasSelected,
    categoryId,
    checkForStyleChange,
    onSelectCategory,
  } = useCategoryList();



  const isClicked = useAppSelector(getButton);
  const vendors: vendor[] = useAppSelector(getBusinesses);

  // Only re-render the data in the dependency when it changes values
  const filterBusinessCards = useMemo(() => {
    return vendors.filter((i) => i.categoryId === categoryId);
  }, [categoryId, vendors]);

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <HeaderComponent />
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <CategoryScrollBar
                  categoryList={foodCategories}
                  itemId={categoryId}
                  showItem={onSelectCategory}
                />
              </>
            }
            keyExtractor={(_item, index) => index.toString()}
            data={categories}
            
            // Main content of the page
            renderItem={({ item }) => {
              if (!categoryWasSelected) {
                const trendingRow = vendors.filter(
                  (vendor: vendor) => vendor.trendingCategory === item.name
                );
                return (
                  <BusinessListComponent
                    title={item.name}
                    business={trendingRow}
                  />
                );
              }
              return null;
            }}
          />
        </>

        {isClicked && <OrderButton />}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  businessHeaderContainer: {
    margin: 10,
  },
  businessHeader: {
    fontSize: 25,
    fonWeight: 800,
  },
  selectedCategory: {
    backgroundColor: "blue",
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  category: {
    paddingVertical: 25,
    flex: 0,
    alignContent: "center",
  },
  remainingCards: {
    paddingBottom: "25%",
  },
});
