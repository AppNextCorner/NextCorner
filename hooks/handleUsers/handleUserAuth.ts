import { signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import { auth } from "./useFirebase";
import { makePostRequest } from "../../config/axios.config";
import AppUser from "../../typeDefinitions/interfaces/user.interface";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { checkForRequiredFields } from "../../helpers/checkForFields";

const authHandlers = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleAuth = async (
    url: string,
    userData: any,
    roleChooser: boolean,
    requiredAuthFields?: string[]
  ) => {
    console.log("user data", userData);
    const requiredFields = checkForRequiredFields(
      requiredAuthFields!,
      userData
    );
    if (requiredFields !== null) {
      Alert.alert("required fields", requiredFields);
      return;
    }
    const lambda = async (userData: any): Promise<AppUser> => {
      const response = await makePostRequest(url, userData)
        .then((response) => {
          return response.data.payload;
        })
        .catch((error) => {
          return error.response.data.message;
        });
      return response;
    };
    let user: AppUser = await lambda(userData);
    console.log("here is user: " + JSON.stringify(user));

    // Check for either the password or the email to be incorrect
    if (
      user === null ||
      user.password !== userData.password ||
      user.email !== userData.email
    ) {
      Alert.alert((user === null ? user : "Invalid credentials") as string);
      return;
    }

    // prebuilt function from firebase to handle sign in request by taking in email and pass state and auth coming from firebase/auth
    signInWithEmailAndPassword(auth, user.email, user.password) // firebase auth that requires password, email, and the auth status of the user
      // takes in the credentials from email and password
      .then(async (userCredential) => {
        console.log("user creds");
        console.log(userCredential.user);
        const userFirebase = userCredential.user;
        updateCurrentUser(auth, userFirebase);

        console.log("here is user: ", user);
        const routeStack = roleChooser === false ? "HomeStack" : "Vendor";
        const route = roleChooser === false ? "Home" : "Vendors";
        navigation.navigate(routeStack, { screen: route });
      })
      .catch((err) => {
        console.log(err);
        // error message for lack of password characters, email existing, etc...
        Alert.alert(err.message);
      });
  };

  return {
    handleAuth,
  };
};

export default authHandlers;
