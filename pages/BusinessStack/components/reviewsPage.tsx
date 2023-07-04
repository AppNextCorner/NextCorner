import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useFetchReviews from "hooks/api/reviews/useFetchReviews";
import ReviewCard from "components/reviews/ReviewCard";
export default function ReviewsPage() {
  const route = useRoute();
  const { menuItem }: any = route.params;
  const { fetchReviews, reviews, reviewByUser } = useFetchReviews();
  const isLoading = !reviews || !reviewByUser;

  /**
   * Defining navigation for reviews create
   */
  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  /**
   *
   * When navigating to the ReviewsCreate page, pass in the itemId
   */
  const createReviewNav = () =>
    navigate.navigate("ReviewCreate", { itemId: menuItem._id });

  /**
   * Fetch the reviews of the item
   */
  useEffect(() => {
    fetchReviews(menuItem._id.toString());
  }, []);

  return (
    <>
      <View>
        {isLoading ? (
          <Text>Loading...</Text> // Render a loading message
        ) : (
          /**
           * Map through the review
           *
           * review is type ReviewInterface
           *
           */
          reviews.map((review: any, index: number) => {
            /**
             * Get the user by finding the Id of review.user
             * it is type AppUser
             */
            const user = reviewByUser.find(
              (user: any) => user._id === review.user
            );
            // Pass in review and user to the ReviewCard component
            return <ReviewCard review={review} user={user} key={index} />;
          })
        )}
        <TouchableOpacity
          style={styles.createReviewBtn}
          // ON press go to createReviewpage
          onPress={createReviewNav}
        >
          <Text>Create Review</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  createReviewBtn: {
    marginTop: 1,
  },
});
