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
import { categories, foodCategories } from "constants/vendorCategories";
import { vendorStructure } from "../typeDefinitions/interfaces/IVendor/vendorStructure";

export default function HomePage() {
  const {
    checkForStyleChange,
    categoryWasSelected,
    categoryId,
    onSelectCategory,
  } = useCategoryList();

  const isClicked = useAppSelector(getButton);
  const vendors: vendorStructure[] = useAppSelector(getBusinesses);
  // Only re-render the data in the dependency when it changes values
  const filterBusinessCards = useMemo(() => {
    return vendors.filter((i) => i.category.id == categoryId);
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
                <>
                <FlatList
                  ListHeaderComponent={
                    <View style={styles.businessHeaderContainer}></View>
                  }
                  style={styles.remainingCards}
                  showsVerticalScrollIndicator={false}
                  data={!categoryWasSelected ? vendors : filterBusinessCards}
                  keyExtractor={(item) => item._id!}
                  renderItem={({ item }) => (
                    <BusinessCard
                      businessItem={item}
                      checkForStyleChange={!checkForStyleChange}
                    />
                  )}
                />
              </>
              </>
            }
            keyExtractor={(_item, index) => index.toString()}
            data={categories}
            
            // Main content of the page
            renderItem={({ item }) => {
              if (!categoryWasSelected) {
                const trendingRow = vendors.filter(
                  (vendor: vendorStructure) => vendor.trending === item.name
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
    fonWeight: 700,
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
