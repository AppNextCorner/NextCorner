import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import {
  Fontisto,
  Entypo,
  AntDesign,
  FontAwesome,
  Feather,
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const PaymentDetailsPage = () => {
  const navigation = useNavigation()
    const navigateToAddPaymentMethod = () => {
        navigation.navigate('AddPayment')
    }
  const navigateToOrderComplete = () => {
    navigation.navigate('OrderPlaced')
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
        <Text style={styles.headerText}>Payment</Text>
        <View style={styles.paymentOptionList}>
          <TouchableOpacity onPress={navigateToAddPaymentMethod}>
            <AntDesign name="pluscircleo" size={50} color="black" />
          </TouchableOpacity>
          <Fontisto
            style={styles.paymentOption}
            name="mastercard"
            size={50}
            color="black"
          />
          <Entypo
            style={styles.paymentOption}
            name="paypal"
            size={50}
            color="black"
          />
          <Fontisto
            style={styles.paymentOption}
            name="apple-pay"
            size={50}
            color="black"
          />
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
            <Text style={styles.costNumber}>$13</Text>
          </View>
          <View style={styles.individualCostInfoContainer}>
            <Text style={styles.costTotalLabel}>Total</Text>
            <Text style={styles.costTotalNumber}>$18</Text>
          </View>
        </View>
        {/* Place Order Button */}
        <View style={styles.placeOrderContainer}>
          <TouchableOpacity 
          onPress={navigateToOrderComplete}
          style={styles.placeOrderButton}>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  placeOrderText: {
    color: '#fff',
  },
  placeOrderContainer: {
    flex: 1,
    alignItems: 'center',
  },
  placeOrderButton: {
    backgroundColor: '#78DBFF',
    padding: '5%',
    paddingHorizontal: '35%',
    borderRadius: 20,
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
  },
  costNumber: {
    fontSize: 18,
  },
  individualCostInfoContainer: {
    flexDirection: 'row',
  },
  pickUpInformationButtonText: {
    color: '#78DBFF',
  },
  costInfoContainer: {
    flex: 2,
    marginLeft: '10%',
    alignItems: 'center',
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
