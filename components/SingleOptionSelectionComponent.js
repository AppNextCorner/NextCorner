/**
 * Purpose of the file: This component is responsible for listing the options for the food item in the FoodDetails page
 * - This list is going to be first displayed, then the multiple options component
 * - We use the header component here due to the fact that it is first
 */

import {
  Text,
  FlatList,
  StyleSheet,
} from 'react-native'
import React from 'react'
import RadioButtonRN from 'radio-buttons-react-native'

export default function SingleOptionSelectionComponent(props) {
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
              <RadioButtonRN
                selectedBtn={() => console.log('pressed')}
                initial={0}
                activeColor={'#bababa'}
                style={styles.radioButtonStyle}
                boxActiveBgColor={'#dbdbdb'}
                animationTypes={['rotate']}
                data={item.options}
              />
            </>
          )
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
    marginBottom: -20,
    fontSize: 20,
  },
})
