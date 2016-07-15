'use strict'
import React, { Component } from 'react';
import { Navigator, Text } from 'react-native';
import Page from '../page';
import {Actions, Scene, Router} from 'react-native-router-flux';

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="launch" component={Page.LaunchPage} initial={true} title="Launch"/>
    <Scene key="messenger" component={Page.MessengerPage} title="messenger"/>
  </Scene>
);

export default class AppNavigator extends Component {
  render() {
    return <Router scenes={scenes} />
  }

}
