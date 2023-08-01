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
  Image,
} from "react-native";
const logo = require("../../assets/logo.png");
import { useState } from "react";
import { auth } from "hooks/handleUsers/useFirebase";
// importing firebase
import { signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

import { makePostRequest } from "../../config/axios.config";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
/**
 * Used to authenticate an existing user with firebase authentication methods
 */
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  /* 
  Function that handles an existing account 
*/
  const handleSignIn = async () => {
    // prebuilt function from firebase to handle sign in request by taking in email and pass state and auth coming from firebase/auth
    signInWithEmailAndPassword(auth, email, password) // firebase auth that requires password, email, and the auth status of the user
      // takes in the credentials from email and password
      .then(async (userCredential) => {
        console.log('user creds')
        console.log(userCredential.user);
        // const userFirebase = await userCredential.user
        // updateCurrentUser(auth, userFirebase)
        // const lambda = async (email: string): Promise<AppUser> => {
        //   const url = "/auth/getUser";
        //   const response = await makePostRequest(url, { email });
        //   return response.data;
        // };
        // const user: AppUser = await lambda(email);
        // console.log("here is user: ", user);
        // const routeStack = user.role === "user" ? "HomeStack" : "Vendors";
        // const route = user.role === "user" ? "Home" : "Vendors";
        // navigation.navigate(routeStack, {screen: route});
        navigation.navigate("HomeStack", {screen: "Home"})
      })
      .catch((err) => {
        console.log(err);
        // error message for lack of password characters, email existing, etc...
        Alert.alert(err.message);
      });
    
  };
  const goToSignUp = () => {
    navigation.navigate("Register");
  };

  // loading the sign in page
  return (
    <View style={styles.signInContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
      </View>

      <View style={styles.headerTag}>
        <Text style={styles.mainHeader}>Login to your account</Text>
      </View>
      {/* Email and Password input - still needs to add confirm password feature */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="email@gmail.com"
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
        />
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createAccountButton} onPress={goToSignUp}>
        <Text style={styles.createAccountText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 112,
    height: 112,
  },
  createAccountText: {
    color: "#78DBFF",
  },
  createAccountButton: {
    margin: "5%",
  },
  inputText: {
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: "10%",
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
    fontSize: 18,
    fontWeight: "bold",
  },
  signInButton: {
    backgroundColor: "#78DBFF",
    padding: "4%",
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

    backgroundColor: "#fff",
    // #454747
  },
  mainHeader: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
});
