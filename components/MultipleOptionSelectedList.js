import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'

// // You can import from local files
// import AssetExample from './components/AssetExample';

// // or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

const BRANDS = [
  {
    optionTitle: 'spice',
    options: [
      {
        optionOne: 'Mild',
        optionOne: 'Mild',
        optionOne: 'Mild',
      },
    ],
  },
  {
    optionTitle: 'Extra',
    options: [
      {
        optionOne: 'Mild',
        optionOne: 'amogus',
      },
    ],
  },
]

export default function MultipleOptionSelectedList() {
  const [brands, setBrands] = useState(BRANDS)
  const [selectedBrands, setSelectedBrands] = useState([])

  const renderBrands = ({ item, index }) => {
    const { name, slug } = item
    const isSelected = selectedBrands.filter((i) => i === slug).length > 0

    return (
      <TouchableOpacity
        onPress={() => {
          {isSelected ?
            setSelectedBrands((prev) => prev.filter((i) => i !== slug))
          :
            setSelectedBrands((prev) => [...prev, slug])
          }
        }}
        //style={[styles.item, isSelected && { backgroundColor: 'black' }]}
      >
        <Text style={{ color: isSelected ? 'white' : 'black' }}>{name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={brands}
        renderItem={({ item }) => {
          return (
            <>
              <Text>{item.optionTitle}</Text>
              <FlatList
                style={styles.flatListScrollContainer}
                data={brands}
                renderItem={renderBrands}
                scrollEnabled={true}
              />
            </>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatListScrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,

    backgroundColor: '#fff',
    padding: 8,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 2,
    width: '99%',
    height: 75,
  },
})
