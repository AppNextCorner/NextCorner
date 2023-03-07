import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuItemCard from '../MenuItemCard'
import { useRoute } from '@react-navigation/native'

const MenuTypeList = (props) => {
  // data sent towards the food details page
  const { menuItem, type, businessName, location} = props

  // type is a string that represents the type of food that the menu item represents: ex: Burger, Pizza, etc.
  const getItemsThatMatchType = menuItem.filter((item) => item.category === type)
  return (
    <>
      <FlatList
        data={getItemsThatMatchType}
        renderItem={({ item }) => {
          return (
            <>
              <MenuItemCard foodItem={item} businessName={businessName} location={location}/>
            </>
          )
        }}
      />
    </>
  )
}

export default MenuTypeList

const styles = StyleSheet.create({})
