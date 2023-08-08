import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Iorder } from "../../../typeDefinitions/interfaces/order.interface";
import OrderSectionCard from "cards/Vendors/handle/OrderSectionCard";

interface IProps {
  orders: Iorder[] | undefined;
  acceptMethod?: (targetUid: string, orderId: string) => any;
  rejectMethod?: (targetUid: string, orderId: string) => any;
  completeMethod?: (targetUid: string, orderId: string) => any;
}

const AllOrdersList = (props: IProps) => {
  const { orders, acceptMethod, rejectMethod, completeMethod } = props;
  return (
    <View >
      <FlatList
        ListFooterComponent={<View style={styles.list}></View>}
        showsVerticalScrollIndicator={false}
        data={orders}
        renderItem={({ item }) => (
          <OrderSectionCard
            acceptMethod={acceptMethod}
            rejectMethod={rejectMethod}
            completeMethod={completeMethod}
            order={item}
          />
        )}
      />
    </View>
  );
};

export default AllOrdersList;

const styles = StyleSheet.create({
  list: {paddingBottom: '25%'},
})