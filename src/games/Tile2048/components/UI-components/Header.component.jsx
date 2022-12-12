import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {initGameAction} from '../../redux/actions/game.actions';
import ScoreBoard from '../game-components/ScoreBoard.component';
import CustomButton from './CustomButton.component';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import * as gameStorage from '../../utils/storage.utils';

import Colors from '../../constants/colors';
import {Text} from "native-base";
import {COLORS} from "../../../QuizGame/src/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clients from "../../../../api/clients";
import Loader from "../../../../components/Loader";
import {useLogin} from "../../../../context/LoginProvider";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = ({startAnim, navigation}) => {
    const gameScore = useSelector((state) => state.game.score);
    const [time, setTime] = useState(5);
    const [running, setRunning] = useState(false);
    const [bestGameScore, setBestGameScore] = useState(0);
    const [key, setKey] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCurrentBestScore = async () => {
            const currentBestScore = await gameStorage.getBestGameScore();

            setBestGameScore(currentBestScore);
        };

        getCurrentBestScore();
    }, []);


    useEffect(() => {
        const updateBestScore = async () => {
            if (gameScore > bestGameScore) {
                await gameStorage.setBestGameScore(gameScore);
                setBestGameScore(gameScore);
            }
        };

        updateBestScore();
    }, [gameScore]);
    const initNewGame = async () => {
        startAnim();
        setKey((prevKey) => prevKey + 1);
        setTime(5);
        setRunning(true);
        dispatch(initGameAction());
    }
    const [scoreModal, setScoreModal] = useState(false);
    const restartGame = () => {
        setScoreModal(false);
        setKey(0)
        setTime(5);
    }
    const [loading, setLoading] = useState(false);
    const {profile} = useLogin()
    const voucher = async () => {
        const token = await AsyncStorage.getItem("token");
        setLoading(true)
        clients.post('/vouchers/playgame', {
            gameType: 'Tile 2048',
            userId: profile._id,
            points: gameScore,
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
            } else {
                console.log(res.data.message)
            }
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            Alert.alert('Warning', 'Voucher not available', [{text: 'OK'}])
            setLoading(false)
        })
    }
    return (
        <View style={styles.container}>
            <Loader loading={loading}/>
            <View style={styles.scoreBoardContainer}>
                <CountdownCircleTimer
                    isPlaying={running}
                    duration={time}
                    key={key}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    size={windowWidth * 0.33}
                    strokeWidth={10}
                    onComplete={() => {
                        setRunning(false);
                        setScoreModal(true);
                        return [false, 0];
                    }}
                >
                    {({ remainingTime }) => <Text>{remainingTime}</Text>}
                </CountdownCircleTimer>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={scoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20,
                            }}>
                                <Text style={{
                                    height:20,
                                    fontSize:  20,
                                    fontWeight: 'bold',
                                    color: COLORS.success
                                }}>Score: {gameScore}</Text>
                            </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity
                                onPress={voucher}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Voucher</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={restartGame}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20, marginTop: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Retry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> navigation.goBack()}
                                style={{
                                    backgroundColor: COLORS.accent,
                                    padding: 20, width: '100%', borderRadius: 20,
                                    marginTop: 20
                                }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Return</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </View>

            <View style={styles.content}>
                <View style={styles.scoreBoardsContainer}>
                    <ScoreBoard title="SCORE" score={gameScore} />
                </View>

                <View style={styles.buttonsContainer}>

                    <CustomButton
                        title="START"
                        onPressFunction={initNewGame}
                        containerStyle={styles.buttonContainer}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: windowHeight * 0.17,
        maxWidth: 414,
        maxHeight: 150,
    },
    logo: {
        width: windowWidth * 0.27,
        height: windowWidth * 0.27,
    },
    logoText: {
        fontSize: windowWidth > 410 ? 40 : 32,
    },
    content: {
        justifyContent: 'space-between',
        width: '60%',
        height: '100%',
        marginLeft: 20
    },
    scoreBoardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '65%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '25%',
    },
    buttonContainer: {
        width: '45%',
        backgroundColor: Colors.button,
    },
    buttonText: {
        fontSize: 16,
    },
    scoreBoardContainer: {
        width: '35%',
        marginLeft: 40,
    }
});

export default Header;
