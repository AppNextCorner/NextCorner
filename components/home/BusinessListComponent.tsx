import { StyleSheet, View, Text, FlatList } from "react-native";
import React from "react";
import BusinessCard from "cards/Home/BusinessCard";
import { vendorStructure } from "../../typeDefinitions/interfaces/IVendor/vendorStructure";
import useCategoryList from "hooks/handlePages/useCategoryList";
interface Props {
  title: string;
  business: vendorStructure[];
  styles?: any;
}

const BusinessListComponent = React.memo((props: Props) => {
  const { checkForStyleChange } = useCategoryList();
  // console.log("BLC:", props.business);
  if (props.business.length > 1) {
    return (
      <View>
        <Text style={styles.title}>{props.title}</Text>

        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={props.business}
          keyExtractor={(_item, index) => index.toString()} // Assuming 'id' is a unique identifier property
          renderItem={({ item }) => (
            <BusinessCard
              create={false}
              businessItem={item}
              checkForStyleChange={!checkForStyleChange}
            />

          )}
        />
        <View style={styles.margin}></View>
      </View>
    );
  } else {
    return null;
  }
});

export default BusinessListComponent;

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  margin: {
    backgroundColor: "#f2f3f5",
    flex: 1,
    paddingVertical: 5,
  },
});
