import React from 'react';
import { View, Text } from 'react-native';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const VendorMore = () => {
  return (
    <Container>
      <Title>VendorMore</Title>
    </Container>
  );
};

export default VendorMore;
