/**
 * Purpose of the component: It contains right now only the UI, but it woulc be used to search for businesses the user may now and look for without having to look through the whole app to find a business that they know
 * - Going to implement a filter for this to work or another expo npm library
 */

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { Foundation } from '@expo/vector-icons'
import useRestaurants from '../hooks/useRestaurants'
import { useNavigation } from '@react-navigation/native'

export default function SearchComponent() {
  const [showStores, setShowStores] = useState('')

  const { restaurants } = useRestaurants()
  const navigation = useNavigation()
  const filteredStores = []
  const mapStores = restaurants.map((il) => il.name)

  // goes through all the businesses and checks if the user that typed the store is filtered and if so, add to the list
  for (let i = 0; i < mapStores.length; i++) {
    // grabs the business from an index from the whole businesses list and takes a slice and compares them with the user input to determine which business to show
    if (mapStores[i].slice(0, showStores.length) === showStores) {
      filteredStores.push(restaurants[i])
    }
  }

  // pass the restaurant data which includes the menu
  const goToMenuPage = (item) => {
    navigation.navigate('MenuList', { restaurant: item })
  }

  return (
    <View style={styles.menu}>
      <View style={styles.textInputBox}>
        <TextInput
          readOnly={false}
          style={styles.textInput}
          placeholder="Search For Local Businesses"
          value={showStores}
          onChangeText={(text) => {
            // Capitalize the first character of the search term to be able to distinguish the many restaurants 
            setShowStores(
              text
                .toLowerCase()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
            )
            
          }}
        />
        <View style={styles.magnifyIcon}>
          <Foundation name="magnifying-glass" size={24} color="#878B91" />
        </View>
      </View>
      {showStores !== '' ? (
        <ScrollView style={styles.scroll}  keyboardShouldPersistTaps='never'>
          {filteredStores.map((store) => {
            return (
              <TouchableOpacity
                key={store.id}
                onPress={() => goToMenuPage(store)}
              >
                <View style={styles.restaurantContainer}>
                  <Text style={styles.restaurantText}>{store.name}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      ) : //</View>
      null}
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    height: 125, 
  },
  restaurantText: {
    color: '#6a6b6a',
  },

  restaurantContainer: {
    padding: '5%',
    borderColor: '#adadad',
    borderBottomWidth: 1,
    
  },
  // Input box style
  textInputBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    marginBottom: 10,
  },
  magnifyIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    flex: 5,
    padding: 10,
    alignContent: 'flex-start',
  },
  menu: {
    paddingHorizontal: 50,
    paddingTop: 50,
    overflow: 'hidden',
  },
})
