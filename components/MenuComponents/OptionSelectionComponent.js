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
import { FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

export default function OptionSelectionComponent(props) {
  const [itemId, setItemId] = useState(0)
  
  const [customStyle, setCustomStyle] = useState(null)
  const {
    updateCustomizations,
    data,
    header,
    optionData,
    render,
    stateRender,
  } = props

  const handlePress = (stack, idFromParent, item) => {
    // setting the default values for the stack item options to false
    render(!stateRender)
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
      //icon = true
      // setting the selected value its style
      setCustomStyle({
        style:
          stack.id === itemId ? styles.nullButtonStyle : styles.optionStyle,
      })
    }
  }

  // For multiple options selected
  const handleMultiplePress = (stack, idFromParent, item) => {
    // setting the default values for the stack item options to false
    // const selectMap = item.customizations.map((val) => (val.selected = false))
    // selectMap
    setCustomStyle(null)
    render(!stateRender)

    
    // making the itemId equal to that of the selected stack item id
    idFromParent = stack.id

    // if the id is the same, then set it back to false
    if (idFromParent === stack.id) {
      // if one of the children is selected, then set the selected value to true
      stack.selected = !stack.selected
      //icon = true;
      // setting the selected value its style
      setCustomStyle({
        style:
          stack.id === itemId ? styles.nullButtonStyle : styles.optionStyle,
      })
    }
    console.log(stack.selected)
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
              <Text style={styles.selctionLimitText}>
                Select up to{' '}
                {item.type === 'single' ? 1 : item.customizations.length}
              </Text>
              <ScrollView
                style={styles.optionCardContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.buttonOptionContainer}>
                  {item.customizations.map((stack, index) => {
                    if (item.type === 'single') {
                      
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
                          <FontAwesome
                            style={styles.selectIcon}
                            name={stack.selected === false ? 'circle-o' : 'circle'}
                            size={24}
                            color="black"
                          />
                          <Text
                            style={{
                              fontWeight: '500',
                              textAlign: 'center',
                              flex: 1,
                            }}
                          >
                            {stack.label}
                          </Text>
                        </TouchableOpacity>
                      )
                    }
                    if (item.type === 'multiple') {
                    
                      //console.log('selection', item.customizations)
                      return (
                        <>
                         
                          <TouchableOpacity
                            key={index}
                            style={
                              stack.selected === false
                                ? styles.nullButtonStyle
                                : styles.optionStyle
                            }
                            onPress={() => {
                              handleMultiplePress(stack, item.itemId, item)
                            }}
                          >
                            <MaterialCommunityIcons
                              style={styles.selectIcon}
                              name={stack.selected === false ? 'square-rounded-outline' : 'square-rounded'}
                              size={24}
                              color="black"
                            />
                            <Text
                              style={{
                                fontWeight: '500',
                                textAlign: 'center',
                                flex: 3,
                              }}
                            >
                              {stack.label}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )
                    }
                  })}
                </View>
              </ScrollView>
              <View style={styles.margin}></View>
            </>
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  selectIcon: {
    flex: 1,
  },
  selctionLimitText: {
    marginLeft: '5%',
    marginBottom: '5%',
    color: '#97989F',
  },
  margin: {
    backgroundColor: '#f2f3f5',
    //flex: 1,
    paddingVertical: 5,
  },
  optionCardContainer: {
    marginBottom: '5%',
  },
  buttonOptionContainer: {
    flexDirection: 'row',
  },
  nullButtonStyle: {
    padding: 20,
    borderRadius: 20,
    width: 175,
    backgroundColor: '#f7fafa',
    borderWidth: 1,
    borderColor: '#f7fafa',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionStyle: {
    padding: 20,
    borderWidth: 1,
    backgroundColor: '#f7fafa',
    borderStyle: 'solid',
    borderColor: '#6BD8FF',
    borderRadius: 20,
    width: 175,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 20,
    marginLeft: '5%',
    marginBottom: '1%',
    marginTop: '10%',
  },
})
