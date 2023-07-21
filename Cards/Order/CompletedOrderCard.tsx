import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import moment from 'moment'
import 'moment-timezone'

const CompletedOrderCard = ({ completedOrder } : any) => {
  // Get the time the order was placed and format it using moment.js
  const getTimeOrdered = moment(new Date(completedOrder.createdAt), 'YYYY-M-D H:mm')
    .tz('America/Los_Angeles')
    .format('dddd, MMM D')

  // Calculate the total price of the order
  const calculateOrderPrice = completedOrder.orders.map((cart: any) => cart.inCart.price * cart.inCart.amountInCart)
  const addOrderPrice = Math.round(calculateOrderPrice.reduce((a: number, b: number) => a + b, 0));

  // Get the business name and the number of items in the order
  const getBusinessName = completedOrder.orders[0].inCart.storeInfo.storeName
  const getItemAmount = completedOrder.orders

  return (
    <View style={styles.completedContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.businessName}>{getBusinessName}</Text>
        <AntDesign style={styles.orderInformationIcon} name="right" size={15} color="black" />
      </View>

      <View style={styles.shortOrderDescriptionContainer}>
        <View style={styles.dateAndPrice}>
          <Text style={styles.timeOrdered}>{getTimeOrdered}</Text>
          <Text style={styles.priceOfOrder}>
            / ${addOrderPrice.toFixed(2).toString()} - {getItemAmount.length} items
          </Text>
        </View>

        <View style={styles.itemData}>
          {/* Render each item's name */}
          {getItemAmount.map((order: any, index: number) => (
            <Text key={index.toString()}> {order.inCart.name} /</Text>
          ))}
        </View>

        <View style={styles.cardButtons}>
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.selectionButtonText}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.receiptButton}>
            <Text style={styles.selectionButtonText}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CompletedOrderCard

const styles = StyleSheet.create({
    // header text
    orderInformationIcon: {
        flex: 1,
        alignSelf: 'center',
    },
    businessName: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 15,
        flex: 8,
      },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        padding: '1%'
    },
  
  // button styles
  selectionButtonText: {
    fontWeight: 'bold',
  },
  cardButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '3%',
  },
  receiptButton: {
    padding: '3%',
    backgroundColor: '#e3e3e3',
    borderRadius: 20,
  },
  reorderButton: {
    marginRight: '3%',
    padding: '3%',
    backgroundColor: '#e3e3e3',
    borderRadius: 20,
  },
  // items
  itemData: {
    flex: 1,
    flexDirection: 'row',
    padding: '2%',
    paddingTop: '1%',
  },
  // Price and Time
  priceOfOrder: {
    flex: 1.5,
    color: '#8f8f8f',
  },
  timeOrdered: {
    flex: 1,
    color: '#8f8f8f',
  },
  // details
  shortOrderDescriptionContainer: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f0efed',
  },
  dateAndPrice: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    marginTop: '2%',
  },
 
  // whole container
  completedContainer: {
    paddingHorizontal: '5%',
  },
})
