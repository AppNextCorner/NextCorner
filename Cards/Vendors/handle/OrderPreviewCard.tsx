import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Iitem } from "../../../typeDefinitions/interfaces/item.interface";
import { ICart } from "../../../store/slices/addToCartSessionSlice";

interface IProps {
  item: Iitem;
}

const OrderPreviewCard = (props: IProps) => {
  const { item } = props;

  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default OrderPreviewCard;

const styles = StyleSheet.create({});
