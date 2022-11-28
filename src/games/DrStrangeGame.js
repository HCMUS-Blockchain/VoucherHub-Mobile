import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Physics from './physics';
import ExpoFastImage from "expo-fast-image";
import entities from "./DrStrange/entities";
import Constants from "./DrStrange/utils/constant";

const {height, width} = Dimensions.get('window');

export default function DrStrangeGame({navigation}) {
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentPoints, setCurrentPoints] = useState(0)
    useEffect(() => {
        setRunning(false)
    }, [])
    return (
        <View style={{flex: 1}}>
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

            {!running && currentPoints <= 1 ?
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
            {!running && currentPoints > 1 ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{
                        backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10,
                        marginTop: 10
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
