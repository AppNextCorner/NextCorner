import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import OrderPreviewCard from "./OrderPreviewCard";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";

interface IProps {
  order: Iorder;
  acceptMethod?: (orderId: string) => Promise<void>;
  rejectMethod?: (orderId: string) => Promise<void>;
}

const OrderSectionCard = (props: IProps) => {
  const { order, acceptMethod, rejectMethod } = props;
  return (
    <View>
      {/* Accept or decline orders */}
      {acceptMethod !== undefined ? (
        <View>
          <TouchableOpacity onPress={() => acceptMethod!(order._id!)}>
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => rejectMethod!(order._id!)}>
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

const styles = StyleSheet.create({});
