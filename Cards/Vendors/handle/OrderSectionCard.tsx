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
  completeMethod?: (targetUid: string, orderId: string) => Promise<void>;
}

const OrderSectionCard = (props: IProps) => {
  const { order, acceptMethod, rejectMethod, completeMethod } = props;
  const orderItems = order.orders.map((orderItem) => orderItem.inCart);
  const addAll = orderItems.reduce((a, b) => (a + b.price) * b.amountInCart, 0);
  return (
    <View style={styles.mainSection}>
      {/* List the items */}
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Order By: Test User{order.userName}
              </Text>
              <Text style={[styles.headerText, { textAlign: "right" }]}>
                ${addAll}
              </Text>
            </View>
            <View style={styles.line} />
          </>
        }
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        data={order.orders}
        renderItem={({ item }) => <OrderPreviewCard item={item.inCart} />}
      />
      {/* Accept or decline orders */}

      <View style={styles.buttonContainer}>
        <View style={styles.statusHeader}>
          <Text>Status</Text>
          <View
            style={[
              styles.accepted,
              {
                backgroundColor:
                  order.accepted == "pending" ? "#fcf5d9" : "#d2f2fc",
              },
            ]}
          >
            <Text
              style={[
                {
                  color: order.accepted == "pending" ? "#FEC411" : "#78DBFF",
                },
              ]}
            >
              {order.accepted}
            </Text>
          </View>
        </View>
        {completeMethod !== undefined ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#7CDBFE" }]}
            onPress={() => completeMethod!(order.uid, order._id!, )}
          >
            <Text style={styles.buttonText}>Picked Up</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#7CDBFE" }]}
              onPress={() => acceptMethod!(order.uid, order._id!)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#C4C4C4" }]}
              onPress={() => rejectMethod!(order.uid, order._id!)}
            >
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default OrderSectionCard;

const styles = StyleSheet.create({
  buttonText: {textAlign: 'center'},
  line: { backgroundColor: "#f2f0f0", padding: "0.5%", marginTop: "2%" },
  headerText: { flex: 1, fontSize: 15, fontWeight: "600" },
  statusHeader: { alignItems: "center", marginVertical: "5%" },
  accepted: { padding: "10%", borderRadius: 10 },
  header: { flexDirection: "row" },
  list: {
    padding: "2.5%",
    flex: 1,
    borderColor: "#f2f0f0",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 10,
    marginHorizontal: "2.5%",
  },
  mainSection: {
    flexDirection: "row",
    flex: 1,
    marginVertical: "2.5%",
  },
  buttonContainer: {
    borderColor: "#f2f0f0",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 10,
    flex: 0.3,
    padding: "1%",
  },
  button: {
    alignItems: "center",
    padding: "5%",
    paddingVertical: "50%",
    borderRadius: 10,
    margin: '2%',
    marginVertical: "2.5%",
    
  },
});
