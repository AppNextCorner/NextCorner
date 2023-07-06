import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import useAddUser from "hooks/handleUsers/useAddUser";
import { auth } from "hooks/handleUsers/useFirebase";
import useGetUserData from "hooks/handleUsers/useGetUserData";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * Creating a new user through a request to our redux slice and login the user after an account has been created
 */
export default function SignUpPage() {
  
  // form data
  const [userData, setUserData] = useState<AppUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
 
  const { makeUser } = useAddUser();

  
  const handlePropertyChange = (property: string, text: string) => {
    setUserData((prevStructure) => ({
      ...prevStructure,
      [property]: text,
    }));
  };
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  // after gaining the input value - check if the form is complete and move them onto a user slice
  const registerUser = async (
   userData: AppUser
  ) => {
    // create a user with async thunk and through our backend, firebase admin will return a user
    const user = await makeUser(userData);
    console.log(userData)
    console.log('here is user: ', user)
    // after creating the user, we could now use the same information passed in to login with
    if (user !== null) {
      signInWithEmailAndPassword(auth, userData.email, userData.password)
        // takes in the credentials from email and password
        .then((_userCredential) => {
          console.log("cred: ",_userCredential)
          navigation.navigate("HomeStack");
        })
        .catch((err) => {
          // error message for lack of password characters, email existing, etc...
          Alert.alert(user.message);
        });
    }
    console.log(user)

    //dispatch(setUser(user));
    return user;
  };

  const goToLoginPage = () => {
    navigation.navigate("Login");
  };

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
        
          onChangeText={(text) => {
            handlePropertyChange('email', text)
          }}
          placeholder="email@gmail.com"
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.textInput}
          
          onChangeText={(text) => handlePropertyChange('password', text)}
          value={userData.password}
          placeholder="password"
        />
        {/* Name container */}
        <View style={styles.userNameContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.inputText}>First Name</Text>
            <TextInput
              style={styles.nameInput}
              
              onChangeText={(text) => handlePropertyChange('firstName', text)}
              value={userData.firstName}
              placeholder="Joe"
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.inputText}>Last Name</Text>
            <TextInput
              style={styles.nameInput}
              
              onChangeText={(text) => handlePropertyChange('lastName', text)}
              value={userData.lastName}
              placeholder="bobaguard"
            />
          </View>
        </View>
        {/* Phone Number Container */}
        <Text style={styles.inputText}>Phone Number</Text>
        <TextInput
          style={styles.textInput}
          
          onChangeText={(text) => handlePropertyChange('phoneNumber', text)}
          value={userData.phoneNumber}
          // Splice the dashes later
          placeholder="123-123-1234"
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          registerUser(userData)
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
  );
}

const styles = StyleSheet.create({
  nameInput: {
    width: 150,
    padding: "5%",

    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15,
    borderColor: "#F0F0F0",
  },
  nameContainer: {
    flexDirection: "column",
    margin: "2%",
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // login button
  loginAccountText: {
    color: "#78DBFF",
  },
  loginAccountButton: {
    margin: "5%",
  },
  inputText: {
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: "15%",
  },
  textInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 15,
    borderColor: "#F0F0F0",
    padding: "5%",
    marginVertical: "3%",
  },
  bottom: {
    flex: 1,
    marginBottom: 36,
  },
  signInText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  signInButton: {
    backgroundColor: "#78DBFF",
    padding: "5%",
    borderRadius: 20,
    marginTop: "5%",
  },
  headerTag: {
    margin: "5%",
  },
  signInContainer: {
    padding: "10%",
    paddingTop: "20%",
    flex: 1,

    backgroundColor: "white",
  },
  mainHeader: {
    fontWeight: "bold",
    marginBottom: "5%",
    fontSize: 25,
  },
});