import { StyleSheet, View, Text, FlatList, Button } from 'react-native'
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
    <View>
      <Text>OrdersPage</Text>

      <Button
        onPress={() => {
          setOrderType((orderType) => {
            return {
              ...orderType,
              name: 'InProgress',
            }
          })
          console.log(orderType.name)
        }}
        title="Lol"
      />
      <Button
        onPress={() => {
          setOrderType((orderType) => {
            return {
              ...orderType,
              name: 'Done',
            }
          })
          console.log(orderType.name)
        }}
        title="Done"
      />
      <FlatList
          data={orderType}
          renderItem={({ item }) => {
            console.log('Among Us ' + item.name)
            if (item.name == 'Done') {
              return <Text style={styles.text}>Hello World</Text>
            } else {
              return <Text>Descpi</Text>
            }
          }}
          keyExtractor={(item) => item.id}
        />

      {/* 2 column list to navigate easily between in progress and completed orders */}
      <View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 100,
  },
})
