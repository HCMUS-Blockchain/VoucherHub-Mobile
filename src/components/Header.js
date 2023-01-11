import {Ionicons} from "@expo/vector-icons";
import {HStack, Input, Pressable, StatusBar, Text, View, VStack} from "native-base";
import React, {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {getNumberUnSeenNoti} from "../api/notification";
import {apiGeoapi} from "../api/location";

const Header = ({navigation}) => {
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
    const [number, setNumber] = useState([])
    useEffect(() => {
        getNumberUnSeenNoti().then((res) => {
            setNumber(res.data.number)
        }).catch((e) => {
            console.log(e)
        })
        navigation.addListener('focus', () => {
            getNumberUnSeenNoti().then((res) => {
                setNumber(res.data.number)
            }).catch((e) => {
                console.log(e)
            })
        });
    }, [])

    return (
        <>
            <StatusBar/>
            <HStack
                bg="#BD261C"
                px="1"
                py="2"
                justify="flex-start"
                direction="column"
                alignItems="center"
                w="100%"
                h="150"
                borderBottomRadius={50}
            >
                <HStack justifyContent="center">
                    <VStack alignItems="center">
                        <HStack>
                            <Text color="white:alpha.70" fontSize="10">
                                Current locations
                            </Text>
                            <Ionicons name="chevron-down-outline" size={20} color="white"/>
                        </HStack>
                        <Text
                            color="white"
                            fontSize="10"
                            fontWeight="bold"
                            alignSelf="center"
                            style={{
                                width: 200,
                            }}
                        >
                            {address}
                        </Text>
                    </VStack>
                    <Pressable
                        onPress={() => navigation.navigate('NotificationScreen')}
                    >
                        <View>
                            <Ionicons
                                style={{
                                    marginTop: 15,
                                    marginLeft: 10,
                                }}
                                name="notifications" size={24} color="white"/>
                            {
                                number > 0 ? <View
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 20
                                        }}
                                    >
                                        <Ionicons
                                            name="ellipse" size={25} color="orange"/>
                                        <Text
                                            style={{
                                                position: "absolute",
                                                top: 2,
                                                left: 8,
                                                color: "white",
                                                fontSize: 15,
                                            }}
                                        >
                                            {number > 5 ? "5+" : number}
                                        </Text>
                                    </View>
                                    : null
                            }

                        </View>
                    </Pressable>

                </HStack>
                <VStack w="100%" alignSelf="center">
                    <Input
                        placeholder="Search People & Places"
                        width="100%"
                        py="2"
                        px="1"
                        fontSize="12"
                        variant="unstyled"
                        InputLeftElement={
                            <Ionicons name="search-outline" size={24} color="white"/>
                        }
                    />
                </VStack>
            </HStack>
        </>
    );
};

export default Header;
