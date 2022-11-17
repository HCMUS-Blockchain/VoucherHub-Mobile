import * as React from "react";

import Header from "../components/Header";
import HorizontalScrollViewFilter from "../components/HorizontalScrollViewFilter";
import BottomNavs from "../../navigations/BottomNav";
import HomeScreen from "./HomeScreen";

export default function MainScreen() {
  return (
    <>
      <Header />
      <HorizontalScrollViewFilter mt="10" />
      <HomeScreen />
    </>
  );
}
