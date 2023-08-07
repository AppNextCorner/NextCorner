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
    <>
      <View style={styles.item}>
        <Text style={[styles.text]}>{item.name}</Text>
        <Text style={[styles.text, { textAlign: "right" }]}>
          {item.amountInCart}
        </Text>
      </View>
      {item.customizations.map((customization) => <View>
        <Text>{customization.optionCustomizations.map()}</Text>
      </View>)}
    </>
  );
};

export default OrderPreviewCard;

const styles = StyleSheet.create({
  text: { flex: 1 },
  item: { flexDirection: "row", marginVertical: "2.5%" },
});
