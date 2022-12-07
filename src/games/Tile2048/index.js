import React from 'react';
import {enableScreens} from 'react-native-screens';
import StoreProvider from "./redux/StoreProvider.component";
import GameScreen from "./screens/GameScreen.component";


enableScreens();

const Tile2048 = () => {

    return (
        <StoreProvider>
            <GameScreen />
        </StoreProvider>
    );
};

export default Tile2048;
