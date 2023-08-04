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
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { getUserBusiness } from "../../../../store/slices/BusinessSlice/businessSessionSlice";
import { setModel } from "../../../../store/slices/BusinessSlice/menuCreateSlice";
import { getUser } from "../../../../store/slices/userSessionSlice";

const VendorMenu = () => {

  const dispatch: any = useAppDispatch();
  const stores= useAppSelector(getUserBusiness);
  const storeOwner = useAppSelector(getUser);
  const store = stores![0]
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const navigateToCreate = () => {
    // Reset the model and create a state
    // TODO: Create an app selector next page to edit each item and array
    dispatch(
      setModel({
        name: "",
        time: {
          minutes: 0,
          seconds: 0,
        },
        image: "",
        price: 0,
        description: "",
        customizations: [],
        category: "",
        featured: false,
        amountInCart: 1,
        rating: 0,
        storeInfo: {
          storeName: store!.name,
          storeId: store!.id,
          storeOwner: storeOwner?._id
        },
      })
    );
    navigation.navigate("VendorMenuCreate", { store });
  };
  // This function is called when the store is updated
  const selectedStore: vendorStructure[] | null | undefined =
    useAppSelector(getUserBusiness);

  let storeInfo = store!
  if (storeInfo !== selectedStore![0]) {
    storeInfo = selectedStore![0];
  }
  console.log('store info: ', storeInfo)
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          ListFooterComponent={
            <>
              <FullMenuList
                menu={storeInfo.menu}
                vendor={storeInfo}
                location={storeInfo.location}
                create={true}
              />
            </>
          }
          ListHeaderComponent={
            <>
              <NextCornerVendorHeader />
              <View>
                <FeaturedList
                  menuData={storeInfo.menu ? storeInfo.menu : null}
                  vendorName={storeInfo.name}
                  location={storeInfo.location}
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
          data={storeInfo.itemCategories}
          renderItem={({ item }) => {
            return (
              <>
                <Text style={styles.category}>{item}</Text>
                <MenuList
                  category={item}
                  menu={storeInfo.menu}
                  vendor={null}
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
