import * as React from "react";
import {Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import Header from "../../components/Header";
import HorizontalScrollViewFilter from "../../components/HorizontalScrollViewFilter";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "../components/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

function VoucherScreen() {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Voucher!</Text>
        </View>
    );
}

function LocationScreen() {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Location!</Text>
        </View>
    );
}


const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <>
            <Header/>
            <HorizontalScrollViewFilter mt="10"/>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = focused ? (
                                <Ionicons name="ios-home" size={24} color="tomato"/>
                            ) : (
                                <Ionicons name="ios-home-outline" size={24} color="black"/>
                            );
                        } else if (route.name === "Vouchers") {
                            iconName = focused ? (
                                <Ionicons name="receipt" size={24} color="tomato"/>
                            ) : (
                                <Ionicons name="receipt-outline" size={24} color="black"/>
                            );
                        } else if (route.name === "Locations") {
                            iconName = focused ? (
                                <Ionicons name="location" size={24} color="tomato"/>
                            ) : (
                                <Ionicons name="location-outline" size={24} color="black"/>
                            );
                        } else if (route.name === "Profile") {
                            iconName = focused ? (
                                <Ionicons name="person" size={24} color="tomato"/>
                            ) : (
                                <Ionicons
                                    name="person-circle-outline"
                                    size={24}
                                    color="black"
                                />
                            );
                        }
                        return iconName;
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Vouchers" component={VoucherScreen}/>
                <Tab.Screen name="Locations" component={LocationScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
            </Tab.Navigator>
        </>
    );
}
