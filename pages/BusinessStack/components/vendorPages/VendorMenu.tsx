import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MenuList from "cards/Menu/MenuList";
import FeaturedList from "components/menu/FeaturedList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import FullMenuList from "components/vendors/FullMenuList";
import { useAppSelector } from "../../../../store/hook";
import { getUserBusiness } from "../../../../store/slices/BusinessSlice/businessSessionSlice";
interface RouteParams {
  store?: { store: vendorStructure };
}

const VendorMenu = () => {
  const route = useRoute();

  // vendor is vendorStructure type
  const { store }: RouteParams = route.params as RouteParams;
  console.log("store: ", store!.store.menu);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const navigateToCreate = () => {
    navigation.navigate("VendorMenuCreate", { store });
  };

  const selectedStore: vendorStructure[] | null | undefined= useAppSelector(getUserBusiness);

  if (store?.store !== selectedStore![0]) {
    return (
      <>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <FlatList
            ListFooterComponent={
              <>
                <FullMenuList
                  menu={selectedStore![0].menu}
                  vendor={selectedStore![0]}
                  location={selectedStore![0].location}
                  create={true}
                />
              </>
            }
            ListHeaderComponent={
              <>
                <NextCornerVendorHeader />
                <View>
                  <FeaturedList
                    menuData={selectedStore![0].menu ? selectedStore![0].menu : null}
                    vendorName={selectedStore![0].name}
                    location={selectedStore![0].location}
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
            data={selectedStore![0].itemCategories}
            renderItem={({ item }) => {
              return (
                <>
                  <Text style={styles.category}>{item}</Text>
                  <MenuList
                    category={item}
                    menu={selectedStore![0].menu}
                    vendorName={selectedStore![0].name}
                    location={selectedStore![0].location}
                  />
                  <View style={styles.margin}></View>
                </>
              );
            }}
          />
        </View>
      </>
    );
  }
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          ListFooterComponent={
            <>
              <FullMenuList
                menu={store.store.menu}
                vendor={store.store}
                location={store.store.location}
                create={true}
              />
            </>
          }
          ListHeaderComponent={
            <>
              <NextCornerVendorHeader />
              <View>
                <FeaturedList
                  menuData={store.store.menu ? store.store.menu : null}
                  vendorName={store.store.name}
                  location={store.store.location}
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
          data={store.store.itemCategories}
          renderItem={({ item }) => {
            return (
              <>
                <Text style={styles.category}>{item}</Text>
                <MenuList
                  category={item}
                  menu={store.store.menu}
                  vendorName={store.store.name}
                  location={store.store.location}
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
