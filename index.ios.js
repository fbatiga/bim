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
import CodePush from "react-native-code-push";

const AppStore = configureStore();

class App extends Component {

  componentDidMount() {

     var updateDialogOptions = {
	    optionalUpdateTitle: "Mise à Jour disponible",
	    optionalUpdateMessage: "Souhaitez-vous mettre à jour votre application ?",
	    optionalIgnoreButtonLabel: "Non",
	    optionalInstallButtonLabel: "Oui",
	};


    CodePush.sync({updateDialog: updateDialogOptions, installMode: CodePush.InstallMode.IMMEDIATE})
      .then(update => console.log('update', update))
      .catch(err => console.log('update error', err));
  }

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
