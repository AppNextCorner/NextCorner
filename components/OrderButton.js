
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const OrderButton = () => {
    const navigation = useNavigation();
    const goToCartButton = () => {
        navigation.navigate('Cart');
    }
    
    return (
       <View style={{backgroundColor: 'white'}}>
            <TouchableOpacity
         style={styles.orderButton}
         onPress={goToCartButton}
         >
          <Text style={styles.orderButtonText}>View Cart</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    orderButton: {
        backgroundColor: '#78DBFF',
        margin: 15,
        padding: 15,
        borderRadius: 20,
      },
      orderButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
      },
})

export default OrderButton;
