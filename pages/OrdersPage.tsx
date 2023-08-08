import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import UseOrders from "hooks/handleVendors/useOrders.hook";
import { useAppSelector } from "../store/hook";
import InProgressOrderCard from "../Cards/Order/InProgressOrderCard";
import { useNavigation } from "@react-navigation/native";
import CompletedOrderCard from "../Cards/Order/CompletedOrderCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Iorder } from "../typeDefinitions/interfaces/order.interface";

import { getOrders, state } from "../store/slices/addToOrders";
import { getUser } from "../store/slices/userSessionSlice";

export default function OrdersPage() {
  const orders = useAppSelector(getOrders);
  const user = useAppSelector(getUser);
  const { getCurrentOrders } = UseOrders();

  const [orderSelection, setOrderSelection] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const goToProgressPage = (order: Iorder) => {
    navigation.navigate("InProgressOrder", { order });
  };

  useEffect(() => {
    getCurrentOrders(user);
  }, []);

  const filterCompletedData = orders.filter((item: state) => {
    console.log("item: ", item);
    return item.status === "completed";
  });

  const finishedOrders = [
    ...new Map(
      filterCompletedData.reverse().map((m: any) => [m.createdAt, m])
    ).values(),
  ];

  console.log("not completed orders, ", filterCompletedData);

  const filterInProgressData = orders.filter(
    (item: state) => item.status === "Order Not Completed"
  );

  const inProgress = () => {
    setOrderSelection(false);
  };

  const completedOrders = () => {
    setOrderSelection(true);
  };

  return (
    <View style={styles.orderPageContainer}>
      <Text style={styles.headerText}>Your Orders</Text>
      <View style={styles.orderTypeContainer}>
        <View style={styles.headerOfOrder}>
          <TouchableOpacity onPress={inProgress} style={styles.sectionButton}>
            <Text style={styles.sectionHeader}>In progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={completedOrders}
            style={styles.sectionButton}
          >
            <Text style={styles.sectionHeader}>Complete</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={!orderSelection ? filterInProgressData : finishedOrders}
          keyExtractor={(_item, index) => index.toString()}
          style={styles.cardContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            !orderSelection ? (
              <TouchableOpacity onPress={() => goToProgressPage(item)}>
                <InProgressOrderCard order={item} />
              </TouchableOpacity>
            ) : (
              <Pressable>
                <CompletedOrderCard completedOrder={item} />
              </Pressable>
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // margin for every card to be splitted
  margin: {
    backgroundColor: "#f2f3f5",
    flex: 1,
    paddingVertical: 5,
  },
  // header for completed page / completed page styles
  completedPageList: {
    marginHorizontal: "-2%",
    marginBottom: "25%",
  },

  completedPageHeader: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: "5%",
    padding: "5%",
  },
  cardContainer: {
    width: "100%",
    marginBottom: "25%",
  },
  // header
  amountContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  sectionHeader: {
    textAlign: "center",
    fontWeight: "bold",
  },
  sectionButton: {
    borderRadius: 10,
    backgroundColor: "#f2f5f5",
    padding: "2.5%",
    paddingHorizontal: "10%",
    marginHorizontal: "5%",
  },
  headerOfOrder: {
    flexDirection: "row",
    paddingBottom: "2%",
  },
  orderTypeContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  orderPageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    margin: "10%",
    marginTop: "30%",
    fontSize: 30,
    fontWeight: "bold",
  },
  // Card styles
  descriptionOfItem: {
    flex: 1,
    fontSize: 10,
  },
  imageBox: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
    flex: 1,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: "bold",
    //fontFamily: 'monospace',
    marginTop: 15,
    flex: 1,
  },
  foodImages: {
    width: "20%",
    flex: 1,

    // Increase the image size
    padding: "30%",
    marginLeft: 25,
    marginTop: "18%",
    marginBottom: "70%",
    borderRadius: 10,
  },
  card: {
    width: 250,
    height: 115,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  priceText: {
    flex: 1,
    alignContent: "flex-end",
    color: "#97989F",
    marginTop: 0,
  },
  foodTexts: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 5,
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "#fff",
    borderColor: "#d6d6d6",
    borderStyle: "solid",

    borderBottomWidth: 1,
    marginBottom: -0.1,
    marginTop: 0,
  },
});
