'use strict'
import React, { Component } from 'react';
import { Navigator, Text } from 'react-native';
import View from '../view';
import {Actions, Scene, Router} from 'react-native-router-flux';

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="launch" component={View.LaunchView} initial={true} title="Launch"/>
    <Scene key="messenger" component={View.MessengerView} title="messenger"/>
    <Scene key="account" component={View.AccountView} title="account"/>
  </Scene>
);

export default class AppNavigator extends Component {
  render() {
    return <Router scenes={scenes} />
  }

}
