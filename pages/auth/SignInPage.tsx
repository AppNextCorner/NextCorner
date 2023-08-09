/**
 * Purpose of file: Currently has basic firebase functionality for authentication
 * Note: It still requires "forgot password" functionality and styling for the page
 */

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
const logo = require("../../assets/logo.png");
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAvoidingView } from "react-native";
import { keyboardVerticalOffset } from "../../helpers/keyboardOffset";
import authHandlers from "hooks/handleUsers/handleUserAuth";
/**
 * Used to authenticate an existing user with firebase authentication methods
 */
export default function SignInPage() {
  const { handleAuth } = authHandlers();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleChooser, setRoleChooser] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  /* 
  Function that handles an existing account 
*/
  // "/auth/getUser"

  const goToSignUp = () => {
    navigation.navigate("Register");
  };

  // loading the sign in page
  return (
    <KeyboardAvoidingView
      style={styles.signInContainer}
      enabled
      behavior={Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset(-225, 0)}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>

        <View style={styles.headerTag}>
          <Text style={styles.mainHeader}>Welcome Back</Text>
          <Text style={styles.subHeader}>Sign in to your account</Text>
        </View>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            onPress={() => setRoleChooser(false)}
            style={styles.roleButton}
          >
            <Text
              style={[
                styles.roleText,
                {
                  color: !roleChooser ? "#78DBFF" : "#979797",
                  textDecorationLine: !roleChooser ? "underline" : "none",
                },
              ]}
            >
              Consumer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRoleChooser(true)}
            style={styles.roleButton}
          >
            <Text
              style={[
                styles.roleText,
                {
                  color: roleChooser ? "#78DBFF" : "#979797",
                  textDecorationLine: roleChooser ? "underline" : "none",
                },
              ]}
            >
              Vendor
            </Text>
          </TouchableOpacity>
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

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => handleAuth("/auth/getUser", {email, password}, roleChooser, ["password", "email"])}
        >
          <Text style={styles.signInText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={goToSignUp}
        >
          <Text style={styles.createAccountText}>Create an Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  roleButton: { padding: "5%", marginHorizontal: "7.5%" },
  roleText: { fontSize: 16 },
  roleContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  subHeader: {
    textAlign: "center",
  },
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
