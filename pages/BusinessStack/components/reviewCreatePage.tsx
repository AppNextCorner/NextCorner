import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../store/hook";
import { getUser } from "../../../store/slices/userSession";

export default function reviewCreatePage() {
  const [reviewComment, setReviewComment] = useState<string>("");

  const navigate = useNavigation();
  const cancel = () => navigate.goBack();

  const user = useAppSelector(getUser());

  return (
    <View>
      <Text style={styles.title}>reviewsPage</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => {
          setReviewComment(val);
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
