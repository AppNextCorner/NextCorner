/**
 * Purpose of file: Currently has basic firebase functionality for authentication
 * Note: It still requires "forgot password" functionality and styling for the page
 */

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native'
import { useAppDispatch } from '../../store/hook'
import { setUser } from '../../store/slices/userSession'
import { useState } from 'react'
// importing firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../App'

export default function SignInPage() {
  

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  /* 
  Function that handles an existing account 
*/
  const handleSignIn = () => {
    // prebuilt function from firebase to handle sign in request by taking in email and pass state and auth coming from firebase/auth
    signInWithEmailAndPassword(auth, email, password)
      // takes in the credentials from email and password
      .then((userCredential) => {
        console.log('Signed In')
        // set the user as a variable
        const user = userCredential.user
        dispatch(
          setUser({
            name: user.displayName
          }),
        )
        console.log(user)
      })
      .catch((err) => {
        console.log(err)
        // error message for lack of password characters, email existing, etc...
        Alert.alert(err.message)
      })
  }
  // test function to enter the page without an account
  const signIn = () => {
    if (!isLoading) {
      setIsLoading(true)

      setIsLoading(false)

      dispatch(
        setUser({
          name: 'HenryBenry',
          age: 16,
        }),
      )
    }
  }

  // loading the sign in page
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
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signIn} style={styles.signInButton}>
        <Text style={styles.signInText}>
          {isLoading ? 'loading' : 'Test without user'}
        </Text>
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
