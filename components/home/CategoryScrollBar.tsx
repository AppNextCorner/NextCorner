/**
 * Purpose of the component: It is used to display the list of categories that will filter the list of business that match the category selected by the user
 */

import { FlatList } from "react-native";
import React from "react";
import BusinessCategoryCard from "cards/Home/BusinessCategoryCard";
import styled from "@emotion/native";

const Header = styled.View``;

import { vendorCategory } from "../../typeDefinitions/interfaces/vendorCategory.interface";

interface categoryProps {
  categoryList: vendorCategory[];
  showItem: (key: number) => void;
  itemId: number;
}

export default function CategoryScrollBar(props: categoryProps) {
  /**
   * Category List: List of categories
   * showItem: boolean to show the list of business where it is the default list or the filtered list
   * itemId: the id of the category properties
   */
  const { categoryList, showItem, itemId } = props;
  return (
    <Header>
      {/* Scroll View used to be able to quickly scroll horizontally with properties allowing it to do */}
      {/* Gets data from the category list above to filter the food "menu" */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categoryList}
        renderItem={({ item }) => (
          <BusinessCategoryCard
            // padd in the state of showItem to the category card
            handlePress={showItem}
            businessItem={item}
            foodId={itemId}
          />
        )}
      />
    </Header>
  );
}
