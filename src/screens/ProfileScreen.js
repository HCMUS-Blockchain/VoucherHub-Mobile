import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from "native-base";

function ProfileScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'column', marginTop: 15}}>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Avatar.Image
                            source={{
                                uri: 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.18169-9/18882161_1826356687682036_2261045024222387600_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=iRZE2nZR090AX9ve0GQ&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBg4dYYV2Sa2Ev3QFgOUwxN9DlFOJjYTAYDM0PusqQNNQ&oe=639D371D',
                            }}
                            size={80}
                        />
                    </View>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Le Thanh Ngoc</Title>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>Kolkata, India</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>+91-900000009</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20}/>
                    <Text style={{color: "#777777", marginLeft: 20}}>john_doe@email.com</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title>₹140.50</Title>
                    <Caption>Wallet</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Orders</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="heart-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Your Favorites</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Tell Your Friends</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="cookie-settings-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                }}>
                    <View style={styles.menuItem}>
                        <Icon name="logout-variant" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Log out</Text>
                    </View>
                </TouchableRipple>
            </View>
        </ScrollView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});