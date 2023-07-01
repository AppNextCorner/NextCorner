import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function reviewsPage() {
  /**
   * Defining navigation for reviews create
   */
  const navigate = useNavigation<NativeStackNavigationProp<any>>();
  const createReviewNav = () => navigate.navigate("ReviewCreate");

  /**
   * Returned component
   */
  return (
    <View>
      <TouchableOpacity
        style={styles.createReviewBtn}
        // ON press go to createReviewpage
        onPress={createReviewNav}
      >
        <Text>Create Review</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  createReviewBtn: {
    marginTop: 60,
  },
});
