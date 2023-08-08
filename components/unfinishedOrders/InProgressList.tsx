/**
 * Purpose of the file: It is used to display the business and its content by rendering multiple business and multiple horizontal list for each business
 */
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import React, { useEffect } from "react";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import { API } from "constants/API";
import { Iorder } from "../../typeDefinitions/interfaces/order.interface";
import moment from "moment";

interface Props {
  order: Iorder;
  distance: number;
  duration: number;
}

export default function InProgressList({
  order,
  distance,
  duration,
}: Props) {
  // grabbing the data of the trendingFood from the data folder

  // mapping through the data and retrieving the data from one order
  const mapThroughOrder = order.orders.map(
    // What is getItemData
    (getItemData: any) => getItemData.inCart
  );
  const [timeLeft, setTimeLeft] = React.useState<number | undefined>();


    // REFOCUSES THE SCREEN
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
  
  return (
    // Used BottomSheetFlatList so the user can close the tab through the vertical scrollbar
    <>
      <BottomSheetView style={styles.statusContainer}>
        {/* Converting distance which is default in km from google maps to miles */}
        <Text style={styles.statusText}>
          Distance: {(distance * 0.62137).toString().slice(0, 5)} miles
        </Text>
        <Text style={styles.statusText}>
          Time To Walk: {duration.toString().slice(0, 3)} min
        </Text>
      </BottomSheetView>
      <BottomSheetFlatList
   
        ListHeaderComponent={
          <View>
              <Text style={styles.businessName}>
            Ready In:{" "}
            {timeLeft
              ? timeLeft <= -60
                ? Math.floor(Math.abs(timeLeft) / 60)
                : "< 1"
              : null}
            min
          </Text>
            <Text style={styles.businessName}>
              {order.storeInfo.storeName}
            </Text>
            <View style={styles.margin}></View>
          </View>
        }
        data={mapThroughOrder}
        style={styles.bottomModalContainer}
        renderItem={({ item }) => {
          return (
            <>
              {/* Containing the name of the business  */}

              {/* Pass in the order item detail through props  */}
              <TouchableOpacity
                disabled={true}
                style={styles.foodCategoryStyle}
              >
                <View style={styles.card}>
                  <View style={styles.imageBox}>
                    <Image
                      /**
                       * order was originally item
                       */
                      style={styles.foodImages}
                      source={{
                        uri: `${API}/${item.image.toString()}`,
                      }}
                    />
                  </View>
                  <View style={styles.foodTexts}>
                    <Text style={styles.categoryText}>
                      {item.name}
                    </Text>

                    <Text style={styles.descriptionOfItem}>
                      {item.description}
                    </Text>
                    <Text style={styles.priceText}>
                      ${item.price * item.amountInCart}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    margin: "5%",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  margin: {
    backgroundColor: "#f2f3f5",
    flex: 1,
    paddingVertical: 5,
  },
  // modal container
  bottomModalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  // business name styles
  businessName: {
    margin: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  // header
  headerTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  bottomButtons: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  addItemsButtonContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: "1%",
  },
  addItemsButton: {
    backgroundColor: "#DFDFDF",
    padding: "4%",
    borderRadius: 20,
  },
  amountContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  icon: {
    margin: 10,
  },
  goBackButton: {
    margin: "10%",
  },
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
    width: "50%",
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
    flex: 2,
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