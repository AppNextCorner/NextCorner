import { useNavigation } from '@react-navigation/native'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native'
import useAddUser from '@hooks/handleUsers/useAddUser'
import { useAppDispatch } from '../../store/hook'
import {
  getUsers,
  setUser,
} from '../../store/slices/userSession'
import { auth } from '../../App'

/**
 * Creating a new user through a request to our redux slice and login the user after an account has been created
 */
export default function SignUpPage() {
  // form data
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /**
   * Backend structure:
   * firstName: {type: String, required: true},
    firstLast: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
   */
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const { makeUser } = useAddUser()

  const dispatch = useAppDispatch()

  // after gaining the input value - check if the form is complete and move them onto a user slice
  const registerUser = async (
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  ) => {
    // create a user with async thunk and through our backend, firebase admin will return a user
    const user = await makeUser({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    })
    // after creating the user, we could now use the same information passed in to login with
    if (user !== null) {
      signInWithEmailAndPassword(auth, email, password)
        // takes in the credentials from email and password
        .then((userCredential) => {
          console.log('Signed In')
          // set the user as a variable
          const user = userCredential.user
          const {payload}= dispatch(getUsers());
          dispatch(setUser(payload));
          navigation.navigate('Home');
          console.log("user from signing in:",user)
        })
        .catch((err) => {
          console.log(err)
          // error message for lack of password characters, email existing, etc...
          Alert.alert(err.message)
        })
    }

    //dispatch(setUser(user));
    return user
  }

  const navigation = useNavigation()

  const goToLoginPage = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.signInContainer}>
      <View style={styles.headerTag}>
        <Text style={styles.mainHeader}>Create an account</Text>
        <Text>
          Welcome friend, enter your details to get started in ordering food
        </Text>
      </View>
      {/* Email and Password input - still needs to add confirm password feature */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          readOnly={false}
          onChangeText={(text) => {
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
        {/* Name container */}
        <View style={styles.userNameContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.inputText}>First Name</Text>
            <TextInput
              style={styles.nameInput}
              readOnly={false}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="Joe"
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.inputText}>Last Name</Text>
            <TextInput
              style={styles.nameInput}
              readOnly={false}
              onChangeText={setLastName}
              value={lastName}
              placeholder="bobaguard"
            />
          </View>
        </View>
        {/* Phone Number Container */}
        <Text style={styles.inputText}>Phone Number</Text>
        <TextInput
          style={styles.textInput}
          readOnly={false}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          // Splice the dashes later
          placeholder="123-123-1234"
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          registerUser(firstName, lastName, email, password, phoneNumber)
        }
        style={styles.signInButton}
      >
        <Text style={styles.signInText}>Register</Text>
      </TouchableOpacity>
      {/* Navigate to login page through this text button */}
      <TouchableOpacity
        onPress={() => goToLoginPage()}
        style={styles.loginAccountButton}
      >
        <Text style={styles.loginAccountText}>Have an account? Login Here</Text>
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
  nameInput: {
    width: 150,
    padding: '5%',

    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
    borderColor: '#F0F0F0',
  },
  nameContainer: {
    flexDirection: 'column',
    margin: '2%',
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // login button
  loginAccountText: {
    color: '#78DBFF',
  },
  loginAccountButton: {
    margin: '5%',
  },
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
