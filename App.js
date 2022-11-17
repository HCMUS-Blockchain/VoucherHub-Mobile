import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clients from "./src/api/clients";
import StackNavigator from "./navigations/StackNavigator";
import BottomNav from "./navigations/BottomNav";
import StackSubNavigator from "./navigations/StackSubNavigator";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token) {
      const user = await clients.get("/users/profile", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (user.data.success) {
        console.log(user.data);
        setIsLogin(true);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackSubNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
