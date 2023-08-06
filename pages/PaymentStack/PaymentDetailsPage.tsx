import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  FlatList,
  Image,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  deleteAllCartItems,
  getCart,
} from "../../store/slices/addToCartSessionSlice";
import { useStripe } from "@stripe/stripe-react-native";
import UseOrders from "hooks/handleVendors/useOrders.hook";
import { getUser } from "../../store/slices/userSessionSlice";
import { calculateTotal } from "hooks/handlePages/useCalculateTotal";
import { makeDynamicPostRequest } from "../../config/axios.config";
/**
 *
 * Be able to transition from the cart page to the order page with enabling the user to have access to between card payment method or pay in cash
 */
const PaymentDetailsPage = () => {
  const [proceed, setProceed] = useState(false);
  // Hooks to transition from cart towards order page
  // delete the current cart after grabbing and add to order instead
  const { addCartToOrder } = UseOrders();

  // grab user information from the current state of the user
  const user = useAppSelector(getUser);
  
  const getCartFromSlice = useAppSelector(getCart);
  const totalCost = calculateTotal(getCartFromSlice).toString().slice(0, 10);
  const dispatch = useAppDispatch();

  const stripe = useStripe();
  const navigation = useNavigation<NavigationProp<any>>();

  // grabbing all the cart item's data to display them on the receipt and the component cards
  // async function getLocation() {
  //   return await cart[0].location
  // }
  // let getLocationOfBusiness = getLocation;
  // if(cart[0].location == null){
  //   getLocationOfBusiness == null
  // }

  // console.log(cart);
  // const getLat =
  // +getLocationOfBusiness.latitude
  // const getLong =
  // +getLocationOfBusiness.longitude
  const addTotal = parseFloat(totalCost);
  const plus = addTotal + addTotal / 10;
  // Passing in the cart to the order to be delete it from the cart list and add it to the order list
  const navigateToOrderComplete = async () => {
    // fixing multi order bug with only making the button work once by disabling after this is called
    setProceed(true);
    
    try {



      await addCartToOrder(getCartFromSlice);


      dispatch(deleteAllCartItems());
      navigation.navigate("OrderPlaced");
      // getCurrentCartItems();
      // getCurrentOrder();
    } catch (e) {
      console.log("error submitting order: ",e);
    }
  };
  useEffect(() => {
    // const geoname = async () => {
    //   try {
    //     const res = await axios.get(
    //       `http://api.geonames.org/addressJSON?lat=${getLat}&lng=${getLong}&username=${geonameAPIUser}`,
    //     )
    //     console.log('result:', JSON.stringify(res))
    //     setLocation(res.data.address)
    //     return res
    //   } catch (err) {
    //     console.log('geoname', err)
    //   }
    // }
    // geoname()
  }, []);
    /**
   * The purpose of this method is to get the client's information on their credentials for card payments with Stripe API
   */
  // const handlePaymentMethodCreation = async () => {
  //   try {
  //     const result = await stripe.createPaymentMethod({
  //       type: 'card',
  //       card: cardElement, // Replace with your card input element
  //     })

  //     // Handle the result
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const navigateToAddPaymentMethod = async () => {
    try {
      //await handlePaymentMethodCreation();
      const headers = [
        {
          name: "Content-Type",
          value: "application/json",
        },
        {
          name: "merchantDisplayName",
          value: getCartFromSlice[0].inCart.storeInfo.storeId,
        },
      ];
      const response = await makeDynamicPostRequest(
        `/payment`,
        {
          amount: totalCost,
          name:user!.firstName + " " +user!.lastName,
        },
        headers
      );

      console.log("here is payment data: ", response.data);
      // getting the client secret after sending the request with client data
      const data = await response.data;
      if (!response) {
        return Alert.alert(data.message);
      }

      // Initiate the pop up on payment through stripe's built-in methods
      const initSheet = await stripe.initPaymentSheet({
        // setting the client secret for the initPaymentSheet without storing it in - key for an individual payment
        paymentIntentClientSecret: data.client_secret,

        // creates a payment flow - one time payments with saving a customer's card without an initial payment
        customFlow: true,
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
        merchantDisplayName: getCartFromSlice[0].inCart.storeInfo.storeId!,
        returnURL: "stripe-example://stripe-redirect",
      });
      // check for errors -> show / alert the user on the error message
      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }

      // show the stripe API sheet -> update the clientSecret to the response data
      // Make sure data.client_secret is a valid value before calling presentPaymentSheet
      const presentSheet = await stripe.presentPaymentSheet();

      console.log("Present Sheet", presentSheet);
      console.log("Client Secret", data.client_secret);

      // if payment is cancelled
      if (presentSheet.error) {
        return Alert.alert(presentSheet.error.message);
      }
      navigateToOrderComplete();
    } catch (err: any) {
      console.error(err);
      Alert.alert("Payment failed!");
    }
  };

  const goBack = () => navigation.goBack();
  return (
    <View style={styles.paymentPageContainer}>
      <Pressable style={styles.goBackButton} onPress={goBack}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </Pressable>
      <Text style={styles.headerText}>Payment Options</Text>

      {/* Flat list for multiple items */}
      <FlatList
        style={{ flex: 1 }}
        data={getCartFromSlice.map((value) => value.inCart)}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                disabled={true}
                style={styles.foodCategoryStyle}
              >
                <View style={styles.card}>
                  <View style={styles.imageBox}>
                    <Image
                      style={styles.foodImages}
                      source={{ uri: `${item.image.toString()}` }}
                    />
                  </View>
                  <View style={styles.foodTexts}>
                    <Text style={styles.categoryText}>{item.name}</Text>
                    <Text style={styles.descriptionOfItem}>
                      {item.description}
                    </Text>
                    <Text style={styles.priceText}>
                      Qty: {item.amountInCart}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />

      {/* INfo on cost */}
      <View style={styles.costInfoContainer}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={24} color="#97989F" />
          <Text style={styles.locationText}>
            {/* { location.houseNumber +
              ' ' +
              location.street +
              ', ' +
              location.adminName1 +
              ', ' +
              location.adminName2 +
              ' ' + location.postalcode } */}
          </Text>
        </View>
        <View style={styles.individualCostInfoContainer}>
          <Text style={styles.costLabel}>Fees</Text>
          <Text style={styles.costNumber}>
            ${(parseInt(totalCost) / 10).toString().slice(0, 4)}
          </Text>
        </View>
        <View style={styles.individualCostInfoContainer}>
          <Text style={styles.costLabel}>SubTotal</Text>
          <Text style={styles.costNumber}>${totalCost}</Text>
        </View>
        <View style={styles.individualCostInfoContainer}>
          <Text style={styles.costLabel}>Total</Text>
          <Text style={styles.costNumber}>${plus.toString().slice(0, 5)}</Text>
        </View>
      </View>

      <View style={styles.paymentInformationContainer}>
        {/* ICONS FOR PAYMENTS */}
        <View style={styles.paymentOptionList}>
          <TouchableOpacity
            style={styles.paymentCard}
            onPress={() => navigateToAddPaymentMethod()}
          >
            <AntDesign
              style={styles.paymentOption}
              name="creditcard"
              size={30}
              color="#78DBFF"
            />
            <Text style={styles.cardButtonText}>Pay With Card</Text>
            <AntDesign
              style={styles.paymentOption}
              name="arrowright"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.payOnArrivalContainer}>
          <TouchableOpacity style={styles.payOnArrivalButton}>
            <FontAwesome name="circle-o" size={24} color="black" />
            <Text style={styles.payOnArrivalText}>Pay on Arrival</Text>
          </TouchableOpacity>
          <Text style={styles.payOnArrivalDetailText}>
            Pay with cash/POS upon arrival{' '}
          </Text>
        </View> */}
        {/* Cost container */}

        {/* Place Order Button */}
        <View style={styles.placeOrderContainer}>
          <Pressable
            disabled={proceed}
            onPress={navigateToOrderComplete}
            style={styles.placeOrderButton}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "5%",
  },
  // payment
  locationText: {
    color: "#97989F",
    textAlign: "center",
  },
  paymentCard: {
    padding: "2%",
    margin: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e3e3e3",
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "row",
  },
  // order container
  placeOrderText: {
    color: "#fff",
    fontWeight: "bold",
  },
  placeOrderContainer: {
    flex: 1,
  },
  placeOrderButton: {
    backgroundColor: "#78DBFF",
    padding: "4%",
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e3e3e3",
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "row",
  },
  goBackButton: {
    margin: 20,
    marginLeft: "10%",
    marginTop: "10%",
    flex: 0.5,
    marginBottom: "-15%",
  },
  costLabel: {
    fontSize: 15,
    marginRight: "10%",
    flex: 1,
    fontWeight: "bold",
  },
  costNumber: {
    fontSize: 15,
    textAlign: "right",
    flex: 1,
    fontWeight: "bold",
  },
  individualCostInfoContainer: {
    flexDirection: "row",

    padding: "5%",
    marginVertical: "-3%",
  },
  pickUpInformationButtonText: {
    color: "#78DBFF",
  },
  costInfoContainer: {
    flex: 0.75,
    marginHorizontal: "5%",
    marginTop: "5%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e3e3e3",
  },
  payOnArrivalDetailText: {
    marginTop: "5%",
  },
  payOnArrivalText: {
    marginLeft: "10%",
  },
  payOnArrivalContainer: {
    flex: 1,
    marginHorizontal: "10%",
  },
  payOnArrivalButton: {
    flexDirection: "row",
    backgroundColor: "#f2f5f5",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },

  // Payment Option - button for card and in person
  cardButtonText: {
    flex: 1,
    marginLeft: "10%",
    fontSize: 15,
    fontWeight: "bold",
  },
  paymentOption: {
    marginHorizontal: "2%",
  },
  paymentOptionList: {
    //flexDirection: 'row',
    flex: 1,
    marginHorizontal: "3%",
  },
  paymentInformationContainer: {
    flex: 1,
  },
  pickUpInformationButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  pickUpInformationText: {
    flex: 2,
  },
  pickUpInformationContainer: {
    flexDirection: "row",
    flex: 0.5,
    marginHorizontal: "10%",
  },
  headerTextPayment: {
    fontWeight: "bold",
    fontSize: 25,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    margin: "4%",
  },
  paymentPageContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },

  // Single Option styles
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
  descriptionOfItem: {
    flex: 1,
    fontSize: 15,
    color: "#97989F",
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
    marginTop: "15%",
    marginBottom: "15%",
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

export default PaymentDetailsPage;
