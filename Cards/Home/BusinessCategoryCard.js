import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { css } from "@emotion/native";
import styled from "@emotion/native";

const CategoryButton = styled.TouchableOpacity`
  /* Add your styles here */
`;

const CardContainer = styled.View`
  flex: 1;
`;

const Icon = styled.Image`
  width: 50px;
  height: 50px;
`;

const DefaultImageContainer = styled.View`
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
`;

const ActiveImageContainer = styled(DefaultImageContainer)`
  background-color: #78dbff;
`;

const BtnPress = styled.View`
  flex-direction: row;
  align-content: center;
  border-radius: 16px;
  margin: 5px;
  padding: 12px;
`;

const CategoryText = styled.Text`
  text-align: center;
`;

const DefaultCategoryTextContainer = styled.View`
  color: #bfbfbf;
`;

const DefaultCategoryText = styled.Text`
  color: #bfbfbf;
`;

const ActiveCategoryText = styled.Text`
  color: #3d3d3d;
`;

export default function BusinessCategoryCard(props) {
  let touchButtonStyles = {
    style:
      props.businesItem.key !== props.foodId ? styles.foodCategoryStyle : styles.btnPress,
  };

  let imageBackgroundStyles = {
    style:
      props.businesItem.key !== props.foodId ? styles.defaultImageContainer : styles.activeImageContainer,
  };

  let categoryTextStyle = {
    style:
      props.businesItem.key !== props.foodId ? styles.defaultCategoryText : styles.activeCategoryText,
  };

  return (
    <CategoryButton
      id={props.businesItem.key}
      {...touchButtonStyles}
      onPress={() => {
        props.handlePress(props.businesItem.key);
      }}
    >
      <View {...imageBackgroundStyles}>
        <Icon source={props.businesItem.foodType} />
        <Text {...categoryTextStyle}>{props.businesItem.text}</Text>
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
