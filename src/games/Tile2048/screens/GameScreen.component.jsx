import React, {useEffect, useState} from 'react';
import {Alert, Animated, BackHandler, Dimensions, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {initGameAction} from '../redux/actions/game.actions';
import Header from '../components/UI-components/Header.component';
import CustomText from '../components/UI-components/CustomText.component';
import Board from '../components/game-components/Board.component';
import GameOverModal from '../components/UI-components/GameOverModal.component';
import Colors from '../constants/colors';
import {Button, Text} from "native-base";

const windowWidth = Dimensions.get('window').width;

const GameScreen = ({navigation}) => {
    useEffect(() => {
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
    const isGameOver = useSelector((state) => state.game.isGameOver);

    const [modalVisibility, setModalVisibility] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isGameOver) setModalVisibility(true);
    }, [isGameOver]);

    const closeModal = () => {
        dispatch(initGameAction());
        setModalVisibility(false);
    };
    const [fadeAnim] = useState(new Animated.Value(0));
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const startAnim = () => {
        fadeIn();
        setTimeout(() => {
            fadeOut();
        }, 1000);
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Header
                    navigation={navigation}
                    startAnim={startAnim}
                />
                <View style={styles.instructionsContainer}>
                    <CustomText style={styles.instructionsText}>Click Start Game To Play</CustomText>
                </View>
                <View style={styles.boardContainer}>
                    <Board />
                </View>
            </View>
            <GameOverModal visible={modalVisibility} onPressFunction={closeModal} />
            <Animated.View
                style={[
                    styles.fadingContainer,
                    {
                        opacity: fadeAnim
                    }
                ]}
            >
                <CustomText style={styles.textStart}>Start</CustomText>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingVertical: 80,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 9,
    },
    instructionsContainer: {
        maxWidth: 414,
        marginVertical: 18,
    },
    instructionsText: {
        fontSize: windowWidth > 410 ? 22 : 18,
        color: Colors.text,
        textAlign: 'center',

    },
    boardContainer: {
        alignItems: 'center',
    },
    footerText: {
        color: Colors.text,
    },textStart: {
        color: "#868686",
        fontSize: 100,
        fontWeight: "bold",
    },fadingContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 100,
    }
});

export default GameScreen;
