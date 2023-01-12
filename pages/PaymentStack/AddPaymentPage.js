import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AddPaymentPage = () => {
  const navigation = useNavigation()
  const goBack = () => navigation.navigate('PaymentDetails')
  return (
    <View style={styles.addPaymentContainer}>
      <Pressable style={styles.goBackButton} onPress={goBack}>
        <Feather name="arrow-left-circle" size={40} color="black" />
      </Pressable>
      <View style={styles.addPaymentContentContainer}>
        <Text style={styles.pageHeader}>Add Payment</Text>
        {/* Text input containers */}

        <View>
          <Text style={styles.paymentLabelText}>Card Name</Text>
          <TextInput
            style={styles.paymentInfoTextInput}
            placeholder="Jack Lewis"
          />
          <View>
            <Text style={styles.paymentLabelText}>Card Number</Text>
            <TextInput
              style={styles.paymentInfoTextInput}
              placeholder="0000-0000-0000-0000"
            />
          </View>
          {/* Row content */}
          <View style={styles.externalInfoContainer}>
            <View style={styles.bottomPaymentInfoContainer}>
              <Text style={styles.paymentLabelText}>EXP date</Text>
              <TextInput
                style={styles.paymentInfoTextInput}
                placeholder="DD/MM"
              />
            </View>
            <View style={styles.bottomPaymentInfoContainer}>
              <Text style={styles.paymentLabelText}>CVV</Text>
              <TextInput
                style={styles.paymentInfoTextInput}
                placeholder="123"
              />
            </View>
          </View>
        </View>
      </View>
      {/* Save options */}
      <View style={styles.savePaymentContainer}>
        <TouchableOpacity onPress={goBack} style={styles.savePaymentButton}>
          <Text style={styles.savePaymentText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddPaymentPage

const styles = StyleSheet.create({
  savePaymentText: {
    color: '#fff',
  },
  savePaymentContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  savePaymentButton: {
    backgroundColor: '#78DBFF',
    padding: '5%',
    paddingHorizontal: '35%',
    borderRadius: 20,
  },
  bottomPaymentInfoContainer: {
    flex: 1,
    margin: '2%',
  },
  externalInfoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  paymentInfoTextInput: {
    borderColor: '#DFE2E5',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 25,
    borderRadius: 15,
    marginTop: '2%',
    flex: 1,
  },
  paymentLabelText: {
    marginLeft: '2%',
  },
  pageHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: '10%',
  },
  addPaymentContentContainer: {
    flex: 1,
    marginHorizontal: '10%',
  },
  addPaymentContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  goBackButton: {
    margin: 20,
    marginLeft: '10%',
    marginTop: '10%',
    flex: 0.1,
  },
})
