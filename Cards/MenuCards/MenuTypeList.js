import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuItemCard from '../MenuItemCard'
import { useRoute } from '@react-navigation/native'

const MenuTypeList = (props) => {

  const { menuItem, type, businessName, location, logo } = props

  const getItemsThatMatchType = menuItem.filter((item) => item.type === type)

  return (
    <>
      <FlatList
        data={getItemsThatMatchType}
        renderItem={({ item }) => {
          return (
            <>
              <MenuItemCard foodItem={item} businessName={businessName} location={location} logo={logo}/>
            </>
          )
        }}
      />
    </>
  )
}

export default MenuTypeList

const styles = StyleSheet.create({})
