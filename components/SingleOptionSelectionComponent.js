import {
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import RadioButtonRN from 'radio-buttons-react-native'

export default function SingleOptionSelectionComponent(props) {
  let lol = props.data.map((val) => val)
  //let lol2 = lol.map(option => option.optionOne);
  console.log(lol)
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
