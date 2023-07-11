import React from "react";
const HomeIcon = require("assets/logo.png");
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "../../../store/hook";
import { getBusinesses } from "../../../store/slices/BusinessSlice/businessSessionSlice";

const Container = styled.View`
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

const Button = styled.Pressable`
  background-color: red;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10%;
  margin-top: 10%;
`;

const HeaderLogoImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const HeaderTitle = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  font-weight: bold;
`;
const CreateVendorContainer = styled.TouchableOpacity`
  padding-horizontal: 15%;
  padding-vertical: 5%;
  border: 3px #f2f0f0 solid;
  margin: 5%;
  borderradius: 10px;
`;
const PromptVendor = styled.View`

`


const Vendor = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goToUser = () => {
    navigation.navigate("Profile");
  };
  const vendors = useAppSelector(getBusinesses)

  return (
    <Container>
      <HeaderContainer>
        <HeaderLogoImage source={HomeIcon} />
        <HeaderTitle>Next Corner Vendors</HeaderTitle>
      </HeaderContainer>
      
      <PromptVendor>

      </PromptVendor>
      
      <CreateVendorContainer onPress={() => navigation.navigate("VendorCreate")}>
        <FontAwesome
          style={{ alignSelf: "center" }}
          name="plus-circle"
          size={125}
          color="#f2f0f0"
        />
        <Title>Create a store</Title>
      </CreateVendorContainer>
      <Button onPress={goToUser}>
        <ButtonText>User Portal</ButtonText>
      </Button>
    </Container>
  );
};

export default Vendor;
