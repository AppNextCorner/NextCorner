/**
 * Purpose of the file: It is used to display the current food items the user has selected after exiting from the foodDetails page and selecting their preference
 * - Work in Progess -> needs to completed in terms of passing data from the FoodDetails page and need to display both components of current and completed order
 */

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useState, useEffect } from 'react'

export default function OrdersPage() {
  const [orderType, setOrderType] = useState([
    {
      name: 'InProgress',
    },
  ])

  useEffect(() => {
    console.log(`count changed to ${orderType.name}`)
  }, [orderType.name])

  const changeName = (title) => {
    setOrderType((orderType) => {
      return {
        ...orderType,
        name: title,
      }
    })
    console.log(orderType.name)
  }

  return (
    // <View>
    //   <Text>OrdersPage</Text>

    //   <Button
    //     onPress={() => {
    //       setOrderType((orderType) => {
    //         return {
    //           ...orderType,
    //           name: 'InProgress',
    //         }
    //       })
    //       console.log(orderType.name)
    //     }}
    //     title="Lol"
    //   />
    //   <Button
    //     onPress={() => {
    //       setOrderType((orderType) => {
    //         return {
    //           ...orderType,
    //           name: 'Done',
    //         }
    //       })
    //       console.log(orderType.name)
    //     }}
    //     title="Done"
    //   />
    //   <FlatList
    //     data={orderType}
    //     renderItem={({ item }) => {
    //       console.log('Among Us ' + item.name)
    //       if (item.name == 'Done') {
    //         return <Text style={styles.text}>Hello World</Text>
    //       } else {
    //         return <Text>Descpi</Text>
    //       }
    //     }}
    //     keyExtractor={(item) => item.id}
    //   />

    //   {/* 2 column list to navigate easily between in progress and completed orders */}
    //   <View></View>
    // </View>
    <View>
      <ScrollView>
        <View
          style={{
            padding: 10,
            width: '100%',
            backgroundColor: '#000',
            height: 150,
          }}
        >
          <TouchableOpacity>
            <Image
              source={require('../assets/restaurantImages/redFoodCart.png')}
              style={{ width: 30, height: 30 }}
            ></Image>
            <View></View>
            <View></View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'left' }}>
          <Image
            source={require('../assets/restaurantImages/redFoodCart.png')}
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              marginTop: -70,
            }}
          ></Image>
          <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>
            {' '}
            Ralph Lopez{' '}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}>
            {' '}
            Ralph90062@gmail.com{' '}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '90%',
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
            shadowOpacity: 80,
            elevation: 15,
          }}
        >
          <Image
            source={require('../assets/restaurantImages/redFoodCart.png')}
            style={{ width: 30, height: 30 }}
          ></Image>
          <Text
            style={{
              fontSize: 15,
              color: '#818181',
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            {' '}
            Profile{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '90%',
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
            shadowOpacity: 80,
            elevation: 15,
            marginBottom: 40,
          }}
        >
          <Image
            source={require('../assets/restaurantImages/redFoodCart.png')}
            style={{ width: 30, height: 30 }}
          ></Image>
          <Text
            style={{
              fontSize: 15,
              color: '#818181',
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            {' '}
            Profile{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '90%',
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
            shadowOpacity: 80,
            elevation: 15,
            marginBottom: 40,
            backgroundColor: 'blue',
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            {' '}
            Logout{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 100,
  },
})
