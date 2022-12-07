import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { initGameAction } from '../redux/actions/game.actions';

import Header from '../components/UI-components/Header.component';
import CustomText from '../components/UI-components/CustomText.component';
import Board from '../components/game-components/Board.component';
import GameOverModal from '../components/UI-components/GameOverModal.component';

import Colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;

const GameScreen = () => {
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

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Header />

                <View style={styles.instructionsContainer}>
                    <CustomText style={styles.instructionsText}>Join the numbers and get to the 2048 tile!</CustomText>
                </View>

                <View style={styles.boardContainer}>
                    <Board />
                </View>
            </View>
            <GameOverModal visible={modalVisibility} onPressFunction={closeModal} />
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
    },
    boardContainer: {
        alignItems: 'center',
    },
    footerText: {
        color: Colors.text,
    },
});

export default GameScreen;
