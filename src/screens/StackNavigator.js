import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import OnLoadingScreen from "./OnLoadingScreen";
import SuccessLoginScreen from "./SuccessLoginScreen";
import MainScreen from "./MainScreen";
import RegisterScreen from "./RegisterScreen";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="OnLoadingScreen" component={OnLoadingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen}
                          options={{
                              title: 'Register', //Set Header Title
                              headerTitle: "",
                              headerTransparent:true
                          }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
