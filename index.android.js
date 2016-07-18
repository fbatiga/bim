/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppLayout from './src/app/AppLayout';
import AppNavigator from './src/app/AppNavigator';
import configureStore from './src/app/AppStore';

const AppStore = configureStore();

class App extends Component {
  render() {

    return (
      <Provider store={AppStore} >
        <AppLayout>
            <AppNavigator />
        </AppLayout>
      </Provider>
    );
  }
}


AppRegistry.registerComponent('bimbot', () => App);
