import React from "react";
import { View, Text } from "react-native";
import { css } from "@emotion/native";
import styled from "@emotion/native";
import { vendorCategory } from "../../types/interfaces/vendorCategory.interface";
const CategoryButton = styled.TouchableOpacity`
  /* Add your styles here */
`;

const Icon = styled.Image`
  width: 50px;
  height: 50px;
`;

interface Props {
  handlePress: (key: number) => void;
  businessItem: vendorCategory;
  foodId: number;
}

export default function BusinessCategoryCard(props: Props) {
  let touchButtonStyles = {
    style:
      props.businessItem.key !== props.foodId
        ? styles.foodCategoryStyle
        : styles.btnPress,
  };

  let imageBackgroundStyles = {
    style:
      props.businessItem.key !== props.foodId
        ? styles.defaultImageContainer
        : styles.activeImageContainer,
  };

  let categoryTextStyle = {
    style:
      props.businessItem.key !== props.foodId
        ? styles.defaultCategoryText
        : styles.activeCategoryText,
  };

  return (
    <CategoryButton
      id={props.businessItem.key.toString()}
      {...touchButtonStyles}
      onPress={() => {
        props.handlePress(props.businessItem.key);
      }}
    >
      <View {...imageBackgroundStyles}>
        <Icon source={props.businessItem.foodType} />
        <Text {...categoryTextStyle}>{props.businessItem.text}</Text>
      </View>
    </CategoryButton>
  );
}

const styles = {
  foodCategoryStyle: css`
    flex-direction: row;
    align-content: center;
    border-radius: 16px;
    margin: 5px;
    padding: 12px;
  `,
  btnPress: css`
    flex-direction: row;
    align-content: center;
    border-radius: 16px;
    margin: 5px;
    padding: 12px;
  `,
  defaultImageContainer: css`
    background-color: #f7fafa;
    align-content: center;
    border-radius: 15px;
    width: 75px;
    height: 75px;
    align-items: center;
    justify-content: center;
    shadow-color: #c2c3c4;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.75;
    shadow-radius: 2.5px;
  `,
  activeImageContainer: css`
    background-color: #78dbff;
    align-content: center;
    border-radius: 15px;
    width: 75px;
    height: 75px;
    align-items: center;
    justify-content: center;
    shadow-color: #c2c3c4;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.75;
    shadow-radius: 2.5px;
  `,
  defaultCategoryText: css`
    color: #bfbfbf;
  `,
  activeCategoryText: css`
    color: #3d3d3d;
  `,
};
