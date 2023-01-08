import * as React from "react";

import Header from "../components/Header";
import HorizontalScrollViewFilter from "../components/HorizontalScrollViewFilter";
import HomeScreen from "./HomeScreen";
import {useEffect, useState} from "react";
import * as Linking from "expo-linking";
import {sendPuzzle, sendPuzzleEveryone} from "../api/puzzle";

export default function MainScreen({navigation}) {
    const [result, setResult] = useState(null);
    const [hostname, setHostname] = useState(null);
    const [path, setPath] = useState(null);
    const url = Linking.useURL()
    useEffect(() => {
            if (url) {
                const { hostname, path, queryParams } = Linking.parse(url);
                console.log(
                    `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
                        queryParams
                    )}`
                );
                setHostname(hostname)
                setPath(path)
                setResult(queryParams)
            }
        },
        [url])

    if(result&&path){
        sendPuzzleEveryone(result).then(r => {
            const data= r.data.message
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
