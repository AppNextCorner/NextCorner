import React, {useState} from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'

export default function SignUpPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.signInContainer}>
      <View style={styles.headerTag}>
        <Text style={styles.mainHeader}>Create an account</Text>
        <Text>
          Welcome friend, entr your details so lets get started in ordering food
        </Text>
      </View>
      {/* Email and Password input - still needs to add confirm password feature */}
      <View style={styles.inputContainer}>

        
        <Text style={styles.inputText}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          readOnly={false}
          onChangeText={(text) => {
            console.log(email)
            setEmail(text)
          }}
          placeholder="email@gmail.com"
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.textInput}
          readOnly={false}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.textInput}
          readOnly={false}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
        />
      </View>
      


      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Login</Text>
      </TouchableOpacity>
      {/* Navigate to login page through this text button */}
      <TouchableOpacity>
        <Text>Have an account? Login Here</Text>
      </TouchableOpacity>

      {/* <View>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleCreateAccount}
            >
              <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>
          </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  inputText: {
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: '15%',
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
    borderColor: '#F0F0F0',
    padding: '5%',
    marginVertical: '3%',
  },
  bottom: {
    flex: 1,
    marginBottom: 36,
  },
  signInText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  signInButton: {
    backgroundColor: '#78DBFF',
    padding: '5%',
    borderRadius: 20,
    marginTop: '5%',
  },
  headerTag: {
    margin: '5%',
  },
  signInContainer: {
    padding: '10%',
    paddingTop: '20%',
    flex: 1,

    backgroundColor: 'white',
  },
  mainHeader: {
    fontWeight: 'bold',
    marginBottom: '5%',
    fontSize: 25,
  },
})
