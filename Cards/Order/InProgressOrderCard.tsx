import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import "moment-timezone";
import UseOrders from "hooks/handleVendors/useOrders";
import GoogleMapsMenuSection from "components/unfinishedOrders/GoogleMapsMenuSection";
import order from "../../typeDefinitions/interfaces/order.interface";
import orderItem from "../../typeDefinitions/interfaces/orderItem.interface";
import { location } from "../../typeDefinitions/interfaces/location.interface";
import { useIsFocused } from "@react-navigation/native";

interface Props {
  order: order;
}
const InProgressOrderCard = ({ order }: Props) => {
  const [_duration, setDuration] = useState(0);
  const [_distance, setDistance] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | undefined>();

  const mapOrderItem: location[] = order.singleOrderList
    .map((orderItem: orderItem) => orderItem.location)
    .flat();

  const { updateOrder } = UseOrders();

  useEffect(() => {
    const timer = order.timer * 60;
    const returned_endate = moment(
      new Date(order.createdAt),
      "YYYY-M-D H:mm:ss"
    )
      .tz("America/Los_Angeles")
      .add(timer, "seconds")
      .format("YYYY-MM-DD HH:mm:ss");

    const calculateDuration = () => {
      const duration = moment().diff(returned_endate, "seconds");
      if (duration < 0) {
        setTimeLeft(duration);
      } else {
        setTimeLeft(0);
      }
    };

    const intervalId = setInterval(calculateDuration, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [order.timer]);

  useEffect(() => {
    const updatedStatus = {
      ...order,
      orderStatus: "Order taking longer than expected",
    };

    if (timeLeft === 0) {
      console.log("Order took longer than expected");
      //updateOrder(updatedStatus, timeLeft);
    }

    return () => {
      // Cleanup code (if any)
    };
  }, [timeLeft]);
  const isFocused = useIsFocused();

  const businessOrderedText = order.singleOrderList.map(
    (orderItem: orderItem) => orderItem.businessOrderedFrom
  );

  return (
    <View style={styles.orderContainer}>
      <View style={styles.googleMapImageContainer}>
        {isFocused ? (
          <GoogleMapsMenuSection
            scrollEnabled={false}
            pointerEvents={"none"}
            location={mapOrderItem}
            setDuration={setDuration}
            setDistance={setDistance}
          />
        ) : (
          <></>
        )}
      </View>

      <View style={styles.orderDetailTextContainer}>
        <Text style={styles.businessText}>{businessOrderedText[0]}</Text>
        <Text style={styles.orderStatusText}>{order.orderStatus}</Text>
        <Text style={styles.timeText}>
          Ready In:{" "}
          {timeLeft
            ? timeLeft <= -60
              ? Math.floor(Math.abs(timeLeft) / 60)
              : "< 1"
            : null}
          min
        </Text>
      </View>
    </View>
  );
};

export default InProgressOrderCard;

const styles = StyleSheet.create({
  orderStatusText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  businessText: {
    fontWeight: "bold",
    marginBottom: "1%",
  },
  googleMapImageContainer: {
    margin: "3%",
    height: 175,
    marginBottom: "-10%",
  },
  googleMapImage: {
    width: "100%",
    height: 125,
    borderRadius: 10,
  },
  orderDetailTextContainer: {
    padding: "3%",
  },
  timeText: {},
  orderContainer: {
    margin: "2%",
    borderColor: "#f2f0f0",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
  },
  sectionButton: {},
  // header
  amountContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  sectionHeader: {
    marginHorizontal: "15%",
    fontWeight: "bold",
    backgroundColor: "#f2f5f5",
    textAlign: "center",
    paddingVertical: "5%",
  },
  headerOfOrder: {
    flexDirection: "row",
    marginBottom: "10%",
  },
  orderTypeContainer: {
    flex: 1,
    alignItems: "center",
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

    //fontFamily: 'monospace',
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
