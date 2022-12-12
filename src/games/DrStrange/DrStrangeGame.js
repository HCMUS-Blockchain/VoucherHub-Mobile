import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Physics from './physics';
import ExpoFastImage from "expo-fast-image";
import entities from "./src/entities";
import Constants from "./src/utils/constant";
import {useLogin} from "../../context/LoginProvider";
import clients from "../../api/clients";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
const {height, width} = Dimensions.get('window');

export default function DrStrangeGame({navigation}) {
    useEffect(() => {
        navigation.navigate('DetailScreen')
    }, []);
    const {profile} = useLogin()
    const [isLoading, setIsLoading] = useState(false)
    const getVoucher = async () => {
        const token = await AsyncStorage.getItem("token");
        setIsLoading(true)
        clients.post('/vouchers/playgame', {
            gameType: 'Jump With DrS',
            userId: profile._id,
            points: currentPoints,
            campaignId: "6392b1093446e7413e28d683",
        }, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        }).then((res) => {
            if (res.data.success) {
                navigation.navigate('ReceiveVoucher', {
                    code: res.data.voucher.code,
                    expiredDate: res.data.voucher.expiredDate,
                    discount: res.data.voucher.discount
                })
            }else{
                console.log(res.data.message)
            }
            setIsLoading(false)
        }).catch((e) => {
            console.log(e)
            Alert.alert('Warning', 'Voucher not available',[{text:'OK'}])
            setIsLoading(false)
        })
    }
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentPoints, setCurrentPoints] = useState(0)
    useEffect(() => {
        setRunning(false)
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => navigation.goBack() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [])
    return (
        <View style={{flex: 1}}>
            <Loader loading={isLoading}/>
            <ExpoFastImage style={styles.imageBackground}
                           source={{uri: Constants.BACKGROUND_IMG}}
            />
            <GameEngine
                ref={(ref) => {
                    setGameEngine(ref)
                }}
                systems={[Physics]}
                entities={entities()}
                running={running}
                onEvent={(e) => {
                    switch (e.type) {
                        case 'game_over':
                            setRunning(false)
                            gameEngine.stop()
                            break;
                        case 'new_point':
                            setCurrentPoints(currentPoints + 1)
                            break;
                    }
                }}
                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            >
                <StatusBar style="auto" hidden={true}/>

            </GameEngine>

            {!running && currentPoints <= 0 ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10}}
                                      onPress={() => {
                                          setCurrentPoints(0)
                                          setRunning(true)
                                          gameEngine.swap(entities())
                                      }}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                            Start Game
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10,
                        marginTop: 10
                    }}
                                      onPress={() => {
                                          navigation.goBack()
                                      }}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                            Return
                        </Text>
                    </TouchableOpacity>

                </View> : <Text style={styles.score}>{currentPoints}</Text>}
            {!running && currentPoints > 0 ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={getVoucher}
                        style={{
                            backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10,
                            marginBottom: 10
                        }}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                            Voucher
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10}}
                                      onPress={() => {
                                          setCurrentPoints(0)
                                          setRunning(true)
                                          gameEngine.swap(entities())
                                      }}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                            Play Again
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10,
                        marginTop: 10
                    }}
                                      onPress={() => {
                                          navigation.goBack()
                                      }}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
                            Return
                        </Text>
                    </TouchableOpacity>
                </View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    score: {
        color: '#ffffff',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        top: 100,
    }
})
