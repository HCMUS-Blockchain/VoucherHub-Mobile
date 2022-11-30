import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MainScreen from "../screens/MainScreen";
import VoucherListScreen from "../screens/VoucherListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();

const BottomNavs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? (
              <Ionicons name="ios-home" size={24} color="tomato" />
            ) : (
              <Ionicons name="ios-home-outline" size={24} color="black" />
            );
          } else if (route.name === "Vouchers") {
            iconName = focused ? (
              <Ionicons name="receipt" size={24} color="tomato" />
            ) : (
              <Ionicons name="receipt-outline" size={24} color="black" />
            );
          } else if (route.name === "Locations") {
            iconName = focused ? (
              <Ionicons name="location" size={24} color="tomato" />
            ) : (
              <Ionicons name="location-outline" size={24} color="black" />
            );
          } else if (route.name === "Profile") {
            iconName = focused ? (
              <Ionicons name="person" size={24} color="tomato" />
            ) : (
              <Ionicons name="person-circle-outline" size={24} color="black" />
            );
          }

          return iconName;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Vouchers" component={VoucherListScreen} />
      <Tab.Screen name="Locations" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavs;
