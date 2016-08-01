'use strict'
import React, { Component } from 'react';
import { Navigator, Text } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import LaunchView from '../view/launch/LaunchView';
import MessengerView from '../view/messenger/MessengerView';
import AccountView from '../view/account/AccountView';
import CardView from '../view/card/CardView';
import ContactView from '../view/contact/ContactView';
import TransferView from '../view/transfer/TransferView';

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="launch" component={LaunchView} initial={true}  title="Launch"/>
    <Scene key="messenger" component={MessengerView} title="messenger"/>
    <Scene key="account" component={AccountView} title="account"/>
    <Scene key="card" component={CardView}  title="card"/>
    <Scene key="contact" component={ContactView} title="contact"/>
    <Scene key="transfer" component={TransferView} title="transfer"/>
  </Scene>
);

export default class AppNavigator extends Component {
  render() {
    return <Router scenes={scenes} />
  }

}
