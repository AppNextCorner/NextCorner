// Purpose: Used to display the order that was previously ordered from the same business order and filtered from the Menu Page
import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PreviousOrderCard from "cards/Menu/PreviousOrderCard";
import { Iitem } from "../../typeDefinitions/interfaces/item.interface";

interface Props {
  vendorName: string;
  listData: any;
  location: any;
  menuData?: Iitem[];
}
const PreviousOrdersComponent = (props: Props) => {
  const { vendorName, listData, location } = props;
  return (
    <View>
      {listData.length > 0 ? (
        <>
          <Text style={styles.featuredText}>
            Order your favorite items again
          </Text>
          <FlatList
            decelerationRate={0}
            snapToInterval={200} //your element width
            snapToAlignment={"start"}
            data={listData}
            horizontal={true}
            keyExtractor={(_item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PreviousOrderCard
                previousOrders={item}
                vendorName={vendorName}
                key={index}
              />
            )}
          />
          <View style={styles.margin}></View>
        </>
      ) : null}
    </View>
  );
};

export default PreviousOrdersComponent;

const styles = StyleSheet.create({
  margin: {
    backgroundColor: "#f2f3f5",
    //flex: 1,
    paddingVertical: 5,
  },
  featuredText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: "3%",
  },
});
