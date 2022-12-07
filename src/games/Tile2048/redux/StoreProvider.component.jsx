import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const store = __DEV__ ? createStore(rootReducer, composeWithDevTools()) : createStore(rootReducer);

const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
