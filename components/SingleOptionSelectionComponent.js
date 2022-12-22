/**
 * Purpose of the file: This component is responsible for listing the options for the food item in the FoodDetails page
 * - This list is going to be first displayed, then the multiple options component
 * - We use the header component here due to the fact that it is first
 */

import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RadioButtonRN from 'radio-buttons-react-native'

export default function SingleOptionSelectionComponent(props) {
  const [value, setValue] = useState([])
  let okd = value.map((val) => val.option)
  // if statement is not equal to the previous value, then add it, if not filter it out

  let okd2 = okd.filter((item, index) => okd.indexOf(item) === index)

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
              <FlatList
                data={item.options}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        // console.log(item)
                        // console.log()

                        setValue([
                          ...value,
                          { id: Math. floor(Math. random() * 100), option: item.label },
                          // Put old items at the end
                        ])

                        // setValue(
                        //   // Replace the state
                        //   [
                        //     // with a new array
                        //     ...value, // that contains all the old items
                        //     {  option: e.target.value}, // and one new item at the end
                        //   ].filter((item,
                        //     index) => value.indexOf(item) === index)
                        // )
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
      <FlatList
        data={okd2}
        renderItem={({ item }) => {
          return <Text>{item}</Text>
        }}
      />
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
