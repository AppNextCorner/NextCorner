import React from "react";
import styled from "@emotion/native";
import { ListRenderItem, ListRenderItemInfo } from "react-native";
import { button } from "../../../../typeDefinitions/interfaces/IComponents/IVendor/button.interface";
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import { useNavigation, useRoute } from "@react-navigation/native";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getUserBusiness } from "../../../../store/slices/BusinessSlice/businessSessionSlice";
import { useAppSelector } from "../../../../store/hook";
const Container = styled.View`
  flex: 1;

  justify-content: center;
  background-color: #fff;
`;

const Button = styled.TouchableOpacity`
  padding: 2%;
  padding-horizontal: 10%;
  margin: 2%;
  border-color: #f2f0f0;
  border-width: 2px;
  border-radius: 5px;
`;

const ButtonList = styled.FlatList``;

const ButtonContent = styled.Text``;

interface RouteParams {
  store: { store: vendorStructure };
}

const VendorOptions = () => {
  const stores = useAppSelector(getUserBusiness);
  // Hooks
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  // const { store }: RouteParams = route.params as RouteParams;
  const store = stores![0]
  const buttons = [
    {
      name: "My Menu",
      navigate: "VendorMenu",
      data: { store },
    },
    {
      name: "Incoming Orders",
      navigate: "VendorIncomingOrders",
      data: { store },
    }
  ];
  const renderItem = ({ item }: ListRenderItemInfo<button>) => (
    <Button  onPress={() => navigation.navigate(item.navigate, {store: item.data})}>
      <ButtonContent>{item.name}</ButtonContent>
    </Button>
  );

  return (
    <Container>
      <NextCornerVendorHeader />
      <ButtonList
        data={buttons}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem as ListRenderItem<unknown>}
      />
    </Container>
  );
};

export default VendorOptions;
