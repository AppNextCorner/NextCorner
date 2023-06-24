/**
 * Purpose of the file: It is used to be the first page the user has access to after opening the app / login in through the app
 * - Displays business based on location or depending on the section from either the category or default sections
 */
import { StyleSheet, View, FlatList, Text } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import HeaderComponent from "@components/home/HeaderComponent";
import { StatusBar } from "expo-status-bar";
import SearchComponent from "@components/home/SearchComponent";
import BusinessCard from "@cards/Home/BusinessCard";
import BusinessListComponent from "@components/home/BusinessListComponent";
import CategoryScrollBar from "@components/home/CategoryScrollBar";
import OrderButton from "@components/global/OrderButton";
import { useAppSelector } from "../store/hook";
import { getBusiness } from "../store/slices/BusinessSlice/businessSlice";
import { getButton } from "../store/slices/addToCart";
import useCategoryList from "@hooks/handlePages/useCategoryList";

export default function HomePage() {
  const {
    categoryWasSelected,
    categoryId,
    checkForStyleChange,
    onSelectCategory,
  } = useCategoryList();

  let categories = [
    { name: "Burger", id: 1 },
    { name: "Cheap", id: 2 },
    { name: "Best Reviews", id: 3 },
  ];
  let foodCategories = [
    {
      text: "Grains",
      foodType: require("@assets/CategoryIcons/bread.png"),
      key: 1,
    },
    {
      text: "Burger",
      foodType: require("@assets/CategoryIcons/burger.png"),
      key: 2,
    },
    {
      text: "Burrito",
      foodType: require("@assets/CategoryIcons/burrito.png"),
      key: 3,
    },
    {
      text: "Hot Dog",
      foodType: require("@assets/CategoryIcons/corndog.png"),
      key: 4,
    },
    {
      text: "Wings",
      foodType: require("@assets/CategoryIcons/chicken-leg.png"),
      key: 5,
    },
    {
      text: "Fries",
      foodType: require("@assets/CategoryIcons/fries.png"),
      key: 6,
    },
    {
      text: "Pizza",
      foodType: require("@assets/CategoryIcons/pizza.png"),
      key: 7,
    },
  ];

  const isClicked = useAppSelector(getButton);
  const vendors = useAppSelector(getBusiness);

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
            ListFooterComponent={
				<>
              <FlatList
                ListHeaderComponent={
                  <View style={styles.businessHeaderContainer}></View>
                }
				        style={styles.remainingCards}
                showsVerticalScrollIndicator={false}
                data={!categoryWasSelected ? vendors : filterBusinessCards}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <BusinessCard
                    businesItem={item}
                    checkForStyleChange={!checkForStyleChange}
                  />
                )}
              />
			  </>
            }

            // Main content of the page
            renderItem={({ item }) => {
              if (!categoryWasSelected) {
                const trendingRow = vendors.filter(
                  (vendor) => vendor.trendingCategory === item.name
                );
                return (
                  <BusinessListComponent
                    title={item.name}
                    style={styles.list}
                    business={trendingRow}
                  />
                );
              }
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
  list: {
    alignContent: "center",
    flex: 0,
  },
  remainingCards: {
	paddingBottom: '25%'
  }
});
