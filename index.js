
import React from 'react';
import App from './src/App';
import { AppRegistry } from 'react-native';

import { Provider } from "react-redux";
import store from "./src/redux/store";

class AppProvider extends React.Component {
    render() {
        return (      
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
} 


AppRegistry.registerComponent('TestReactNative', () => AppProvider);