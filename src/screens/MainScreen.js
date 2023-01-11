import * as React from "react";

import Header from "../components/Header";
import HorizontalScrollViewFilter from "../components/HorizontalScrollViewFilter";
import HomeScreen from "./HomeScreen";
import {useEffect, useState} from "react";
import * as Linking from "expo-linking";
import {sendPuzzle, sendPuzzleEveryone} from "../api/puzzle";
import * as Location from "expo-location";
import {apiGeoapi} from "../api/location";

export default function MainScreen({navigation}) {
    //address
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coordinate, setCoordinate] = useState(null);
    const [address, setAddress] = useState(null);
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setCoordinate({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        })();
    }, []);
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    useEffect( () => {
        if (coordinate) {
            getAddress(coordinate)
        }
    }, [coordinate])
    const getAddress = async (coordinate) => {
        setAddress(await apiGeoapi(coordinate))
    }
    //
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
      <Header
          address={address}
        navigation={navigation}
      />
      <HorizontalScrollViewFilter mt="10" />
      <HomeScreen
          coordinate={coordinate}
      />
    </>
  );
}
