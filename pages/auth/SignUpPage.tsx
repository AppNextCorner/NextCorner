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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import useAddUser from "hooks/handleUsers/useAddUser";
import { auth } from "hooks/handleUsers/useFirebase";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { toggleButton } from "../../styles/components/toggleStyles";
import { keyboardVerticalOffset } from "../../helpers/keyboardOffset";
import authHandlers from "hooks/handleUsers/handleUserAuth";
/**
 * Creating a new user through a request to our redux slice and login the user after an account has been created
 */
export default function SignUpPage() {
  const {handleAuth} = authHandlers();
  const [userData, setUserData] = useState<AppUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user",
  });
  const [roleChooser, setRoleChooser] = useState(true);

  const handlePropertyChange = (property: string, text: string) => {
    setUserData((prevStructure) => ({
      ...prevStructure,
      [property]: text,
    }));
  };
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const goToLoginPage = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      
      
      style={styles.signInContainer}
      enabled
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset(-110, 0)}
    >
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
        <View style={styles.headerTag}>
          <Text style={styles.mainHeader}>Create an account</Text>
          <Text>
            Welcome friend, enter your details to get started in ordering food
          </Text>
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
              handlePropertyChange("email", text);
            }}
            placeholder="email@gmail.com"
          />
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => handlePropertyChange("password", text)}
            value={userData.password}
            placeholder="password"
          />
          {/* Name container */}
          <View style={styles.userNameContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.inputText}>First Name</Text>
              <TextInput
                style={styles.nameInput}
                onChangeText={(text) => handlePropertyChange("firstName", text)}
                value={userData.firstName}
                placeholder="Joe"
              />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.inputText}>Last Name</Text>
              <TextInput
                style={styles.nameInput}
                onChangeText={(text) => handlePropertyChange("lastName", text)}
                value={userData.lastName}
                placeholder="bobaguard"
              />
            </View>
          </View>
          {/* Phone Number Container */}
          <Text style={styles.inputText}>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => handlePropertyChange("phoneNumber", text)}
            value={userData.phoneNumber}
            // Splice the dashes laterc
            placeholder="123-123-1234"
          />
        </View>

        <TouchableOpacity
          onPress={() =>
          handleAuth('/auth/signup', userData, roleChooser, ["firstName", "lastName", "email", "password", "phoneNumber", "role"])}
          //    {
          //   registerUser(userData);
          //   console.log("here is role", userData.role);
          // }}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}>Register</Text>
        </TouchableOpacity>
        {/* Navigate to login page through this text button */}
        <TouchableOpacity
          onPress={() => goToLoginPage()}
          style={styles.loginAccountButton}
        >
          <Text style={styles.loginAccountText}>
            Have an account? Login Here
          </Text>
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
  toggle: { flexDirection: "row", alignItems: "center" },
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
