import React from 'react';
import { StyleSheet } from 'react-native';

import Card from './Card.component';
import CustomText from './CustomText.component';

import Colors from '../../constants/colors';

const Logo = ({ containerStyle, textStyle }) => {
    return (
        <Card style={{ ...styles.container, ...containerStyle }}>
            <CustomText style={{ ...styles.text, ...textStyle }}>2048</CustomText>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.tile2048,
    },
    text: {
        color: 'white',
    },
});

export default Logo;
