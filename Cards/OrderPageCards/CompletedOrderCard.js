import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons'

import moment from 'moment'
import 'moment-timezone'

const CompletedOrderCard = ({ completedOrder }) => {
  // grab the time it was ordered last from and be able to display the date through a specific format with moment js
  const getTimeOrdered = moment(
    new Date(completedOrder.createdAt),
    'YYYY-M-D H:mm',
  )
    .tz('America/Los_Angeles')

    .format('dddd, MMM D')
  // Get the prices of the each completed order and calculate the total amount of price for one item
  const calculateOrderPrice = completedOrder.singleOrderList
    .map((cart) => cart.cartData)
    .map((price) => price.price * price.amountInCart)

  // add the prices of all completed orders after it has been added to their respective amounts
  let addOrderPrice = calculateOrderPrice.reduce(function (a, b) {
    return a + b
  })
  // Grab the business name of the order and the amount of items for that specific item
  const getBusinessName = completedOrder.singleOrderList[0].businessOrderedFrom
  const getItemAmount = completedOrder.singleOrderList
  return (
    <>
      <View style={styles.completedContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.businessName}>{getBusinessName}</Text>
          <AntDesign style={styles.orderInformationIcon} name="right" size={15} color="black" />
        </View>

        {/* Description header of card */}

        <View style={styles.shortOrderDescriptionContainer}>
          <View style={styles.dateAndPrice}>
            <Text style={styles.timeOrdered}>{getTimeOrdered}</Text>
            <Text style={styles.priceOfOrder}>
              / ${addOrderPrice.toString().slice(0, 5)} - {getItemAmount.length} items
            </Text>
          </View>
          {/* Item list */}
          <View style={styles.itemData}>
            {getItemAmount
              .map((order) => order.cartData)
              .map((name) => (
                <Text key={name.itemId}> {name.name} /</Text>
              ))}
          </View>
          {/* Two buttons for viewing receipt and reordering the same order items sent to cart*/}
          <View style={styles.cardButtons}>
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.selectionButtonText}>Reorder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.receiptButton}>
              <Text style={styles.selectionButtonText}>View Receipt</Text>
            </TouchableOpacity>
          </View>
          {/* Margin for every card */}
        </View>
      </View>
      
    </>
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
