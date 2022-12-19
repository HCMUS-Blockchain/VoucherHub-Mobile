import BottomNavs from "./BottomNav";
import DetailScreen from "../screens/DetailScreen";
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DrStrangeGame from "../games/DrStrange/DrStrangeGame";
import ReceiveVoucher from "../screens/ReceiveVoucher";
import MyVouchers from "../screens/MyVouchers";
import Tile2048 from "../games/Tile2048";
import QuizGame from "../games/QuizGame";
import PuzzleCollection from "../screens/PuzzleCollection";
import * as Linking from 'expo-linking'

const Stack = createNativeStackNavigator();
const StackSubNavigator = () => {
    const [result, setResult] = useState(null);
    const url = Linking.useURL()
    useEffect(() => {
        console.log(url)
            if (url) {
                const { hostname, path, queryParams } = Linking.parse(url);
                console.log(
                    `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
                        queryParams
                    )}`
                );
                setResult(queryParams)
            }
        },
        [url])
    if(result){

    }
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
            <Stack.Screen name="Tile2048" component={Tile2048} options={{headerShown: false}}/>
            <Stack.Screen name="QuizGame" component={QuizGame} options={{headerShown: false}}/>
            <Stack.Screen name="PuzzleCollection" component={PuzzleCollection} options={{headerShown: false}}/>
            <Stack.Screen name="MyVouchers" component={MyVouchers} options={{
                title: 'MyVouchers', //Set Header Title
                headerTitle: "",
                headerTransparent:true
            }}/>
        </Stack.Navigator>
    );
};

export default StackSubNavigator;
