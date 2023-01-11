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
  View
} from 'react-native'
import React, { useState } from 'react'
import RadioButtonRN from 'radio-buttons-react-native'

export default function SingleOptionSelectionComponent(props) {
  const [isActive, setIsActive] = useState(false)
  const [itemId, setItemId] = useState(0)
  const [customStyle, setCustomStyle] = useState(null)
  // const mapThroughOptions = props.data.map(val => val.customizations)
  // const [value, setValue] = useState(mapThroughOptions)
  const { updateCustomizations, data, header, optionData } = props
  // console.log('Here are custom values', value)
  // console.log(props.data)
  console.log(props)

  const handlePress = (stack, index, idFromParent) => {
    // if the id is the same, then set it back to false
    if (idFromParent === stack.id) {
      idFromParent.itemId = 0;
      setCustomStyle(null)
      stack.selected = false
    } else  {
      stack.selected = true
      idFromParent.itemId = stack.id
      console.log('stack id', stack.id)
      console.log('HEre is itemID', idFromParent)
      setCustomStyle({
        style:
          stack.id === itemId ? styles.nullButtonStyle : styles.optionStyle,
      })
      console.log("SELECTED", stack.selected)
    }
  }

  return (
    <>
      {/* The onPress handler tells React to change the value of the radioButtons Hook*/}
      <FlatList
        ListHeaderComponent={header}
        data={data}
        // keyExtractor={(item) => {
        //   item.id
        // }}
        renderItem={({ item }) => {
          return (
            <>
              <Text style={styles.optionTitle}>{item.name}</Text>
              {/* <Text>{item.selectedOption}</Text> */}

              {/* <FlatList
                data={item.customizations}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={(event) => {
                        // setValue(
                        // {
                        //   option: item.label,
                        //   id: item.id,
                        // }
                        //   // Put old items at the end
                        // );
                        value.push({customization: item.label})
                        // props.onChange({
                        //   option: item.label,
                        //   id: item.id,
                        // });
                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  );
                }}
              /> */}
              {/* <View style={{display:'flex', flexDirection: 'row', overflow: 'scroll'}}>

             */}
              {item.customizations.map((stack, index) => {
                for (let i= 0; i < item.customizations.length; i++) {
                  item.customizations[i].selected = i === stack.id;
                  
              }
                return (
                  <TouchableOpacity
                    key={index}
                    // {...touchButton}
                    style={
                      stack.id !== item.itemId
                        ? styles.nullButtonStyle
                        : styles.optionStyle
                    }
                    // style={[
                    //   styles.menuStyle,
                    //   index === activeLink
                    //     ? { backgroundColor: 'red' }
                    //     : { backgroundColor: 'white' },
                    // ]}
                    onPress={() => {
                      // updateCustomizations(id, customizations)
                      console.log("INDEX", index)
                     handlePress(stack, index, item)
                      console.log("STACK", stack)
                      //toggle(stack.selected)
                      // testBool = testBool? false : true

                      console.log(stack.selected, stack.id, item.itemId)
                      // setValue(oldArray => [...oldArray, stack.label]);
                      // console.log("Value selected", value)

                      // if(boolean === true){
                      //   console.log("false", !boolean)
                      // }
                      // else if (boolean === false){
                      //   console.log("true", !boolean)
                      // }
                      console.log('Custom options', item.customizations)
                    }}
                  >
                    <Text style={{ width: '70%', fontWeight: '500' }}>
                      {stack.label}
                    </Text>
                  </TouchableOpacity>
                )
              })}
              {/* </View> */}
            </>
            

          )
        }}
        
      />
      
      
      {/* <Text>{value}</Text> */}
    </>
  )
}

const styles = StyleSheet.create({
  nullButtonStyle: {
    display: 'flex',
    width: 150,
    padding: '5%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 20,
    overflow: 'scroll'
    },
  optionStyle: {
    display: 'flex',
    backgroundColor: 'red',
    padding: '5%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 20,
    overflow: 'scroll'
  },
  radioButtonStyle: {
    marginTop: 15,
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 20,
  },
})
