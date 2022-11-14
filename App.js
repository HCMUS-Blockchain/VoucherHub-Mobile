import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import React from "react";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./src/screens/RegisterScreen";
import SplashScreen from "./src/screens/SplashScreen";
import OnLoadingScreen from "./src/screens/OnLoadingScreen";
import MainScreen from "./src/screens/MainScreen";
import Voucher from "./components/Voucher";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
      {/* <NavigationContainer>
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
            </NavigationContainer> */}
      <HomeScreen />
    </NativeBaseProvider>
  );
}
