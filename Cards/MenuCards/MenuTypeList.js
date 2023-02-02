import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuItemCard from '../MenuItemCard'
import { useRoute } from '@react-navigation/native'

const MenuTypeList = (props) => {
  const route = useRoute()
  const { menuItem, type, businessName } = props

  const getItemsThatMatchType = menuItem.filter((item) => item.type === type)
  console.log(menuItem)
  return (
    <>
      <FlatList
        data={getItemsThatMatchType}
        renderItem={({ item }) => {
          return (
            <>
              <MenuItemCard foodItem={item} businessName={businessName} />
            </>
          )
        }}
      />
    </>
  )
}

export default MenuTypeList

const styles = StyleSheet.create({})
