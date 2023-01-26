import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

const useOrderButton = () => {
    const [order, setOrder] = useState(false);

    return {
        order,
        setOrder,
    }
}


export default useOrderButton;
