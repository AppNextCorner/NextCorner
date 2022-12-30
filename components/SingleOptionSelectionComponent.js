/**
 * Purpose of the file: This component is responsible for listing the options for the food item in the FoodDetails page
 * - This list is going to be first displayed, then the multiple options component
 * - We use the header component here due to the fact that it is first
 */

// make a list of options start vertical, then format
// if the button is clicked -> add the option label to an array
// if the button is clicked again, then remove the option label from the array
// if another option is clicked, then, remove the option label from the array

import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RadioButtonRN from 'radio-buttons-react-native'

export default function SingleOptionSelectionComponent(props) {
  const [value, setValue] = useState({
    option: '',
    id: 0,
  })

  console.log(value)
  return (
    <>
      {/* The onPress handler tells React to change the value of the radioButtons Hook*/}
      <FlatList
        ListHeaderComponent={props.header}
        data={props.data}
        renderItem={({ item }) => {
          return (
            <>
              <Text style={styles.optionTitle}>{item.optionTitle}</Text>
              {/* <Text>{item.selectedOption}</Text> */}
              {
                value !== '' ? <Text>{item.selectedOption}</Text> : null
              }
              
              <FlatList
                data={item.options}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={(event) => {
                        
                        setValue(
                          {
                            option: item.label,
                            id: item.id,
                          },
                          // Put old items at the end
                        )


                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )
                }}
              />
            </>
          )
        }}
      />
       <Text>{value.option}</Text>
     
    </>
  )
}

const styles = StyleSheet.create({
  radioButtonStyle: {
    marginTop: 15,
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 20,
  },
})
