/**
 * Purpose of the component: It is going to display the user's location and as well as a clickable icon to navigate through the order page to show the user their orders
 */

import { StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'
import HomeIcon from '../assets/icon/nextCornerLogo.png'
import { FontAwesome5 } from '@expo/vector-icons'

export default function HeaderComponent() {
  return (
    <View style={styles.header}>
      <Image style={styles.nextCornerIcon} source={HomeIcon} />
      <Text style={styles.address}>2167 w ave</Text>
      <View>
        <FontAwesome5
          style={styles.shoppingIcon}
          name="shopping-basket"
          size={24}
          color="black"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nextCornerIcon: {
    marginTop: 2,
  },
  shoppingIcon: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  address: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 50,
  },
})
