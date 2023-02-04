/**
 * Purpose of the file: It is used to display the restaurants and its content by rendering multiple restaurants and multiple horizontal list for each restaurant
 */

import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet'

export default function VerticalPickUpList({ orderItemDetails, distance, duration }) {
  // grabbing the data of the trendingFood from the data folder

  // mapping through the data
  const mapThroughOrder = orderItemDetails.singleOrderList.map(
    (getItemData) => getItemData.cartData,
  )
  console.log(mapThroughOrder)
  let text = 'Lorem ipsum dol'
  console.log(orderItemDetails.singleOrderList)

  let limitTextAmount = text.slice(0, 75) + ''
  return (
    // Used BottomSheetFlatList so the user can close the tab through the vertical scrollbar
    <>
      <BottomSheetView style={styles.statusContainer}>
        {/* Converting distance which is default in km from google maps to miles */}
        <Text style={styles.statusText}>Distance: {(distance * 0.62137).toString().slice(0, 5)} miles</Text>
        <Text style={styles.statusText}>Time To Walk: {duration.toString().slice(0, 3)} min</Text>
      </BottomSheetView>
      <BottomSheetFlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.businessName}>
              {orderItemDetails.singleOrderList[0].businessOrderedFrom}
            </Text>
            <View style={styles.margin}></View>
          </View>
        }
        data={mapThroughOrder}
        style={styles.bottomModalContainer}
        renderItem={({ item }) => {
          return (
            <>
              {/* Containing the name of the restaurant  */}

              {/* Pass in the order item detail through props  */}
              <TouchableOpacity
                disabled={true}
                style={styles.foodCategoryStyle}
              >
                <View style={styles.card}>
                  <View style={styles.imageBox}>
                    <Image style={styles.foodImages} source={item.image} />
                  </View>
                  <View style={styles.foodTexts}>
                    <Text style={styles.categoryText}>{item.name}</Text>
                    <Text style={styles.descriptionOfItem}>
                      {limitTextAmount}
                    </Text>
                    <Text style={styles.priceText}>${item.price}.00</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  statusContainer: {
   margin: '5%',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  margin: {
    backgroundColor: '#f2f3f5',
    flex: 1,
    paddingVertical: 5,
  },
  // modal container
  bottomModalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20
  },
  // business name styles
  businessName: {
    margin: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // header
  headerTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  bottomButtons: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  addItemsButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: '1%',
  },
  addItemsButton: {
    backgroundColor: '#DFDFDF',
    padding: '4%',
    borderRadius: 20,
  },
  amountContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
  },
  icon: {
    margin: 10,
  },
  goBackButton: {
    margin: '10%',
  },
  descriptionOfItem: {
    flex: 1,
    fontSize: 10,

    //fontFamily: 'monospace',
  },
  imageBox: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  distanceText: {
    marginLeft: 10,
    fontSize: 11,
    marginTop: 5,
    flex: 1,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: 'bold',
    //fontFamily: 'monospace',
    marginTop: 15,
    flex: 1,
  },
  foodImages: {
    width: '50%',
    flex: 1,

    // Increase the image size
    padding: '30%',
    marginLeft: 25,
    marginTop: '18%',
    marginBottom: '70%',
    borderRadius: 10,
  },
  card: {
    width: 250,
    height: 115,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  priceText: {
    flex: 1,
    alignContent: 'flex-end',
    color: '#97989F',
    marginTop: 0,
  },
  foodTexts: {
    flex: 2,
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 5,
  },
  foodCategoryStyle: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#d6d6d6',
    borderStyle: 'solid',

    borderBottomWidth: 1,
    marginBottom: -0.1,
    marginTop: 0,
  },
})
