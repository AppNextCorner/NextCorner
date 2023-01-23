/**
 * Purpose of the file: This component is responsible for listing the options for the food item in the FoodDetails page
 * - This list is going to be first displayed, then the multiple options component
 * - We use the header component here due to the fact that it is first
 */

// make a list of options start vertical, then format
// if the button is clicked -> add the option label to an array
// if the button is clicked again, then remove the option label from the array
// if another option is clicked, then, remove the option label from the array

import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import RadioButtonRN from 'radio-buttons-react-native'

export default function SingleOptionSelectionComponent(props) {

  const [itemId, setItemId] = useState(0)
  const [customStyle, setCustomStyle] = useState(null)
  const { updateCustomizations, data, header, optionData } = props

  const handlePress = (stack, idFromParent, item) => {
    // setting the default values for the stack item options to false
    const selectMap = item.customizations.map((val) => (val.selected = false))
    selectMap
    setCustomStyle(null)
    stack.selected = false

    // making the itemId equal to that of the selected stack item id
    idFromParent = stack.id

    // if the id is the same, then set it back to false
    if (idFromParent === stack.id) {
      // if one of the children is selected, then set the selected value to true
      stack.selected = true
      // setting the selected value its style
      setCustomStyle({
        style:
          stack.id === itemId ? styles.nullButtonStyle : styles.optionStyle,
      })
    }
  }

  return (
    <>
      {/* The onPress handler tells React to change the value of the radioButtons Hook*/}
      <FlatList
        ListHeaderComponent={header}
        data={data}
        renderItem={({ item }) => {
          return (
            <>
              <Text style={styles.optionTitle}>{item.name}</Text>
              <ScrollView
                style={styles.optionCardContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.buttonOptionContainer}>
                  {item.customizations.map((stack, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={
                          stack.selected === false
                            ? styles.nullButtonStyle
                            : styles.optionStyle
                        }
                        onPress={() => {
                          handlePress(stack, item.itemId, item)
                        }}
                      >
                        <Text
                          style={{ fontWeight: '500', textAlign: 'center' }}
                        >
                          {stack.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
            </>
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  optionMenuContainer: {},
  buttonOptionContainer: {
    flexDirection: 'row',
  },
  nullButtonStyle: {
    padding: 20,
    borderRadius: 20,
    width: 150,
    backgroundColor: '#f7fafa',
    borderWidth: 1,
    borderColor: '#f7fafa',
    marginLeft: 10,
  },
  optionStyle: {
    padding: 20,
    borderWidth: 1,
    backgroundColor: '#f7fafa',
    borderStyle: 'solid',
    borderColor: '#6BD8FF',
    borderRadius: 20,
    width: 150,
    marginLeft: 10,
  },
  optionTitle: {
    fontSize: 20,
    margin: '5%',
  },
})
