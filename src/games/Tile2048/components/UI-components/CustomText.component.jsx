import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ style, children }) => {
    return <Text style={{ ...style }}>{children}</Text>;
};


export default CustomText;
