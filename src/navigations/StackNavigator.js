import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import OnLoadingScreen from "../screens/OnLoadingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SuccessLoginScreen from "../screens/SuccessLoginScreen";
import UploadImageScreen from "../screens/UploadImageScreen";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="OnLoadingScreen" component={OnLoadingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SuccessLoginScreen" component={SuccessLoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="UploadImageScreen" component={UploadImageScreen} options={{headerShown: false}}/>
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
