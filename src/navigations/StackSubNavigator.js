import BottomNavs from "./BottomNav";
import DetailScreen from "../screens/DetailScreen";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DrStrangeGame from "../games/DrStrangeGame";
import ReceiveVoucher from "../screens/ReceiveVoucher";
import MyVouchers from "../screens/MyVouchers";

const Stack = createNativeStackNavigator();
const StackSubNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="BottomNavs">
            <Stack.Screen
                name="BottomNavs"
                component={BottomNavs}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}
                options={{
                    title: "Voucher Detail",
                    headerTransparent: true,
                    headerRight: () => (
                        <Ionicons name="bookmark" size={24} color="black"/>
                    ),
                }}
            />
            <Stack.Screen name="DrStrangeGame" component={DrStrangeGame} options={{headerShown: false}}/>
            <Stack.Screen name="ReceiveVoucher" component={ReceiveVoucher} options={{headerShown: false}}/>
            <Stack.Screen name="MyVouchers" component={MyVouchers} options={{
                title: 'MyVouchers', //Set Header Title
                headerTitle: "",
                headerTransparent:true
            }}/>
        </Stack.Navigator>
    );
};

export default StackSubNavigator;
