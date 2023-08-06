import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React from "react";
import OrderPreviewCard from "./OrderPreviewCard";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";

interface IProps {
  order: Iorder;
  acceptMethod?: (targetUid: string, orderId: string) => Promise<void>;
  rejectMethod?: (targetUid: string, orderId: string) => Promise<void>;
}

const OrderSectionCard = (props: IProps) => {
  const { order, acceptMethod, rejectMethod } = props;
  return (
    <View>
      {/* Accept or decline orders */}
      {acceptMethod !== undefined ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "blue" }]}
            onPress={() => acceptMethod!(order.uid, order._id!)}
          >
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => rejectMethod!(order.uid, order._id!)}
          >
            <Text>Decline</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* List the items */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={order.orders}
        renderItem={({ item }) => <OrderPreviewCard item={item.inCart} />}
      />
     
    </View>
  );
};

export default OrderSectionCard;

const styles = StyleSheet.create({
  buttonContainer: { flexDirection: "row" },
  button: {
    padding: "3%",
    marginHorizontal: "2%",
    paddingHorizontal: "5%",
  },
});
