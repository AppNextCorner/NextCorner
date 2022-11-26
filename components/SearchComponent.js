import { StyleSheet, TextInput, View} from 'react-native'
import React from 'react'
import { Foundation } from '@expo/vector-icons'

export default function SearchComponent() {
  return (
    <View style={styles.menu}>
      <View style={styles.textInputBox}>
        <TextInput
          style={styles.textInput}
          placeholder="Search For Local Businesses"
        />
        <View style={styles.magnifyIcon}>
          <Foundation name="magnifying-glass" size={24} color="#878B91" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textInputBox: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
      },
      magnifyIcon: {
        flex: 1,
        justifyContent: 'center',
      },
      textInput: {
        flex: 5,
        padding: 10,
        alignContent: 'flex-start',
      },
      menu: {
        paddingHorizontal: 50,
        paddingTop: 50,
       
      },
})