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
import { setUser } from '../../store/userSession'
import { useState } from 'react'
// importing firebase
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase/firebase-config'

export default function SignInPage() {
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // initializing the firebase app and entering the firebase configuration
  const app = initializeApp(firebaseConfig)

  // access the authorization feature from firebase web
  const auth = getAuth(app)

  const handleCreateAccount = () => {
    // creating a new account
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Created user')
        // set a new user and access with it from the credentials from firebase
        const user = userCredential.user
        console.log(user)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        Alert.alert(err.message)
      })
  }
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
            name: user.displayName,
            age: user.lastLoggedIn,
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
      setTimeout(() => {
        setIsLoading(false)

        dispatch(
          setUser({
            name: 'HenryBenry',
            age: 16,
          }),
        )
      }, 2000)
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

      <Text>Email Address</Text>
      <TextInput
        readOnly={false}
        onChangeText={(text) => {
          console.log(email)
          setEmail(text)
        }}
        placeholder="email@gmail.com"
      />

      <TextInput
        readOnly={false}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
      />

      <TouchableOpacity onPress={handleSignIn}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleCreateAccount}>
        <Text style={styles.signInText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={signIn}
        style={{ backgroundColor: 'red', marginTop: 50 }}
      >
        <Text>{isLoading ? 'loading' : 'log in'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  signInText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  signInButton: {
    backgroundColor: '#78DBFF',
    marginTop: '75%',
    padding: '5%',
    justifyContent: 'flex-end',

    borderRadius: 20,
  },
  headerTag: {
    
    margin: '5%',
    

  },
  signInContainer: {
    
    padding: '10%',
    paddingTop: '20%',
    flex: 1,
    backgroundColor: '#fff'
  },
  mainHeader: {
    fontWeight: 'bold',
    marginBottom: '5%',
    fontSize: 25,
    
    
  }
})
