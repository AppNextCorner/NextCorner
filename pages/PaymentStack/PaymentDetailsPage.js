import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native'
import {
  Fontisto,
  Entypo,
  AntDesign,
  FontAwesome,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import {
  getCart,
  setOrder,
  getTotal,
  deleteItem,
  deleteItemReducer,
  deleteItemAfterOrder,
} from '../../store/slices/addToCart'
import { useStripe } from '@stripe/stripe-react-native'
import { IP } from '../../constants/StripeApiKey'
import { auth } from '../../App'
import useCart from '../../hooks/useCart'
import UseOrders from '../../hooks/useOrders'
const PaymentDetailsPage = () => {
  const { deleteCartData, getCurrentCartItems } = useCart()

  const { addCartToOrder, getCurrentOrder } = UseOrders()
  const stripe = useStripe()
  const name = 'henrybenry'

  const route = useRoute()
  const [proceed, setProceed] = useState(false)

  const cart = useAppSelector(getCart)
  const totalCost = useAppSelector(getTotal)
  const dispatch = useAppDispatch()
  const [clientSecret, setClientSecret] = useState('')

  const navigation = useNavigation()

  // const getClientSecret = async () => {
  //   try {
  //     const response = await fetch(`http://${IP}:4020/secret`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       //body: JSON.stringify({ amount: totalCost, name }),
  //     })

  //     const data = await response.json()
  //     await setClientSecret(data.clientSecret)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {
  //   getClientSecret()
  // }, [])

  const navigateToAddPaymentMethod = async () => {
    try {
      const response = await fetch(`http://${IP}:4020/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalCost, name }),
      })
      // getting the client secret after sending the request with client data
      const data = await response.json()
      console.log('Data of Client', data.client_secret)
      if (!response.ok) {
        return Alert.alert(data.message)
      }
      // Initiate the pop up on payment through stripe's built in methods
      const initSheet = await stripe.initPaymentSheet({
        // setting the client secret for the initPaymentSheet without storing it in - key for an individual payment
        paymentIntentClientSecret: data.client_secret,
        // applePay: {
        //   merchantCountryCode: 'US',
        // },

        // creates a payment flow - one time payments with saving a customer's card without an initial payment
        customFlow: true,

        returnURL: 'stripe-example://stripe-redirect',
      })
      // check for errors -> show / alert the user on the error message
      if (initSheet.error) {
        console.error(initSheet.error)
        return Alert.alert(initSheet.error.message)
      }
      // show the stripe API sheet -> update the clientSecret to the response data
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: clientSecret,
      })
      console.log('Present Sheet', presentSheet)
      console.log('Client Secret', clientSecret)

      // if payment is cancelled
      if (presentSheet.error) {
        //console.error(presentSheet.error)
        return Alert.alert(presentSheet.error.message)
      }
      Alert.alert('Order Placed Successfully')
      navigateToOrderComplete()
    } catch (err) {
      console.error(err)
      Alert.alert('Payment failed!')
    }
  }
  console.log(cart.map((item) => item.cartData).map((cartItem) => cartItem.itemId))
  // Passing in the cart to the order to be delete it from the cart list and add it to the order list
  const navigateToOrderComplete = async () => {
    setProceed(true)
    // grab the user id from the cart list
    const mapIdInCart = cart.map((item) => item.id)
    console.log('user id: ' + mapIdInCart)
    navigation.navigate('OrderPlaced')
    
    const mapItemIdInCart = cart.map((item) => item.cartData).map((cartItem) => cartItem.itemId)
    console.log('item id: ' + mapIdInCart)
    try {
      await addCartToOrder(cart)
      for (let i = 0; i < mapIdInCart.length; i++) {
        deleteCartData({ id: mapIdInCart[i] })
        
      }
      for (let i = 0; i < mapItemIdInCart.length; i++) {
        deleteItemAfterOrder({ id: mapItemIdInCart[i] })
        
      }
      // change the state of the order

      console.log(' proceed: ', route.params.proceed)
      getCurrentCartItems();
      getCurrentOrder();
      
    } catch (e) {
      console.log(e)
    }
  }
  const goBack = () => navigation.goBack()
  return (
    <View style={styles.paymentPageContainer}>
      <Pressable style={styles.goBackButton} onPress={goBack}>
        <Feather name="arrow-left-circle" size={40} color="black" />
      </Pressable>
      <Text style={styles.headerText}>Pick Up</Text>

      <View style={styles.pickUpInformationContainer}>
        <Text style={styles.pickUpInformationText}>
          1111 S Fiqueroua St, Los Angeles, CA 90015
        </Text>
        <View style={styles.pickUpInformationButton}>
          <TouchableOpacity>
            <Text style={styles.pickUpInformationButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.pickUpInformationContainer}>
        <Text style={styles.pickUpInformationText}>(213) 742-7100</Text>
        <View style={styles.pickUpInformationButton}>
          <TouchableOpacity>
            <Text style={styles.pickUpInformationButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.paymentInformationContainer}>
        <Text style={styles.headerTextPayment}>Payment method</Text>

        {/* ICONS FOR PAYMENTS */}
        <View style={styles.paymentOptionList}>
          <TouchableOpacity style={styles.paymentCard} onPress={() => navigateToAddPaymentMethod()}>
            <FontAwesome5
              style={styles.paymentOption}
              name="stripe-s"
              size={50}
              color="#78DBFF"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.payOnArrivalContainer}>
          <TouchableOpacity style={styles.payOnArrivalButton}>
            <FontAwesome name="circle-o" size={24} color="black" />
            <Text style={styles.payOnArrivalText}>Pay on Arrival</Text>
          </TouchableOpacity>
          <Text style={styles.payOnArrivalDetailText}>
            Pay with cash/POS upon arrival{' '}
          </Text>
        </View>
        {/* Cost container */}
        <View style={styles.costInfoContainer}>
          <View style={styles.individualCostInfoContainer}>
            <Text style={styles.costLabel}>Fees</Text>
            <Text style={styles.costNumber}>$5</Text>
          </View>
          <View style={styles.individualCostInfoContainer}>
            <Text style={styles.costLabel}>SubTotal</Text>
            <Text style={styles.costNumber}>${totalCost}</Text>
          </View>
          <View style={styles.individualCostInfoContainer}>
            <Text style={styles.costTotalLabel}>Total</Text>
            <Text style={styles.costTotalNumber}>$18</Text>
          </View>
        </View>
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
  )
}

const styles = StyleSheet.create({
  // payment
  paymentCard: {
    padding: '2%',
    margin: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e3e3e3',
    borderWidth: 2,
    borderRadius: 15,

  },
  // order container
  placeOrderText: {
    color: '#fff',
  },
  placeOrderContainer: {
    flex: 1,
  },
  placeOrderButton: {
    backgroundColor: '#78DBFF',
    padding: '5%',
    paddingHorizontal: '35%',
    borderRadius: 20,
    margin: '3%',
    marginBottom: '5%',
    flex: 1,
  },
  goBackButton: {
    margin: 20,
    marginLeft: '10%',
    marginTop: '10%',
    flex: 0.5,
    marginBottom: '-15%',
  },
  costLabel: {
    fontSize: 18,
    marginRight: '10%',
  },
  costNumber: {
    fontSize: 18,
    textAlign: 'right',
  },
  individualCostInfoContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  pickUpInformationButtonText: {
    color: '#78DBFF',
  },
  costInfoContainer: {
    flex: 2,
    marginLeft: '10%',
  },
  payOnArrivalDetailText: {
    marginTop: '5%',
  },
  payOnArrivalText: {
    textAlignVertical: 'center',
    marginLeft: '10%',
  },
  payOnArrivalContainer: {
    flex: 2,
    marginHorizontal: '10%',
  },
  payOnArrivalButton: {
    flexDirection: 'row',
    backgroundColor: '#f2f5f5',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  paymentOption: {
    marginLeft: '5%',
  },
  paymentOptionList: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: '10%',
  },
  paymentInformationContainer: {
    flex: 5,
  },
  pickUpInformationButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pickUpInformationText: {
    flex: 2,
  },
  pickUpInformationContainer: {
    flexDirection: 'row',
    flex: 0.5,
    marginHorizontal: '10%',
  },
  headerTextPayment: {
    marginLeft: '10%',

    fontWeight: 'bold',
    fontSize: 25,
  },
  headerText: {
    margin: '10%',
    marginTop: '15%',
    fontWeight: 'bold',
    fontSize: 25,
  },
  paymentPageContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
})

export default PaymentDetailsPage
