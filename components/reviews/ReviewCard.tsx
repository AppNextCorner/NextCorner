import { View, Text, StyleSheet } from "react-native";

/**
 * A card for displaying the reviews
 *
 * @param review: The review contents, TYPE IS REVIEW
 * @param user: The user who made the review. TYPE IS APPUSER
 * @returns
 */
const ReviewCard = ({ review, user }: { review: any; user: any }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.userName}>
        {user.firstName} {user.lastName}
      </Text>
      <Text style={styles.rating}>Rating : {review.rating}</Text>
      <Text style={styles.reviewText}>{review.review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 12,
  },
});

export default ReviewCard;
