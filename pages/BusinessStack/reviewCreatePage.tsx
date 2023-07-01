import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function reviewCreatePage() {
  const navigate = useNavigation();

  const cancel = () => navigate.goBack();

  return (
    <View>
      <Text style={styles.title}>reviewsPage</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => {
          console.log(val);
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyles} onPress={cancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyles}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    textAlign: "center",
  },
  textInput: {
    alignSelf: "center",
    height: 244,
    width: 328,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 5,
  },
  buttonContainer: {
    display: "flex",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  buttonStyles: {
    marginHorizontal: 20,
  },
});

//  Add a style for a horizontal flex container?
