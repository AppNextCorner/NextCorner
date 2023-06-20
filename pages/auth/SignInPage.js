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
import logo from "@assets/logo.png";
import { useAppDispatch } from "../../store/hook";
import { getUsers, setUser } from "../../store/slices/userSession";
import { useState } from "react";
import { auth } from "../../App";
// importing firebase
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

/**
 * Used to authenticate an existing user with firebase authentication methods
 */
export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  /* 
  Function that handles an existing account 
*/
  const handleSignIn = async () => {
    // prebuilt function from firebase to handle sign in request by taking in email and pass state and auth coming from firebase/auth
    signInWithEmailAndPassword(auth, email, password) // firebase auth that requires password, email, and the auth status of the user
      // takes in the credentials from email and password
      .then((userCredential) => {
        // set the user as a variable containing the information of the user
        const user = userCredential.user;

        const { payload } = dispatch(getUsers());
        dispatch(setUser(payload));
        navigation.navigate("Home");
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
          readOnly={false}
          onChangeText={(text) => {
            setEmail(text);
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
