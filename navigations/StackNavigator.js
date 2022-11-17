import SplashScreen from "../src/screens/SplashScreen";
import LoginScreen from "../src/screens/LoginScreen";
import OnLoadingScreen from "../src/screens/OnLoadingScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
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
