import React from "react";
const HomeIcon = require("assets/logo.png");
import { AntDesign } from "@expo/vector-icons";
import styled from "@emotion/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const GoBackButton = styled.Pressable`
  border-radius: 20px;
  padding: 2%;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5%;
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

const NextCornerVendorHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const goHome = async () => {
    try {
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeaderContainer>
      <GoBackButton onPress={goHome}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </GoBackButton>
      <HeaderLogoImage source={HomeIcon} />
      <HeaderTitle>Next Corner Vendors</HeaderTitle>
    </HeaderContainer>
  );
};

export default NextCornerVendorHeader;
