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
import { getUser } from "../../../store/slices/userSessionSlice";
import { reviewInterface } from "../../../typeDefinitions/interfaces/reviews.interface";
import AppUser from "../../../typeDefinitions/interfaces/user.interface";
import useCreateReview from "hooks/api/reviews/useCreateReview";
import { useRoute } from "@react-navigation/native";
export default function ReviewCreatePage() {

  const route = useRoute();
  // Obtain user with selector
  const user: AppUser = useAppSelector(getUser)!;

  const { writeReview } = useCreateReview();

  // A state for reviewComments and setReviewComments
  const [reviewComment, setReviewComment] = useState<string>("");
  // A state for reviewRatings and setReviewRatings
  const [reviewRating, setReviewRating] = useState<number>(0);


  /**
   * Navigations
   */
  const navigate = useNavigation();
  const cancel = () => navigate.goBack();

  // Obtain route params
  const { itemId }: any = route.params;

  // Accumulation of reviewdata
  const reviewData: reviewInterface = {
    review: reviewComment,
    rating: reviewRating,
    user,
    idOfItem: itemId,
  };
  return (
    <View>
      <Text style={styles.title}>reviewsPage</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => {
          setReviewComment(val);
        }}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => {
          setReviewRating(parseInt(val));
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyles} onPress={cancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyles}
          // Send review data to the backend
          onPress={() => writeReview(reviewData)}
        >
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
