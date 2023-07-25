import React from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "../../../../store/hook";
import StoreWithImage from "cards/Misc/StoreImageCard";
import { vendorStructure } from "../../../../typeDefinitions/interfaces/IVendor/vendorStructure";
import NextCornerVendorHeader from "components/vendors/NextCornerVendorHeader";
import { getUserBusiness } from "../../../../store/slices/BusinessSlice/businessSessionSlice";
const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #827c7c;
  margin-vertical: 10%;
`;

const CreateVendorContainer = styled.TouchableOpacity`
  padding-horizontal: 15%;
  padding-vertical: 5%;
  border: 3px #f2f0f0 solid;
  margin: 5%;
  border-radius: 10px;
`;
const Card = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-content: center;
  border-color: #f2f0f0;
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  overflow: hidden;
  margin-horizontal: 10px;
  margin-bottom: 15px;
  padding-bottom: 7px;
`;
const PromptVendor = styled.View``;

const Vendor = () => {
  const stores = useAppSelector(getUserBusiness);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  console.log("here is stores:", stores)
  const goToVendorDetails = (store: vendorStructure) => {
    navigation.navigate("VendorOptions", { store: store });
  };

  return (
    <Container>
      <NextCornerVendorHeader />

      <PromptVendor></PromptVendor>
      {stores && stores.length > 0 ? (
        <Card onPress={() => goToVendorDetails(stores![0])}>
          <StoreWithImage store={stores![0]} />
        </Card>
      ) : (
        <CreateVendorContainer
          onPress={() => navigation.navigate("VendorCreate")}
        >
          <FontAwesome
            style={{ alignSelf: "center" }}
            name="plus-circle"
            size={125}
            color="#f2f0f0"
          />
          <Title>Create a store</Title>
        </CreateVendorContainer>
      )}
    </Container>
  );
};

export default Vendor;
