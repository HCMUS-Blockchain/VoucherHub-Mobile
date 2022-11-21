import {Image, ScrollView, View} from "native-base";
import {StyleSheet} from "react-native";
import Loader from "../components/Loader";
import {Caption, Text, Title, TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {SignOut} from "../api/user";
import React from "react";
import {useLogin} from "../context/LoginProvider";

const ProfileScreen = () => {
    const {profile,setIsLogin,isPending,setIsPending} = useLogin()
    return (
        <ScrollView style={styles.containerScroll}>
            <Loader loading={isPending} />
            <View style={styles.container}>
                <Image alt="img" source={require("../assets/img/background-upro.jpg")} style={styles.bgImage}/>
                <View style={styles.bottomContainer}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Image style={styles.profile}
                                       alt="profile"
                                       source={{uri: profile?.avatar}}>
                                </Image>
                            </View>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Title style={[styles.title, {
                                    marginTop: -15,
                                    marginBottom: 5,
                                }]}>{profile.fullName}</Title>
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
                            <Text style={{color: "#777777", marginLeft: 20}}>{profile.email}</Text>
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
                        <TouchableRipple onPress={async () => {
                            setIsPending(true)
                            const isLoggedOut = await SignOut()
                            if (isLoggedOut) {
                                setIsLogin(false)
                            }
                            setIsPending(false)
                        }}>
                            <View style={styles.menuItem}>
                                <Icon name="logout-variant" color="#FF6347" size={25}/>
                                <Text style={styles.menuItemText}>Log out</Text>
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
            </View>

        </ScrollView>
    );
}
export default ProfileScreen
const styles = StyleSheet.create({
    containerScroll: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 15,
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage:{
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    bottomContainer:{
        marginTop: "40%",
        backgroundColor: "#fff",
        borderTopStartRadius: 50,
    },
    profile:{
        height: 120,
        width: 120,
        borderRadius:5,
        bottom: "30%",
    }
})
