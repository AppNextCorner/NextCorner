import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import "moment-timezone";
import GoogleMapsMenuSection from "components/unfinishedOrders/GoogleMapsMenuSection";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Iorder } from "../../typeDefinitions/interfaces/order.interface";
import { ICart } from "../../store/slices/addToCartSessionSlice";
import { WebSocketContext } from "../../context/incomingOrderContext";
import { location } from "../../typeDefinitions/interfaces/location.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WSLocation } from "pages/OrdersPage";

interface Props {
  order: Iorder;
  userLocation: location;
  storeLocation: WSLocation;
}
const InProgressOrderCard = ({ order, userLocation, storeLocation }: Props) => {
  const [_duration, setDuration] = useState(0);
  const [_distance, setDistance] = useState(0);
  const [location, setLocation] = useState<any>({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0106,
    longitudeDelta: 0.0121,
  });
  const [timeLeft, setTimeLeft] = useState<number | undefined>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const isFocused = useIsFocused();
  // const { updateOrder } = UseOrders();

  useEffect(() => {
    // Converting to seconds
    const timer = order.minutesToDone * 60;
    const returned_endate = moment(
      new Date(order.createdAt!),
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
  }, [order.minutesToDone]);
  const goToProgressPage = () => {
    navigation.navigate("InProgressOrder", { order, userLocation});
  };
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

  const businessOrderedText = order.orders.map(
    (orderItem: ICart) => orderItem.storeId
  );

  return (
    <TouchableOpacity
      onPress={
        isFocused && userLocation.latitude !== 0
        // && storeLocation.location.latitude !== 0
          ? () => goToProgressPage()
          : undefined
      }
    >
      <View style={styles.orderContainer}>
        <View style={styles.googleMapImageContainer}>
          {userLocation.latitude !== 0
          //&& storeLocation.location.latitude !== 0
           ? (
            <GoogleMapsMenuSection
              scrollEnabled={false}
              pointerEvents={"none"}
              userLocation={userLocation}
              location={storeLocation.location ? storeLocation.location : userLocation}
              setDuration={setDuration}
              setDistance={setDistance}
            />
          ) : (
            // <></>
            <></>
          )}
        </View>

        <View style={styles.orderDetailTextContainer}>
          <Text style={styles.businessText}>{businessOrderedText[0]}</Text>
          <Text style={styles.orderStatusText}>{order.accepted}</Text>
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
    </TouchableOpacity>
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
