import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";
import OrderSectionCard from "cards/Vendors/handle/OrderSectionCard";

interface IProps {
  orders: Iorder[] | undefined;
  acceptMethod?: (orderId: string) => any;
  rejectMethod?: (orderId: string) => any;
}

const AllOrdersList = (props: IProps) => {
  const { orders, acceptMethod, rejectMethod } = props;
  return (
    <>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <OrderSectionCard
            acceptMethod={acceptMethod}
            rejectMethod={rejectMethod}
            order={item}
          />
        )}
      />
    </>
  );
};

export default AllOrdersList;

const styles = StyleSheet.create({});
