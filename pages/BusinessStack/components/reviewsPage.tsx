import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useFetchReviews from "hooks/api/reviews/useFetchReviews";
import ReviewCard from "components/reviews/ReviewCard";
import { Iitem } from "../../../typeDefinitions/interfaces/item.interface";
import { vendorStructure } from "../../../typeDefinitions/interfaces/IVendor/vendorStructure";

interface IParams {
  vendorItem: Iitem;
  business: vendorStructure;
}

export default function ReviewsPage() {
  const route = useRoute();
  const { vendorItem }: IParams = route.params as IParams;
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
    navigate.navigate("ReviewCreate", { itemId: vendorItem._id });

  /**
   * Fetch the reviews of the item
   */
  useEffect(() => {
    fetchReviews(vendorItem._id!.toString());
  }, []);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <>
      <View style={styles.page}>
        {isLoading ? (
          <Text>Loading...</Text> // Render a loading message
        ) : (
          <View style={styles.reviewContainer}>
          <FlatList
            data={reviews}
            renderItem={({ item, index }) => {
              /**
               * Get the user by finding the Id of review.user
               * it is type AppUser
               */
              const user = reviewByUser.find(
                (user: any) => user._id === item.user
              );
              return <ReviewCard review={item} user={user} key={index} />;
            }}
          />
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.createReviewBtn}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
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
  reviewContainer: {height: '75%', backgroundColor: '#fff'},
  createReviewBtn: {
    marginTop: "20%",
  },
  page: {flex: 1, backgroundColor: '#fff'},
});
