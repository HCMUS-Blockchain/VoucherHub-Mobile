import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import React from "react";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import RegisterScreen from "./src/screens/RegisterScreen";
import SplashScreen from "./src/screens/SplashScreen";
import OnLoadingScreen from "./src/screens/OnLoadingScreen";
import BottomNavs from "./navigations/BottomNav";
import MainScreen from "./src/screens/MainScreen";
import Voucher from "./components/VoucherHomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import VoucherDetail from "./components/VoucherDetail";
import VoucherListScreen from "./src/screens/VoucherListScreen";
import VoucherItem from "./components/VoucherItem";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomNavs">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnLoadingScreen"
            component={OnLoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              title: "Register", //Set Header Title
              headerTitle: "",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="BottomNavs"
            component={BottomNavs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{
              title: "Voucher Detail",
              headerTransparent: true,
              headerRight: () => (
                <Ionicons name="bookmark" size={24} color="black" />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <VoucherItem /> */}
    </NativeBaseProvider>
  );
}
