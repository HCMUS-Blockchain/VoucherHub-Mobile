import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import LoginProvider from "./src/context/LoginProvider";
import MainNavigator from "./src/navigations/MainNavigator";
import UploadImageScreen from "./src/screens/UploadImageScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <LoginProvider>
        <NavigationContainer>
          <MainNavigator/>
        </NavigationContainer>
      </LoginProvider>
    </NativeBaseProvider>
  );
}
