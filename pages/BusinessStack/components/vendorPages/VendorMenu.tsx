import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MenuList from "cards/Menu/MenuList";
import FeaturedList from "components/menu/FeaturedList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
interface RouteParams {
  store?: vendorStructure;
}

const VendorMenu = () => {
  const route = useRoute();

  // vendor is vendorStructure type
  const { store }: RouteParams = route.params as RouteParams;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const navigateToCreate = () => {
    navigation.navigate('VendorMenuCreate', {store})
  }
  if (!store) {
    return null;
  }
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          ListHeaderComponent={
            <>
              <NextCornerVendorHeader />
              <View>
                <FeaturedList
                  menuData={store.menu ? store.menu : null}
                  vendorName={store.name}
                  location={store.location}
                />
              </View>

              {/* ALL menu items located here */}
              <View style={styles.marginSet}>
                <Text style={styles.titleOfMenu}>Full Menu</Text>
                <FontAwesome
                  onPress={navigateToCreate}
                  style={styles.icon}
                  name="plus-circle"
                  size={40}
                  color="#f2f0f0"
                />
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // pass in the menu list coming from the route.params of the vendor items which we can access through params
          data={store.itemCategories}
          renderItem={({ item }) => {
            return (
              <>
                <Text style={styles.category}>{item}</Text>
                <MenuList
                  category={item}
                  menu={store.menu}
                  vendorName={store.name}
                  location={store.location}
                />
                <View style={styles.margin}></View>
              </>
            );
          }}
        />
      </View>
    </>
  );
};

export default VendorMenu;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  margin: {
    backgroundColor: "#f2f3f5",
    //flex: 1,
    paddingVertical: 5,
  },
  category: {
    margin: "3%",
    marginTop: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  goBackButton: {
    zIndex: 2,
    margin: 20,
    marginTop: 40,
    borderRadius: 20,
    padding: "2%",
    width: "15%",
    backgroundColor: "#78DBFF",
  },
  marginSet: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
    flexDirection: "row",
    alignItems: "center",
  },
  titleOfMenu: {
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
    marginLeft: "3%",
    marginVertical: 10,
  },
  icon: {
    flex: 0.2,
  },
});
