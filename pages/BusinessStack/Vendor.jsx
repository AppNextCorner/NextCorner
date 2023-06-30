import React from "react";
const HomeIcon = require("assets/logo.png");
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #827c7c;
  marginvertical: 10%;
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

const LogoImage = styled.Image`
  width: 25px;
  height: 25px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10%;
  margintop: 10%;
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
const CreateVendorContainer = styled.View`
  paddinghorizontal: 15%;
  paddingvertical: 5%;
  border: 3px #f2f0f0 solid;
  margin: 5%;
  borderradius: 10px;
`;

const Vendor = () => {
  const navigation = useNavigation();

  const goToUser = () => {
    navigation.navigate("Profile");
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderLogoImage source={HomeIcon} />
        <HeaderTitle>Next Corner Vendors</HeaderTitle>
      </HeaderContainer>
      <CreateVendorContainer>
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
