import * as React from "react";

import Header from "../components/Header";
import HorizontalScrollViewFilter from "../components/HorizontalScrollViewFilter";
import HomeScreen from "./HomeScreen";
import {useEffect, useState} from "react";
import * as Linking from "expo-linking";
import {sendPuzzle} from "../api/puzzle";

export default function MainScreen({navigation}) {
    const [result, setResult] = useState(null);
    const url = Linking.useURL()
    console.log(url)
    useEffect(() => {
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
        sendPuzzle(result).then(r => {
            const data= r.data.message
            console.log(data)
            if (data.piece.img){
                navigation.navigate("ReceiveVoucher", {img:data?.piece?.img})
            }
        })
    }
  return (
    <>
      <Header />
      <HorizontalScrollViewFilter mt="10" />
      <HomeScreen />
    </>
  );
}
