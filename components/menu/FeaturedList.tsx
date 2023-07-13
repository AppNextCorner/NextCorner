import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import FeaturedTypeCard from "cards/Menu/FeaturedTypeCard";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";
import { location } from "../../typeDefinitions/interfaces/location.interface";

interface Props {
  menuData: Iitem[] | null;
  vendorName: string;
  location: location | null;
}
const FeaturedList = (props: Props) => {
  const { menuData, vendorName, location } = props;
  // grab all items from the business menu to get the menu items that are featured
  const findFeaturedList = menuData
    ? menuData.filter((item) => item.featured === true)
    : null;

  return (
    <>
      {findFeaturedList ? (
        <>
          <Text style={styles.featuredText}>Featured</Text>
          <FlatList
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").width}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={findFeaturedList}
            style={styles.featuredList}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.featuredCard} key={index.toString()}>
                  <FeaturedTypeCard
                    menuItem={item}
                    vendorName={vendorName}
                    location={location}
                  />
                </View>
              );
            }}
          />
          <View style={styles.margin}></View>
        </>
      ) : (
        <View style={styles.featuredCard}>
          <FeaturedTypeCard
            menuItem={null}
            vendorName={vendorName}
            location={location}
          />
        </View>
      )}
    </>
  );
};

export default FeaturedList;

const styles = StyleSheet.create({
  featuredCard: {},
  margin: {
    backgroundColor: "#f2f3f5",
    //flex: 1,
    paddingVertical: 5,
  },
  featuredText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: "3%",
  },
  featuredList: {
    marginBottom: "5%",
  },
});
