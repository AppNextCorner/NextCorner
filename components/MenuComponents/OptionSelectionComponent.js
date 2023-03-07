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
  View,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import {
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons'

export default function OptionSelectionComponent(props) {
  const [itemId, setItemId] = useState(0)

  const [customStyle, setCustomStyle] = useState(null)
  const { data, header, render, stateRender } = props

  // Checking for the click event for the single option and change the state of the option
  const handlePress = (stack, idFromParent, item) => {
    // setting the default values for the stack item options to false
    render(!stateRender)

    // set all the options to false rather than setting them to true when the option is a single selection
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
  const handleMultiplePress = (stack, idFromParent) => {
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
    <View>
      {/* The onPress handler tells React to change the value of the radioButtons Hook*/}
      <FlatList
        ListHeaderComponent={header}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.optionCard}>
              <View style={styles.selectionCard}>
                <Text style={styles.optionTitle}>{item.name}</Text>
                <Text style={styles.selctionLimitText}>
                  Select up to{' '}
                  {item.type === 'single' ? 1 : item.customizations.length}
                </Text>
              </View>

              <ScrollView
                style={styles.optionCardContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.buttonOptionContainer}>
                  {item.customizations.map((stack, index) => {
                    // check if the card is either a single selection or a multiple selection
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
                            name={
                              stack.selected === false ? 'circle-o' : 'circle'
                            }
                            size={24}
                            color={
                              stack.selected === false ? '#78DBFF' : '#fff'
                            }
                          />
                          <Text
                            style={
                              stack.selected === false
                                ? {
                                    fontWeight: '600',
                                    fontSize: 10,
                                    textAlign: 'center',
                                    flex: 2,
                                  }
                                : {
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    flex: 2,
                                    fontSize: 10,
                                    color: '#fff',
                                  }
                            }
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
                              handleMultiplePress(stack, item.itemId)
                            }}
                          >
                            <MaterialCommunityIcons
                              style={styles.selectIcon}
                              name={
                                stack.selected === false
                                  ? 'square-rounded-outline'
                                  : 'square-rounded'
                              }
                              size={24}
                              color={
                                stack.selected === false ? '#78DBFF' : '#fff'
                              }
                            />
                            <Text
                              style={
                                stack.selected === false
                                  ? {
                                      fontWeight: '600',
                                      fontSize: 10,
                                      textAlign: 'center',
                                      flex: 2,
                                    }
                                  : {
                                      fontWeight: '600',
                                      textAlign: 'center',
                                      flex: 2,
                                      fontSize: 10,
                                      color: '#fff',
                                    }
                              }
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
            </View>
          )
        }}
      />
    </View>
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
    marginVertical: '5%',
    flex: 1,
  },
  buttonOptionContainer: {
    flexDirection: 'row',
  },
  nullButtonStyle: {
    padding: 5,
    borderRadius: 15,
    width: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#78DBFF',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionStyle: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#78DBFF',
    borderStyle: 'solid',
    borderColor: '#78DBFF',
    borderRadius: 15,
    width: 100,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionCard: {
    flex: 0.45,
    marginHorizontal: 10,
  },
  optionTitle: {
    fontSize: 15,
    marginLeft: '5%',
    marginBottom: '1%',
    marginTop: '10%',
  },
  optionCard: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    borderColor: '#f2f0f0',
    borderRightWidth: 3,
    borderLeftWidth: 3,
  },
})
