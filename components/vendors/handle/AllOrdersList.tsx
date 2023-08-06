import { FlatList, Text } from "react-native";
import React from "react";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";
import OrderSectionCard from "cards/Vendors/handle/OrderSectionCard";

interface IProps {
  orders: Iorder[] | undefined;
  acceptMethod?: (targetUid: string, orderId: string) => any;
  rejectMethod?: (targetUid: string, orderId: string) => any;
}

const AllOrdersList = (props: IProps) => {
  const { orders, acceptMethod, rejectMethod } = props;
  return (
    <>
     <Text>{orders!.length}</Text>
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
